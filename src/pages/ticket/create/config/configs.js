import { Fields } from 'src/dependencies/fields/Fields';
import {
  ticketType,
  customerName,
  phoneNumber,
  feedbackChannel,
  problemHeppenTime,
  description
} from 'src/dependencies/fields/ticket/create';
import RichTextEidtor from 'src/modules/component/rich-text-editor';
const DATE_FORMAT = 'yyyy-MM-dd HH:mm:ss';

export const configFields = new Fields([
  ticketType.clone().setFormItemWidth('400px'),
  customerName.clone().setFormItemWidth('400px'),
  phoneNumber.clone().setFormItemWidth('400px'),
  feedbackChannel,
  problemHeppenTime
    .clone()
    .setCustomize('valueFormat', DATE_FORMAT)
    .setDefaultValue([
      '2021-01-28 23:59:59',
      '2020-12-03 00:00:00',
      ['2021-01-28 23:59:59', '2020-12-03 00:00:00']
    ])
    .setFormItemWidth('600px'),
  description
    .clone()
    .setEditComponent(RichTextEidtor)
    .setFormItemWidth('600px')
]);
