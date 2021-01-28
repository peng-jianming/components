import { MessageBox } from 'element-ui';
import { isFullEmpty } from 'src/modules/utils/params';

const DEFAULT_MESSAGE = {
  401: '<div>401: 登录信息已失效，请重新登录。</div>',
  403: '<div>403: 您当前无该功能权限，请申请权限。</div>',
  404: '<div>404: 前端页面请求资源未找到，请重新操作</div>',
  422: '<div>422: 参数校验错误，请检查必填项或格式是否正确</div>',
  500: '<div>500: 接口返回错误</div>'
};
const errorMessage = ({
  title = '提示',
  message: baseMessage,
  status,
  options
}) => {
  const tip = DEFAULT_MESSAGE[status] ? DEFAULT_MESSAGE[status] : '';
  let message = isFullEmpty(baseMessage) ? '' : baseMessage;
  message = `${tip}${message}`;
  return MessageBox.alert(message, {
    title,
    type: 'error',
    dangerouslyUseHTMLString: true,
    ...options
  });
};

export default {
  responseReject(error) {
    const { status, data, config } = error.response;
    let promise = Promise.resolve();
    // 配置忽略错误
    if (
      config &&
      (config.ignoreError === true ||
        (Array.isArray(config.ignoreError) &&
          config.ignoreError.includes(status)))
    ) {
      return Promise.reject(error);
    }
    if (status === 401) {
      promise = errorMessage({ status }).then(() => {
        location.href = `/login?redirect=${location.pathname + location.hash}`;
      });
    } else if (status === 422) {
      let message = data.message;
      // 格式化错误信息
      if (Array.isArray(data.errors) && !isFullEmpty(data.errors)) {
        message = data.errors
          .map(error => {
            return `<p>${error.field} ${error.message}</p>`;
          })
          .join('\n');
      }
      promise = errorMessage({
        message,
        status
      });
    } else if (DEFAULT_MESSAGE[status]) {
      promise = errorMessage({
        message: data.message,
        status
      });
    } else {
      promise = Promise.resolve();
    }
    // 接口返回错误时,code取错误状态码,没有的话取-1
    return promise.then(() => {
      return {
        data: {
          code: error.response ? error.response.status : -1
        }
      };
    });
  }
};
