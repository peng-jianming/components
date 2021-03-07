<template>
  <el-scrollbar ref="scrollbar" style="height: 100%; width: 100%">
    <div
      v-for="({ user, text }, index) in chatRecordList"
      :key="index"
      class="chat-item clearfloat"
    >
      <!-- 系统提示 -->
      <div v-if="user.user_name === 'admin'" class="admin">
        <el-tag type="warning">{{ text }}</el-tag>
      </div>
      <template v-else>
        <!-- 本人聊天框右,其他人左 -->
        <div
          :class="[
            user.user_name === $store.state.user.user.user_name
              ? 'chat-avatar-right'
              : 'chat-avatar-left'
          ]"
        >
          <el-avatar shape="square" :src="user.avatar"> </el-avatar>
        </div>
        <div
          :class="[
            user.user_name === $store.state.user.user.user_name
              ? 'chat-content-right'
              : 'chat-content-left'
          ]"
        >
          <span class="html" v-html="text"></span>
        </div>
      </template>
    </div>
  </el-scrollbar>
</template>

<script>
import Socket from 'src/pages/ticket/websocket';
import storage from 'src/modules/utils/storage';
import { getTicketChatRecord } from 'src/dependencies/api/ticket/detail';

const { get: getToken } = storage('token');
export default {
  data() {
    return {
      chatRecordList: []
    };
  },
  mounted() {
    this.getTicketChatRecord();
    this.socket = new Socket({
      url: 'www.pengjianming.top:8080',
      // url: '127.0.0.1:8080',
      token: getToken(),
      roomId: this.$route.query.id,
      callback: data => {
        if (data.event === 'chat') {
          this.getTicketChatRecord();
        }
      }
    });
  },
  destroyed() {
    this.socket.close();
  },
  updated() {
    // 保证有消息来重新渲染DOM时,滚动条可以重置到底部
    this.$refs.scrollbar.wrap.scrollTop = this.$refs.scrollbar.wrap.scrollHeight;
  },
  methods: {
    async getTicketChatRecord() {
      const { data } = await getTicketChatRecord({
        params: {
          id: this.$route.query.id
        }
      });
      if (data && data.code === 0) {
        this.chatRecordList = data.data;
      }
    }
  }
};
</script>
<style lang="less">
.admin {
  text-align: center;
}
.page-detail-content-process {
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .el-scrollbar__view {
    padding: 10px;
  }
}
</style>
<style lang="less" scoped>
.chat-item {
  margin-bottom: 10px;
  .chat-content-left {
    position: relative;
    float: left;
    min-height: 40px;
    background-color: #fff;
    margin-left: 15px;
    border-radius: 5px;
    padding: 8px 5px;
    box-sizing: border-box;
    max-width: 1200px;
    &::before {
      content: '';
      position: absolute;
      top: 10px;
      left: -13px;
      width: 0;
      height: 0;
      font-size: 0;
      border: solid 7px;
      border-color: #f3f3f3 #fff #f3f3f3 #f3f3f3;
    }
  }
  .chat-content-right {
    float: right;
    position: relative;
    min-height: 40px;
    background-color: #fff;
    margin-right: 15px;
    border-radius: 5px;
    padding: 8px 5px;
    box-sizing: border-box;
    max-width: 1200px;
    &::before {
      content: '';
      position: absolute;
      top: 10px;
      right: -13px;
      width: 0;
      height: 0;
      font-size: 0;
      border: solid 7px;
      border-color: #f3f3f3 #f3f3f3 #f3f3f3 #fff;
    }
  }
  .chat-avatar-left {
    float: left;
  }
  .chat-avatar-right {
    float: right;
  }
}
</style>
