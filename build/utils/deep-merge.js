/**
 * 深拷贝，没有对象引用相同的问题
 * 此函数用于合并对象，当同名是数组将会自动合并,同名对象进行递归，将内部也合并，同名的属性时才会发生覆盖
 * 遇到数组，只有数据不同时才会插入
 * 支持多对象同时输入
 */
const merge = (...objs) => {
  let result = {};
  objs.forEach((obj = {}) => {
    Object.keys(obj || {}).forEach(key => {
      if (result[key] === undefined) {
        // 第一次初始化的情况, 防止复制引用地址，用merge处理
        if (Array.isArray(obj[key])) {
          result[key] = Object.values(merge(obj[key]));
        } else if (typeof obj[key] === 'object') {
          result[key] = merge(obj[key]);
        } else {
          // 普通数据直接覆盖值
          result[key] = obj[key];
        }
      } else if (Array.isArray(result[key])) {
        // 先处理result有引用值的情况
        obj[key].forEach(value => {
          if (!result[key].includes(value)) {
            result[key].push(value);
          }
        });
      } else if (typeof result[key] === 'object') {
        result[key] = merge(result[key], obj[key]);
      } else {
        // 普通数据直接覆盖值
        result[key] = obj[key];
      }
    });
  });
  return result;
};

exports = module.exports = merge;
