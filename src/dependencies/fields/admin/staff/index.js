import { Field } from 'src/dependencies/fields/Field';
import BooleanEnums from 'src/dependencies/enums/Boolean';

export const activate = new Field({
  prop: 'activate',
  label: '是否已激活',
  type: 'select',
  enums: BooleanEnums,
  required: true
});
