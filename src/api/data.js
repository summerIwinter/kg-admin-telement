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
  return request({
    url: '/data/item',
    method: 'get',
    params: data
  })
}

export function delDataItemRow(data) {
  return request({
    url: '/data/item/row',
    method: 'delete',
    data
  })
}

export function updateDataItemRow(data) {
  return request({
    url: '/data/item/row',
    method: 'put',
    data
  })
}