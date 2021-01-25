const RESERVED_WORDS = [
  // 唯一区分key,:key,后端数据结构key
  'prop',
  // 中文文案
  'label',
  // 具有展示key时优先获取展示key
  'displayProp',
  // 多key依赖
  'props',
  // 是否必填
  'required',
  // 必填验证提示语
  'requiredMessage',
  // 类型，具体类型查看form.vue
  'type',
  'enums',
  // 默认值，使用reset时才用到
  'defaultValue',
  // 组件占用宽度
  'width',
  'formItemWidth',
  'placeholder',
  'disabled',
  // 复杂情况, 直接传入完整对象, 一般配和editComponent, props使用，
  'isFull',
  // 自定义校验方法, return true通过，否则返回错误信息, 与required独立
  'validateMethod',
  // 展示模版使用listComponent
  'listComponent',
  // 编辑模版使用editComponent
  'editComponent',
  // 组件的css class名, 用于处理特殊情况
  'inputClass',
  // list组件expand
  'isExpand',
  // 展示时是否使用v-html
  'isHtml',
  // 控制字段是否展示
  'isShow',
  'showCondition'
];
export class Field {
  constructor({
    prop,
    props,
    label,
    displayProp,
    defaultValue,
    required,
    requiredMessage,
    type,
    enums,
    width,
    inputClass,
    isCopy,
    placeholder,
    formItemWidth,
    validateMethod
  }) {
    this.prop = prop;
    this.label = label;
    this.props = props;
    this.displayProp = displayProp;
    this.required = required;
    this.requiredMessage = requiredMessage;
    this.type = type;
    this.enums = enums;
    this.defaultValue = defaultValue;
    this.width = width;
    this.inputClass = inputClass;
    this.isCopy = isCopy;
    this.placeholder = placeholder;
    this.formItemWidth = formItemWidth;
    this.validateMethod = validateMethod;
    // 默认情况为永久展示
    this.showCondition = () => true;
  }

  clone() {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }

  setShowCondition(showCondition) {
    this.showCondition = showCondition;
    return this;
  }

  isShow(context) {
    return this.showCondition(context);
  }

  setProp(prop) {
    this.prop = prop;
    return this;
  }

  setLabel(label) {
    this.label = label;
    return this;
  }

  resetLabel() {
    this.label = undefined;
    delete this.label;
    return this;
  }

  setRequired() {
    this.required = true;
    return this;
  }

  resetRequired() {
    this.required = undefined;
    delete this.required;
    return this;
  }

  setRequiredMessage(requiredMessage) {
    this.requiredMessage = requiredMessage;
    return this;
  }

  resetRequireMessage() {
    this.requiredMessage = undefined;
    delete this.requiredMessage;
    return this;
  }

  setDisplayProp(displayProp) {
    this.displayProp = displayProp;
    return this;
  }

  resetDisplayProp() {
    this.displayProp = undefined;
    delete this.displayProp;
    return this;
  }

  setProps(props) {
    this.props = props;
    return this;
  }

  resetProps() {
    this.props = undefined;
    delete this.props;
    return this;
  }

  setType(type) {
    this.type = type;
    return this;
  }

  resetType() {
    this.type = undefined;
    delete this.type;
    return this;
  }

  setEnums(enums) {
    this.enums = enums;
    return this;
  }

  resetEnums() {
    this.enums = undefined;
    delete this.enums;
    return this;
  }

  setDefaultValue(defaultValue) {
    this.defaultValue = defaultValue;
    return this;
  }

  resetDefaultValue() {
    this.defaultValue = undefined;
    delete this.defaultValue;
    return this;
  }

  setWidth(width) {
    this.width = width;
    return this;
  }

  resetWidth() {
    this.width = undefined;
    delete this.width;
    return this;
  }

  setFormItemWidth(formItemWidth) {
    this.formItemWidth = formItemWidth;
    return this;
  }

  resetFormItemWidth() {
    this.formItemWidth = undefined;
    delete this.formItemWidth;
    return this;
  }

  setPlaceholder(placeholder) {
    this.placeholder = placeholder;
    return this;
  }

  resetPlaceholder() {
    this.placeholder = undefined;
    delete this.placeholder;
    return this;
  }

  setDisabled() {
    this.disabled = true;
    return this;
  }

  resetDisabled() {
    this.disabled = undefined;
    delete this.disabled;
    return this;
  }

  setIsFull() {
    this.isFull = true;
    return this;
  }

  resetIsFull() {
    this.isFull = undefined;
    delete this.isFull;
    return this;
  }

  setValidateMethod(validateMethod) {
    this.validateMethod = validateMethod;
    return this;
  }

  resetValidateMethod() {
    this.validateMethod = undefined;
    delete this.validateMethod;
    return this;
  }

  setListComponent(listComponent) {
    this.listComponent = listComponent;
    return this;
  }

  resetListComponent() {
    this.listComponent = undefined;
    delete this.listComponent;
    return this;
  }

  setEditComponent(editComponent) {
    this.editComponent = editComponent;
    return this;
  }

  resetEditComponent() {
    this.editComponent = undefined;
    delete this.editComponent;
    return this;
  }

  setInputClass(inputClass) {
    this.inputClass = inputClass;
    return this;
  }

  resetInputClass() {
    this.inputClass = undefined;
    delete this.inputClass;
    return this;
  }

  setIsExpand() {
    this.isExpand = true;
    return this;
  }

  resetIsExpand() {
    this.isExpand = undefined;
    delete this.isExpand;
    return this;
  }

  setIsHtml() {
    this.isHtml = true;
    return this;
  }

  resetIsHtml() {
    this.isHtml = undefined;
    delete this.isHtml;
    return this;
  }

  // 自定义字段不能覆盖已定义的字段
  setCustomize(key, value) {
    if (!RESERVED_WORDS.includes(key)) this[key] = value;
    return this;
  }

  resetCustomize(key) {
    if (!RESERVED_WORDS.includes(key)) {
      this[key] = undefined;
      delete this[key];
    }
    return this;
  }
}
