import { Fields } from 'src/dependencies/fields/Fields';
import { reply } from 'src/dependencies/fields/ticket/detail/detail';
import { copyToPeople } from 'src/dependencies/fields/ticket/create/create';
import { ticketStatus } from 'src/dependencies/fields/ticket/list/list';
import RichTextEditorComponent from 'src/modules/component/rich-text-editor';
import TicketStatusEnums, {
  TicketStatus
} from 'src/dependencies/enums/ticket/list/TicketStatus';

export default new Fields([
  ticketStatus
    .clone()
    .setType('radio')
    .resetRequired()
    .setShowCondition(
      context =>
        // 当前处理人和客户代表并且不是待处理状态,才显示状态
        [context.data.responsible, context.data.current_handler].includes(
          context.user.user_name
        ) && context.data[ticketStatus.prop] !== TicketStatus.PENDING
    ),
  reply
    .clone()
    .setEditComponent(RichTextEditorComponent)
    .setFormItemWidth('700px'),
  copyToPeople
    .clone()
    .setCustomize('singleton', false)
    .setFormItemWidth('700px')
])
  .registerChangeField({
    // 处理中,客户代表是自己,显示已结单
    prop: ticketStatus.prop,
    condition: context => {
      return (
        context.data[ticketStatus.prop] === TicketStatus.IN_HAND &&
        context.data.responsible === context.user.user_name
      );
    },
    converter: field => {
      field.setEnums(
        TicketStatusEnums.filter(({ id }) => TicketStatus.CLOSED === id)
      );
    }
  })
  .registerChangeField({
    // 处理中,客户代表不是自己,并且当前处理人是自己(即是运维),显示申请结单
    prop: ticketStatus.prop,
    condition: context => {
      return (
        context.data[ticketStatus.prop] === TicketStatus.IN_HAND &&
        context.data.responsible !== context.user.user_name &&
        context.data.current_handler === context.user.user_name
      );
    },
    converter: field => {
      field.setEnums(
        TicketStatusEnums.filter(
          ({ id }) => TicketStatus.CLOSE_APPLICATION === id
        )
      );
    }
  })
  .registerChangeField({
    // 申请结单,自己是客户代表,显示同意申请结单,拒绝申请结单
    prop: ticketStatus.prop,
    condition: context => {
      return (
        context.data[ticketStatus.prop] === TicketStatus.CLOSE_APPLICATION &&
        context.data.responsible === context.user.user_name
      );
    },
    converter: field => {
      field.setEnums(
        TicketStatusEnums.filter(({ id }) =>
          [TicketStatus.AGREE_CLOSE, TicketStatus.REFUSE_CLOSE].includes(id)
        )
      );
    }
  });
