import { Field } from '../../Field';
import TicketStatusEnums from 'src/dependencies/enums/ticket/detail/TicketStatus';

export const ticketId = new Field({
  prop: 'ticket_id',
  label: '工单id'
});

export const createTime = new Field({
  prop: 'create_time',
  label: '创建时间'
});

export const ticketStatus = new Field({
  prop: 'ticket_status',
  label: '工单状态',
  type: 'select',
  enums: TicketStatusEnums
});
