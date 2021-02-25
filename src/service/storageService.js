// 本地缓存

const PREFIX = 'sim_'

// user

const USER_PREFIX = `${PREFIX}user_`
const USER_TOKEN = `${USER_PREFIX}token`
const USER_INFO = `${USER_PREFIX}info`

// 储存
const set = (key, data) => {
  localStorage.setItem(key, data)
}

// 读取
const get = (key) => localStorage.getItem(key)

// 清除
const clear = (key) => localStorage.clear(key)

export default {
  set,
  get,
  clear,
  USER_TOKEN,
  USER_INFO,
}