import request from '@/utils/request'

const mentoredStudents = (params) => {
  return request.get('mentor/student/mentored', {
    params:params
  })
}

const updateMentorInfo = (params) => {
  return request.put('mentor/info', JSON.stringify(params))
}
export default {
  mentoredStudents,
  updateMentorInfo,
}