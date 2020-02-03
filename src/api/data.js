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

export function delDataItem(data) {
  return request({
    url: '/data/item',
    method: 'delete',
    data
  })
}

export function getDataItem(data) {
  return request.get('/data/item', { params: data })
  // return request({
  //   url: '/data/item',
  //   method: 'get',
  //   params: data
  // })
}
