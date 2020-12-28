/**
 * 字段组管理类
 * 支持链式调用
 * 自动clone，外部只需关注变化
 * 支持按prop顺序重新排序
 * 调用checkFieldsCoverage检查是否有重复定义prop
 */
export class Fields {
  constructor(fields) {
    this.fields = fields;
    this.containers = [];
    // 默认情况下展示
    this.showCondition = () => true;
  }

  clone() {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }

  // 组合模式进行显示控制
  setShowCondition(showCondition) {
    this.showCondition = showCondition;
    return this;
  }

  isShow(context) {
    return this.showCondition(context);
  }

  /**
   * 根据传入的condition函数判断是否改变字段
   */
  registerChangeField({ condition, prop, converter }) {
    this.containers.push({
      condition,
      prop,
      converter
    });
    return this;
  }

  /**
   * 直接改变字段的函数
   */
  redefinedField({ prop, converter }) {
    this.containers.unshift({
      condition: () => true,
      prop,
      converter
    });
    return this;
  }

  changeField(field, converter) {
    converter(field);
  }

  sort(props) {
    this.fields.sort(
      (preEnum, nextEnum) =>
        props.indexOf(preEnum.prop) - props.indexOf(nextEnum.prop)
    );
    return this;
  }

  /**
   * Fields内部塞入Fields,需要递归处理
   * 需要index信息，所以没用filter
   * 出现下标动态变化，用for
   * 不是标准的数组，不能直接使用flat
   */
  allToField(fields, containers, context) {
    fields = [...fields];
    for (let index = 0; index < fields.length; index++) {
      const field = fields[index];
      if (field instanceof Fields) {
        // 字段插入对应位置
        const innerFields = field.getFields(context);
        fields.splice(index, 1, ...innerFields);
        // 由于fields里面的field都被提取出来,下标需要变化为被提取出来的field数量-1
        index += innerFields.length - 1;
        // 保留每一个fields的字段变更信息
        containers = containers.concat(field.containers);
      }
    }
    return {
      fields: fields.filter(field => field),
      containers
    };
  }

  /**
   * 对字段的转换处理
   * 必须是字段prop匹配
   * 符合当前上下文context
   */
  transferField(field, containers, context) {
    // 遍历变化容器,找出当前对应字段的所有变化,condition为条件,converter为变化调用的函数
    const transforms = containers
      .filter(({ prop }) => field.prop === prop)
      .filter(({ condition }) => condition(context))
      .map(({ converter }) => converter);
    if (transforms.length > 0) {
      // 克隆一份,防止原内容被改变
      field = field.clone();
      transforms.forEach(transform => {
        // 传入参数,调用converter函数对field进行改变
        this.changeField(field, transform);
      });
    }
    return field;
  }

  /**
   * 主要方法
   * 将fields进行处理,最终将数组里面的内容都变为field
   */
  getFields(context) {
    const { fields, containers } = this.allToField(
      this.fields.filter(field => field.isShow(context)),
      this.containers,
      context
    );
    return (
      fields
        .map(field => this.transferField(field, containers, context))
        // 对改变后的field字段再进行一次查看是否显示,改变时有可能修改了这个属性
        .filter(field => field.isShow(context))
    );
  }

  checkFieldsCoverage(fields) {
    const props = fields.map(({ prop }) => prop);
    const result = new Set(props).size === props.length;
    if (!result) {
      console.error('字段有重复定义的prop');
    }
    return result;
  }
}
