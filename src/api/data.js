import request from '@/utils/request'

export function getDataList() {
  return request({
    url: '/data/items',
    method: 'get'
  })
}
