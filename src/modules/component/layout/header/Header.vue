<template>
  <div class="page-header">
    <div class="page-logo">
      <img :src="logo" />
    </div>
    <ul class="page-menu clearfloat">
      <li v-for="item in menus" :key="item.id" class="menu-item">
        <a :href="item.link">{{ item.name }}</a>
      </li>
    </ul>

    <div
      class="user"
      @mouseenter="showUserFeatureList = true"
      @mouseleave="showUserFeatureList = false"
    >
      <div class="user-item">
        <el-avatar size="small" :src="userInfo.avatar"></el-avatar>
        <span class="user-item-name">{{ userInfo.user_name }}</span>
      </div>
      <div v-show="showUserFeatureList" class="user-feature-list">
        <edit-form-dialog-component
          btn-type="text"
          btn-text="个人设置"
          title="个人设置"
          append-to-body
          :configs="userConfig"
          :data="userInfo"
          @submit="submit"
        />
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
  </div>
</template>

<script>
import EditFormDialogComponent from 'src/modules/component/EditFormDialog';
import logo from 'src/modules/img/logo.png';
import { userConfig, passwordConfig } from './config';
import storage from 'src/modules/utils/storage';
import { patchChangePassword } from 'src/dependencies/api/user';

const { remove: removeToken } = storage('token');

export default {
  components: {
    EditFormDialogComponent
  },
  data() {
    return {
      logo,
      menus: [
        {
          id: '1',
          name: '与我相关',
          link: '/workbench/'
        },
        {
          id: '2',
          name: '客服工单',
          link: '/ticket/'
        },
        {
          id: '3',
          name: '系统设置',
          link: '/admin/'
        }
      ],
      showUserFeatureList: false,
      userConfig,
      passwordConfig
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.user.user;
    }
  },
  methods: {
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
        this.$notify({
          title: '成功',
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
.page-header {
  position: relative;
  min-height: 50px;
  background-color: #409eff;
  .page-logo {
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    width: 160px;
    height: 50px;
    text-align: center;
    padding: 5px 0;
    background-color: #409eff;
    img {
      width: 80%;
    }
  }
  .page-menu {
    padding-left: 200px;
    font-size: 18px;
    text-align: center;
    .menu-item {
      width: 100px;
      height: 50px;
      line-height: 50px;
      float: left;
      a {
        color: white;
        &:hover {
          color: #1168ef;
        }
      }
    }
  }
  .user {
    position: absolute;
    top: 11px;
    right: 30px;
    font-size: 14px;
    &-item {
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
      background-color: #fff;
      padding: 8px 16px;
      border-radius: 12px;
      position: absolute;
      top: 29px;
      left: 15px;
      box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);
    }
  }
}
</style>
<style lang="less">
.user-feature-list {
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
