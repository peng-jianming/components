import { Fields } from 'src/dependencies/fields/Fields';
import { Field } from 'src/dependencies/fields/Field';
import {
  ticketType,
  customerName,
  phoneNumber,
  feedbackChannel,
  problemHeppenTime,
  description
} from 'src/dependencies/fields/ticket/create';
import RichTextEidtor from 'src/modules/component/rich-text-editor';
import EditComponent from '../Edit';
const DATE_FORMAT = 'yyyy-MM-dd HH:mm:ss';

const handle = new Field({
  prop: 'handle',
  label: '操作'
});

export const listFields = new Fields([
  ticketType,
  customerName,
  phoneNumber,
  feedbackChannel,
  problemHeppenTime,
  description,
  handle
    .clone()
    .setIsFull()
    .setListComponent(EditComponent)
]);

export const editFields = new Fields([
  ticketType,
  customerName,
  phoneNumber,
  feedbackChannel,
  problemHeppenTime.clone().setCustomize('valueFormat', DATE_FORMAT),
  description.clone().setEditComponent(RichTextEidtor)
]);
