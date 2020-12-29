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
  ticketStatus
} from 'src/dependencies/fields/ticket/detail/detail';

export const customerConfigFields = new Fields([customerName, phoneNumber]);

export const ticketConfigFields = new Fields([
  ticketId,
  ticketType,
  ticketStatus,
  createTime,
  feedbackChannel
]);
