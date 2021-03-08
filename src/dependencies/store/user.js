import { getUser, putUpdateUser } from 'src/dependencies/api/user';
import { Message } from 'element-ui';
const state = () => {
  return {
    user: {
      user_name: '',
      avatar: '//cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
    }
  };
};

const mutations = {
  changeUser(state, user) {
    state.user = {
      ...state.user,
      ...user
    };
  }
};

const actions = {
  async getUser({ commit }) {
    const { data } = await getUser();
    if (data && data.code === 0) {
      commit('changeUser', data.data);
      return Promise.resolve(data.data);
    }
  },
  async setUser({ commit }, { params, callback }) {
    const { data } = await putUpdateUser({
      data: params
    });
    if (data && data.code === 0) {
      Message({
        message: '修改成功',
        type: 'success'
      });
      commit('changeUser', params);
      callback && callback();
    }
  }
};

export default {
  state,
  mutations,
  actions
};
