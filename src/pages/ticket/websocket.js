class Socket {
  constructor({ url = '', token = '', roomId = '', callback = () => {} }) {
    this.url = url;
    this.callback = callback;
    this.token = token;
    this.roomId = roomId;
    this.ws = {};
    this.init();
  }

  init() {
    this.ws = new WebSocket(`wss://${this.url}`);
    this.ws.onopen = () => this.onOpen(this.token, this.roomId);
    this.ws.onmessage = e => this.onMessage(e, this.callback);
    this.ws.onerror = this.onError;
    this.ws.onclose = this.onClose;
  }

  onOpen(token, roomId) {
    // 连接时,根据身份校验事件,传参给服务端设置对应的连接信息
    this.send({
      event: 'auth',
      message: {
        token,
        roomId
      }
    });
  }

  send(data) {
    this.ws.send(JSON.stringify(data));
  }

  onMessage(e, callback) {
    const data = JSON.parse(e.data);
    switch (data.event) {
      case 'noAuth':
        // 验证失败,返回登录页
        location.href = '/login';
        break;
      case 'heartbeat':
        // 心跳检测,当连接成功,服务端就会定时发起ping请求,需要回复,让服务端知道客户端在线,
        this.send({
          event: 'heartbeat',
          message: 'pong'
        });
        clearTimeout(this.pingTimeout);
        this.pingTimeout = setTimeout(() => {
          this.close();
          this.init();
        }, 1000 + 1000);
        break;
      default:
        callback(data);
    }
  }

  onError() {
    console.log('websocket连接错误');
  }

  onClose() {
    console.log('websocket连接断开');
  }

  close() {
    // 关闭websocket连接需要关闭心跳检测定时器,防止断开后原来的定时器还在运行连接
    clearTimeout(this.pingTimeout);
    this.ws.close();
  }
}

export default Socket;
