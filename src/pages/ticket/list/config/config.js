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
import TicketIdLinkComponent from '../components/TicketIdLink';

export const listFields = new Fields([
  ticketId.clone().setListComponent(TicketIdLinkComponent),
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

export const queryFields = new Fields([
  ticketId.clone().setFormItemWidth('30%').setFormItemInline(),
  ticketType.clone().setFormItemWidth('30%').setFormItemInline(),
  ticketStatus.clone().setFormItemWidth('30%').setFormItemInline(),
  responsible.clone().setFormItemWidth('30%').setFormItemInline(),
  currentHandler.clone().setFormItemWidth('30%').setFormItemInline(),
  post.clone().setFormItemWidth('30%').setFormItemInline().setType('select'),
  customerName.clone().setFormItemWidth('30%').setFormItemInline(),
  feedbackChannel
    .clone()
    .setFormItemWidth('30%')
    .setFormItemInline()
    .setType('select'),
  problemHeppenTime.clone().setFormItemWidth('30%').setFormItemInline()
]);
