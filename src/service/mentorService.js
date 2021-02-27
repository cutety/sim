import request from '@/utils/request'

const mentoredStudents = (params) => {
  return request.get('mentor/student/mentored', {
    params:params
  })
}

const getStudentInfo = (user_id) => {
  return request.get('')
}
export default {
  mentoredStudents,
}