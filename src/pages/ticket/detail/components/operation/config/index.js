import { Field } from 'src/dependencies/fields/Field';
import { Fields } from 'src/dependencies/fields/Fields';
import tranferConfig from './tranferConfig';
import handleConfig from './handleConfig';
import { TicketStatus } from 'src/dependencies/enums/ticket/list/TicketStatus';
import { Action } from 'src/dependencies/enums/ticket/detail/Action';

const handleTicket = new Field({
  prop: 'handle_ticket',
  label: '处理工单'
});

const tranferTicket = new Field({
  prop: 'tranfer_ticket',
  label: '转单'
});

export const tabsFields = new Fields([
  new Fields([
    handleTicket
      .clone()
      .setCustomize('action', Action.IN_HAND)
      .setCustomize('fieldConfig', handleConfig),
    tranferTicket
      .clone()
      .setCustomize('action', Action.TRANSFER)
      .setCustomize('fieldConfig', tranferConfig)
      .setShowCondition(
        // 当前状态不为申请结单,并且自己时当前处理人或者客户代表时,显示转单tab
        context =>
          TicketStatus.CLOSE_APPLICATION !== context.data.ticket_status &&
          [context.data.responsible, context.data.current_handler].includes(
            context.user.user_name
          )
      )
  ]).setShowCondition(
    context => TicketStatus.CLOSED !== context.data.ticket_status
  )
]);
