import request from '@/utils/request'

const addMentor = (params) => {
  return request.post('mentor', JSON.stringify(params))
}

export default {
  addMentor,
}