import { Field } from 'src/dependencies/fields/Field';
import TicketTypeEnums from 'src/dependencies/enums/ticket/create/TicketType';
import FeedbackEnums from 'src/dependencies/enums/ticket/create/Feedback';

export const ticketType = new Field({
  prop: 'ticket_type',
  label: '工单类型',
  type: 'select',
  enums: TicketTypeEnums,
  required: true
});

export const customerName = new Field({
  prop: 'customer_name',
  label: '客户名称',
  required: true
});

export const phoneNumber = new Field({
  prop: 'phone_number',
  label: '联系电话',
  validateMethod: (params, newData, oldData) => {
    return (
      /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/.test(
        params
      ) || '手机号码格式不正确'
    );
  },
  required: true
});

export const feedbackChannel = new Field({
  prop: 'feedback_channel',
  label: '反馈渠道',
  type: 'radio',
  enums: FeedbackEnums,
  required: true
});

export const problemHeppenTime = new Field({
  prop: 'problem_heppen_time',
  props: ['problem_heppen_start_time', 'problem_heppen_end_time'],
  label: '问题发生时间',
  type: 'datetimerange',
  required: true
});

export const description = new Field({
  prop: 'description',
  label: '问题描述',
  required: true
});

export const copyToPeople = new Field({
  prop: 'copy_to_people',
  label: '抄送人',
  type: 'user'
});
