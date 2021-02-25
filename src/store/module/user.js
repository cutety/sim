import storageService from '@/service/storageService'

const userModule = {
  namspaced:true,
  state: {
    token: storageService.get(storageService.USER_TOKEN),
    userInfo: JSON.parse(storageService.get(storageService.userInfo))
  },

  mutations: {
    SET_TOKEN(state, token) {
      storageService.set(storageService.USER_TOKEN, token)
      state.token = token
    },
    SET_USERINFO(state, userInfo) {
      storageService.set(storageService.USER_INFO, json.stringfy(userInfo))
      state.token = token
    }
  }
}

export default {
  userModule
}