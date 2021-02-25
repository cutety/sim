import request from '@/utils/request'

const login = ({user_id, password}) => {
  return request.post('user/login', {user_id, password})
}

const info = () => {
  return request.get('info/me')
}

const getApplyInfo = (params) => {
  return request.get('user/apply/info', {            
    params:params
  })
}

export default {
  login,
  info,
  getApplyInfo
}