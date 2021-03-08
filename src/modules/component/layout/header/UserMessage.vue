<template>
  <div class="user">
    <div class="user-item">
      <el-avatar size="small" :src="userInfo.avatar"></el-avatar>
      <span class="user-item-name">{{ userInfo.user_name }}</span>
    </div>
    <div class="user-feature-list">
      <edit-form-dialog-component
        btn-type="text"
        btn-text="个人设置"
        title="个人设置"
        append-to-body
        :configs="userConfig"
        :data="userInfo"
        @submit="submit"
      />
      <edit-dialog-component
        ref="dialog"
        btn-type="text"
        btn-text="消息"
        title="消息"
        append-to-body
        :is-handle-button="false"
        @open="openMessageDialog"
      >
        <el-collapse v-model="activeNames" accordion @change="handleChange">
          <el-collapse-item
            v-for="{ title, content, _id, isRead } in messages"
            :key="_id"
            :name="_id"
          >
            <template #title>
              <div>
                <span>{{ title }}</span>
                <span v-if="!isRead" style="color: red">(未读)</span>
              </div>
            </template>
            <div>
              {{ content }}
            </div>
          </el-collapse-item>
        </el-collapse>
        <div style="text-align: center; margin-top: 10px;">
          <el-pagination
            :current-page.sync="page"
            layout="prev, pager, next"
            :total="total"
            @current-change="openMessageDialog"
          />
        </div>
      </edit-dialog-component>
      <edit-form-dialog-component
        btn-type="text"
        btn-text="修改密码"
        title="修改密码"
        append-to-body
        width="600px"
        :configs="passwordConfig"
        @submit="changePassword"
      />
      <el-button type="text" @click="logout">注销</el-button>
    </div>
  </div>
</template>

<script>
import EditFormDialogComponent from 'src/modules/component/EditFormDialog';
import EditDialogComponent from 'src/modules/component/EditDialog';
import { userConfig, passwordConfig } from './config';
import storage from 'src/modules/utils/storage';
import {
  patchChangePassword,
  getUserMessage,
  patchUserMessage
} from 'src/dependencies/api/user';
import Socket from 'src/pages/ticket/websocket';
import TipComponent from './Tip';

const { remove: removeToken, get: getToken } = storage('token');
export default {
  components: {
    EditFormDialogComponent,
    EditDialogComponent
  },
  data() {
    return {
      userConfig,
      passwordConfig,
      activeNames: '',
      messages: [],
      limit: 10,
      page: 1,
      total: 0
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.user.user;
    }
  },
  mounted() {
    this.socket = new Socket({
      url: 'www.pengjianming.top:8080',
      // url: '127.0.0.1:8080',
      token: getToken(),
      callback: data => {
        if (data.event === 'tip') {
          this.openMessageDialog();
          this.$notify({
            title: '提示',
            dangerouslyUseHTMLString: true,
            message: this.$createElement(TipComponent, {
              props: { title: data.data.title, id: data.data.id },
              on: {
                open: this.open
              }
            })
          });
        }
      }
    });
  },
  methods: {
    async open(id) {
      this.activeNames = id;
      const { data } = await patchUserMessage({
        data: {
          id
        }
      });
      if (data && data.code === 0) {
        this.$refs.dialog.open();
      }
    },
    async openMessageDialog(page = this.page, limit = this.limit) {
      const { data } = await getUserMessage({
        query: {
          page,
          limit
        }
      });
      if (data && data.code === 0) {
        this.total = data.data.total;
        this.messages = data.data.data;
      }
    },
    async handleChange(val) {
      if (val) {
        const { data } = await patchUserMessage({
          data: {
            id: val
          }
        });
        if (data && data.code === 0) {
          this.openMessageDialog();
        }
      }
    },
    logout() {
      this.$confirm('准备注销, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeToken();
        location.href = '/login';
      });
    },
    submit(data) {
      this.$store.dispatch('setUser', data);
    },
    async changePassword({ params, callback }) {
      const { data } = await patchChangePassword({
        data: params
      });
      if (data && data.code === 0) {
        this.$message({
          message: '修改成功',
          type: 'success'
        });
        callback && callback();
      }
    }
  }
};
</script>
<style lang="less" scoped>
.user {
  position: absolute;
  top: 11px;
  right: 30px;
  font-size: 14px;
  &:hover .user-feature-list {
    display: block;
  }
  &-item {
    height: 30px;
    min-width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    &-name {
      margin-left: 10px;
    }
  }
  .user-feature-list {
    display: none;
    width: 70px;
    background-color: #fff;
    padding: 8px 16px;
    border-radius: 12px;
    position: absolute;
    top: 29px;
    left: 15px;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);
  }
}
</style>
<style lang="less">
.user-feature-list {
  z-index: 9999;
  .el-button--text {
    color: #333;
    font-size: 13px;
    padding: 6px 0;
    &:hover {
      color: #00c !important;
    }
  }
}
</style>
