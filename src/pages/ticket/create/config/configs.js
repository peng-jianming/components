import TicketTypeEnums from 'src/dependencies/enums/ticket/create/TicketType';
import FeedbackEnums from 'src/dependencies/enums/ticket/create/Feedback';

const DATE_FORMAT = 'yyyy-MM-dd HH:mm:ss';

export const configs = [
  {
    prop: 'ticket_type',
    label: '工单类型',
    type: 'select',
    enums: TicketTypeEnums,
    required: true,
    formItemWidth: '400px'
  },
  {
    prop: 'customer_name',
    label: '客户名称',
    required: true,
    formItemWidth: '400px'
  },
  {
    prop: 'phone_number',
    label: '联系电话',
    type: 'number',
    required: true,
    formItemWidth: '400px'
  },
  {
    prop: 'feedback_channel',
    label: '反馈渠道',
    type: 'radio',
    enums: FeedbackEnums,
    required: true
  },
  {
    prop: 'problem_heppen_time',
    props: ['a', 'b'],
    label: '问题发生时间',
    type: 'datetimerange',
    valueFormat: DATE_FORMAT,
    required: true
  }
];
