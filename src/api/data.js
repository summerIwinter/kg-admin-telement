import request from '@/utils/request'

export function getDataList() {
  return request({
    url: '/data/items',
    method: 'get'
  })
}

export function addDataItem(data) {
  return request({
    url: '/data/item',
    method: 'post',
    data
  })
}
