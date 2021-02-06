export const TicketStatus = Object.freeze({
  PENDING: 1,
  IN_HAND: 2,
  CLOSE_APPLICATION: 3,
  AGREE_CLOSE: 4,
  REFUSE_CLOSE: 5,
  CLOSED: 6,
  DELETED: 7
});

export default [
  { id: 1, name: 'PENDING', value: '待处理' },
  { id: 2, name: 'IN_HAND', value: '处理中' },
  { id: 3, name: 'CLOSE_APPLICATION', value: '申请结单' },
  { id: 4, name: 'AGREE_CLOSE', value: '同意结单' },
  { id: 5, name: 'REFUSE_CLOSE', value: '拒绝结单' },
  { id: 6, name: 'CLOSED', value: '已结单' },
  { id: 7, name: 'DELETED', value: '已删除' }
];
