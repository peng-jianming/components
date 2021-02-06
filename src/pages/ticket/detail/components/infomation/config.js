import { Fields } from 'src/dependencies/fields/Fields';
import {
  ticketType,
  customerName,
  phoneNumber,
  feedbackChannel
} from 'src/dependencies/fields/ticket/create/create';
import {
  ticketId,
  createTime,
  ticketStatus,
  post,
  responsible,
  currentHandler
} from 'src/dependencies/fields/ticket/list/list';

export const customerConfigFields = new Fields([customerName, phoneNumber]);

export const ticketConfigFields = new Fields([
  ticketId,
  ticketType,
  ticketStatus,
  post,
  responsible,
  currentHandler,
  createTime,
  feedbackChannel
]);
