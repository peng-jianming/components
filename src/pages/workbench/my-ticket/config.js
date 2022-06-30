import { Fields } from 'src/dependencies/fields/Fields';
import {
  ticketType,
  customerName,
  phoneNumber,
  feedbackChannel,
  problemHeppenTime,
  description
} from 'src/dependencies/fields/ticket/create/create';
import {
  ticketId,
  ticketStatus,
  responsible,
  currentHandler,
  post,
  createTime
} from 'src/dependencies/fields/ticket/list/list';
import TicketIdLinkComponent from 'src/pages/ticket/list/components/TicketIdLink';

export const listFields = new Fields([
  ticketId
    .clone()
    .setListComponent(TicketIdLinkComponent)
    .setCustomize('acrossPage', true),
  ticketType,
  ticketStatus,
  description.clone().setIsHtml(),
  responsible,
  currentHandler,
  post,
  createTime,
  customerName,
  phoneNumber,
  feedbackChannel,
  problemHeppenTime.clone().setCustomize('sep', '-')
]);

export const queryConfig = [
  ticketId.clone().setFormItemWidth('30%').setFormItemInline(),
  ticketType.clone().setFormItemWidth('30%').setFormItemInline(),
  ticketStatus.clone().setFormItemWidth('30%').setFormItemInline()
];
