import request from '@/utils/request'

import storageService from '@/service/storageService'
const mentoredStudents = (params) => {
  return request.get('mentor/student/mentored', {
    params:params
  })
}

const instructRequest = (params) => {
  return request.get('/mentor/student/request', {
    params:params
  })
}

const updateMentorInfo = (params) => {
  return request.put('mentor/info', JSON.stringify(params))
}

const chooseStudent =(user_id) => {
  const mentor_user_id = JSON.parse(
    storageService.get(storageService.USER_INFO)
  ).user_id
  const params = {
    user_id: user_id,
    mentor_user_id:mentor_user_id
  }
  return request.get('mentor/bind/student', {
    params:params
  })
}
export default {
  mentoredStudents,
  updateMentorInfo,
  instructRequest,
  chooseStudent
}