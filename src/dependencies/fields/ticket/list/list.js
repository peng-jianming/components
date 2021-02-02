import { Field } from 'src/dependencies/fields/Field';
import PostEnums from 'src/dependencies/enums/ticket/list/Post';
import TicketStatusEnums from 'src/dependencies/enums/ticket/list/TicketStatus';

export const ticketId = new Field({
  prop: 'ticket_id',
  label: '工单id'
});

export const currentHandler = new Field({
  prop: 'current_handler',
  label: '当前处理人',
  type: 'user'
});

export const responsible = new Field({
  prop: 'responsible',
  label: '客户代表',
  type: 'user'
});

export const post = new Field({
  prop: 'post',
  label: '岗位',
  type: 'radio',
  enums: PostEnums
});

export const ticketStatus = new Field({
  prop: 'ticket_status',
  label: '工单状态',
  type: 'select',
  enums: TicketStatusEnums
});

export const createTime = new Field({
  prop: 'create_time',
  label: '创建时间'
});
