import {
  isFunction,
  toString,
  uniq,
  isEmpty,
  trim,
  isEqual,
  intersection
} from 'lodash';
import { MessageBox } from 'element-ui';

// 判断空值,使用lodash的toString,帮助修复isEmpty判断数字为空的情况
export function isFullEmpty(value) {
  return isEmpty(toString(value)) || trim(value) === '';
}

// 过滤空值
export function filterEmpty(data) {
  const params = JSON.parse(JSON.stringify(data));
  // 移除空数组或空字符串参数
  Object.keys(params)
    // 值为空、数组长度为0、时间格式0000-00-00 00:00:00设置默认值为undefined
    .filter(
      key => isFullEmpty(params[key]) || params[key] === '0000-00-00 00:00:00'
    )
    .forEach(key => {
      params[key] = undefined;
      delete params[key];
    });
  return params;
}

export function validateRequired(configs, params) {
  return configs
    .filter(({ required }) => required)
    .filter(({ prop, props }) => {
      if (props) {
        return props.every(prop => isFullEmpty(params[prop]));
      }
      return isFullEmpty(params[prop]);
    })
    .map(({ label, requiredMessage }) => requiredMessage || `${label}必填`);
}

/**
 * 验证枚举选项是否为枚举内的合法值
 * 兼容单选，多选情况
 */
export function validateInEnums(configs, data) {
  return configs
    .filter(({ enums }) => Array.isArray(enums) && !isEmpty(enums))
    .filter(({ prop }) => !isFullEmpty(data[prop]))
    .filter(({ prop, enums }) => {
      const enumsIds = enums.map(({ id }) => id);
      const values = [].concat(data[prop]);
      return !isEqual(intersection(values, enumsIds), values);
    })
    .map(({ label }) => `请重新选择${label}`);
}

export function validateCustomize(configs, params, data) {
  return (
    configs
      // 先判断是否存在验证方法
      .filter(({ validateMethod }) => isFunction(validateMethod))
      // 自定义校验方法时，return错误信息
      .map(({ prop, props, validateMethod }) =>
        props
          ? validateMethod(params, data)
          : validateMethod(params[prop], params, data)
      )
      .filter(result => !(result === true))
  );
}

/**
 * 根据配置对params进行验证
 * 先对params进行空值清理，保证必填验证正确
 * 可以传入原始数据，用于对比的验证
 */
export function validate(configs, params, data) {
  const cleanParams = filterEmpty(params);
  // 自动提示信息
  const validateErrors = uniq([
    ...validateRequired(configs, cleanParams),
    ...validateInEnums(configs, cleanParams),
    ...validateCustomize(configs, cleanParams, data)
  ]);
  return {
    status: validateErrors.length === 0,
    messages: validateErrors
  };
}

export function assertWithMessage(value, message) {
  if (value === false) {
    MessageBox.alert(message, {
      title: '参数错误',
      type: 'error'
    });
    throw new Error('参数错误');
  } else {
    return true;
  }
}
export function validateWithMessage(configs, params, data) {
  const { status, messages } = validate(configs, params, data);
  if (status === false) {
    const message = messages.map(message => `<p>${message}</p>`).join('\n');
    MessageBox.alert(message, {
      title: '参数错误',
      type: 'error',
      dangerouslyUseHTMLString: true
    });
    throw new Error('参数错误');
  } else {
    return true;
  }
}
