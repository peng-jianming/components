export const TicketStatus = Object.freeze({
  PENDING: 1,
  IN_HAND: 2,
  CLOSE_APPLICATION: 3,
  CLOSED: 4,
  DELETED: 5
});

export default [
  { id: 1, name: 'PENDING', value: '待处理' },
  { id: 2, name: 'IN_HAND', value: '处理中' },
  { id: 3, name: 'CLOSE_APPLICATION', value: '申请结单' },
  { id: 4, name: 'CLOSED', value: '已结单' },
  { id: 5, name: 'DELETED', value: '已删除' }
];
