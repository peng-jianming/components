<template>
  <div class="pc-header">
    <div class="el-menu-item page-logo">
      <img
        src="https://tool-1253841380.file.myqcloud.com/assets/images/andon-logo-2.png"
        @click="handleRedirect('/')"
      />
    </div>
    <ul role="menubar" class="page-menu">
      <!-- 顶部菜单 -->
      <li
        v-for="item in menus"
        :key="item.id"
        v-report:click="item.name"
        class="menu-item"
      >
        <!-- 有子菜单 -->
        <el-popover
          v-if="item.children && item.children.length > 0"
          transition="el-zoom-in-bottom"
          placement="bottom-start"
          trigger="hover"
          :open-delay="50"
        >
          <a
            slot="reference"
            :href="item.link"
            :target="item.opening_way === 1 ? '' : '_blank'"
            >{{ item.name }}</a
          >
          <!-- <a slot="reference" href="#">{{ item.title }}</a> -->
          <ul class="child-menu">
            <li v-for="child in item.children" :key="child.id">
              <i v-if="!child.img_url" class="el-icon-tickets"></i>
              <img v-else :src="child.img_url" />
              <a
                :href="child.link"
                :target="child.opening_way === 1 ? '' : '_blank'"
                >{{ child.name }}</a
              >
            </li>
          </ul>
        </el-popover>
        <!-- 没有子菜单 -->
        <a
          v-else
          :href="item.link"
          :target="item.opening_way === 1 ? '' : '_blank'"
          >{{ item.name }}</a
        >
      </li>
    </ul>
    <div class="user-item">
      {{ user && user.user_name }} (
      {{ user && user.company && user.company.short_name }} )
      <a href="/logout">退出</a>
      <a class="feedback" href="javascript:void(0);" @click="showfeedbackbox">
        意见反馈
      </a>
    </div>
    <el-dialog :visible.sync="dialogVisible" class="dialog">
      <el-tabs stretch @tab-click="handleClick">
        <el-tab-pane label="提交反馈">
          <iframe
            class="feedback-content"
            :src="submitUrl"
            width="100%"
            height="100%"
          />
        </el-tab-pane>
        <el-tab-pane label="反馈历史">
          <iframe
            class="feedback-content"
            :src="historyUrl"
            width="100%"
            height="100%"
          />
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: {
    user: Object,
    menus: Array
  },
  data() {
    return {
      dialogVisible: false,
      submitUrl: '',
      historyUrl: ''
    };
  },

  methods: {
    handleRedirect(path) {
      if (window.location.pathname !== path) {
        window.location.href = path;
      }
    },
    // 点击反馈历史时才请求
    async handleClick(val) {
      if (val.paneName === '1') {
        await axios
          .get(`/ticket/api/tickets/aisee?port=pc&operate=list`)
          .then(({ data }) => {
            if (data && data.code === 0) {
              this.historyUrl = data.data.url;
            }
          });
      }
    },
    async showfeedbackbox() {
      this.dialogVisible = true;
      await axios
        .get(`/ticket/api/tickets/aisee?port=pc&operate=submit`)
        .then(({ data }) => {
          if (data && data.code === 0) {
            this.submitUrl = data.data.url;
          }
        });
    }
  }
};
</script>

<style scoped lang="less">
a {
  text-decoration: none;
}
.page-menu {
  padding-left: 160px;
  padding-right: 236px;
  margin: 0;
  text-align: left;
  .menu-item {
    list-style: none;
    display: inline-block;
    a {
      font-size: 16px;
      color: white;
      &:hover {
        color: #1168ef;
        display: inline-block;
      }
    }
  }
}
.child-menu {
  margin: 0;
  padding: 0;
  list-style: none;
  > li {
    display: block;
    height: 25px;
    line-height: 25px;
    margin-bottom: 5px;
    cursor: pointer;
    &:hover a {
      color: #1168ef;
    }
    > a {
      padding: 0 10px;
      color: #141414;
      line-height: 20px;
      height: 25px;
      vertical-align: text-bottom;
    }
    > img {
      width: 24px;
      height: 24px;
    }
  }
}

.el-menu-item {
  padding: 0;
}
a {
  display: inline-block;
  padding: 0 20px;
  line-height: 49px;
}
a:hover {
  text-decoration: none;
}
.page-logo img {
  width: 80%;
}
.pc-header {
  position: relative;
  background-color: #262626;
  .center {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
  }
  .el-menu-item.page-logo {
    position: absolute;
    left: 0;
    top: 0;
    display: inline-block;
    width: 160px;
    height: 49px;
    z-index: 2;
    line-height: 49px;
    text-align: center;
    font-size: 0; // 解决logo图片不居中

    &:active,
    &:focus,
    &:hover {
      background-color: #262626;
    }
  }
  .page-menu {
    z-index: 1;
    background-color: #2b303b;
    padding-left: 160px;
    padding-right: 200px;
    > li.el-menu-item {
      font-size: 16px;
      color: #c1c6c8;
      height: 49px;
      line-height: 49px;

      &:focus,
      &:active,
      &:hover {
        background: darken(#262626, 5%);
        color: #fff;
      }
    }
  }
  .user-item {
    position: absolute;
    top: 0;
    right: 0;
    max-width: 200px;
    line-height: 49px;
    height: 49px;
    font-size: 14px;
    color: #fff;
    z-index: 2;
    padding: 0 20px;

    > a {
      color: #fff;
      margin-left: 10px;
    }
  }
}
.pc-header .user-item {
  max-width: 300px;
}
.pc-header .user-item .feedback {
  padding: 0;
  margin: 0;
}
.pc-header .user-item .feedback .submit-btn {
  display: none;
}
.dialog .feedback-content {
  border: 0;
  height: 425px;
}
.andon-know {
  position: relative;
  z-index: 9;
  padding-right: 10px;
  span {
    display: inline-block;
    padding: 0 20px;
    line-height: 49px;
  }
  &:after {
    content: 'new';
    position: absolute;
    top: -8px;
    right: 4px;
    font-size: 12px;
    color: #f8e71c;
    font-style: italic;
    font-weight: bold;
  }
}
</style>
