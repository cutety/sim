import request from '@/utils/request'
import storageService from '@/service/storageService'
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

const updateApplyInfo = (params) => {
  return request.post('student/application', JSON.stringify(params))
}

const getMentorList = (params) => {
  return request.get('user/match/mentor', {
    params:params
  })
}

const bindMentor =(mentor_user_id) => {
  const user_id = JSON.parse(
    storageService.get(storageService.USER_INFO)
  ).user_id
  const params = {
    user_id: user_id,
    mentor_user_id:mentor_user_id
  }
  return request.get('user/bind/mentor', {
    params:params
  })
}

const getMentorInfo = (user_id) => {
  const params = {
    user_id: user_id
  }
  return request.get('mentor/info', {
    params:params
  })
}

export default {
  login,
  info,
  getApplyInfo,
  updateApplyInfo,
  getMentorList,
  bindMentor,
  getMentorInfo
}