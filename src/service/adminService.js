import request from '@/utils/request'

const addMentor = (params) => {
  return request.post('mentor', JSON.stringify(params))
}

const getMentors = (params) => {
  return request.get("admin/list/mentor", {
    params:params
  })
}

export default {
  addMentor,
  getMentors,
}