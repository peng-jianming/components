<template>
  <el-card>
    <div slot="header">
      <edit-form-dialog-component
        btn-type="text"
        btn-text="新增"
        :configs="[title]"
        @submit="addPermission"
      />
    </div>
    <el-tree
      ref="tree"
      :data="treeData"
      node-key="_id"
      default-expand-all
      :expand-on-click-node="false"
      @current-change="currentChange"
    >
      <span slot-scope="{ node, data }" class="custom-tree-node">
        <span>{{ data.title }}</span>
        <span class="custom-tree-option">
          <edit-form-dialog-component
            v-if="node.level <= 2"
            append-to-body
            btn-type="text"
            icon="el-icon-plus"
            :configs="node.level === 1 ? [title] : config"
            @submit="append($event, node)"
          />
          <edit-form-dialog-component
            append-to-body
            btn-type="text"
            icon="el-icon-edit"
            :configs="node.level === 3 ? config : [title]"
            :data="data"
            @submit="update($event, node, data)"
          />
          <el-button type="text" icon="el-icon-delete" @click="remove(node)" />
        </span>
      </span>
    </el-tree>
  </el-card>
</template>

<script>
import EditFormDialogComponent from 'src/modules/component/EditFormDialog';
import config from '../configs';
import {
  postPermission,
  getPermission,
  putPermission,
  deletePermission
} from 'src/dependencies/api/admin/permission';
import { title } from 'src/dependencies/fields/admin/permission/settingManage';
export default {
  components: {
    EditFormDialogComponent
  },
  data() {
    return {
      config,
      title,
      treeData: [],
      currentRootParantId: ''
    };
  },
  mounted() {
    this.getPermission();
  },
  methods: {
    currentChange(data) {
      this.$emit('update:current-data', data);
    },
    // 获取当前根节点数据,由于后端使用的mongoDB所以,更新时传递根节点数据更新
    getRootNode(node) {
      if (node.parent) {
        if (node.level === 1) {
          this.currentRootParantId = node.data._id;
        } else {
          this.getRootNode(node.parent);
        }
      }
    },
    async append({ params, callback }, node) {
      this.getRootNode(node);
      this.$refs.tree.append(params, node);
      const { data } = await putPermission({
        params: {
          id: this.currentRootParantId
        },
        data: this.treeData.find(({ _id }) => this.currentRootParantId === _id)
      });
      if (data && data.code === 0) {
        this.$message({
          message: '操作成功',
          type: 'success'
        });
        callback && callback();
      }
    },
    async remove(node) {
      this.$confirm(`是否确认删除${node.data.title}?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const api = node.level === 1 ? deletePermission : putPermission;
        this.getRootNode(node);
        this.$refs.tree.remove(node);
        const { data } = await api({
          params: {
            id: this.currentRootParantId
          },
          data: this.treeData.find(
            ({ _id }) => this.currentRootParantId === _id
          )
        });
        if (data && data.code === 0) {
          this.$message({
            message: '操作成功',
            type: 'success'
          });
        }
      });
    },
    async update({ params, callback }, node) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d._id === node.data._id);
      this.$set(children, index, { ...children[index], ...params });
      this.getRootNode(node);
      const { data } = await putPermission({
        params: {
          id: this.currentRootParantId
        },
        data: this.treeData.find(({ _id }) => this.currentRootParantId === _id)
      });
      if (data && data.code === 0) {
        this.$message({
          message: '操作成功',
          type: 'success'
        });
        this.currentChange({});
        callback && callback();
      }
    },
    async getPermission() {
      const { data } = await getPermission();
      if (data && data.code === 0) {
        this.treeData = data.data;
      }
    },
    async addPermission({ params, callback }) {
      const { data } = await postPermission({
        data: params
      });
      if (data && data.code === 0) {
        callback && callback();
        this.$message({
          message: '操作成功',
          type: 'success'
        });
        this.getPermission();
      }
    }
  }
};
</script>
<style>
.el-card__header {
  padding: 0 10px 0 0;
  text-align: right;
}
.custom-tree-node {
  line-height: 40px;
  height: 40px;
}
.el-tree-node__content:hover .custom-tree-option {
  margin-left: 10px;
  display: inline-block;
}
.custom-tree-option {
  display: none;
}
</style>
