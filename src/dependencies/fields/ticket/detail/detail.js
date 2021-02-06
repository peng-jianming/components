import { Field } from 'src/dependencies/fields/Field';

export const reply = new Field({
  prop: 'reply',
  label: '回复'
});

export const processor = new Field({
  prop: 'processor',
  label: '处理人',
  type: 'user',
  required: true
});
