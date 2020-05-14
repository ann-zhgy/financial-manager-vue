import {login, logout, userInfo} from '@/api/user'
import {getToken, setToken, removeToken} from '@/utils/cookie-utils'
import {resetRouter} from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    identity: {},
  }
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_IDENTITY: (state, identity) => {
    state.identity = identity;
  },
};

const actions = {
  // 用户登录
  login({commit}, userInfo) {
    const {username, password} = userInfo;
    return new Promise((resolve, reject) => {
      login({username: username.trim(), password: password})
        .then(response => {
          const {data} = response;
          commit('SET_TOKEN', data.token);
          setToken(data.token);
          resolve();
        }).catch(error => {
        reject(error);
      })
    })
  },

  // 获取用户信息
  getInfo({commit, state}) {
    return new Promise((resolve, reject) => {
      userInfo(state.token).then(response => {
        const {data} = response;
        if (!data) {
          reject('验证失败，请重新登录');
        }
        const {name, avatar, identity} = data;

        commit('SET_NAME', name);
        commit('SET_AVATAR', avatar);
        commit('SET_IDENTITY', identity);
        resolve(data);
      }).catch(error => {
        reject(error);
      })
    })
  },

  // 用户注销
  logout({commit, state}) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken(); // 删除token
        resetRouter();
        commit('RESET_STATE');
        resolve()
      }).catch(error => {
        reject(error);
      })
    })
  },

  // 删除token
  resetToken({commit}) {
    return new Promise(resolve => {
      removeToken();
      commit('RESET_STATE');
      resolve();
    })
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

