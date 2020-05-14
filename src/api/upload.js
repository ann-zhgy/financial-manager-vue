import request from '@/utils/request'

export function del(data) {
  return request({
    url: '/fast/dfs/delete',
    method: 'post',
    data
  })
}

export function upload(data) {
  return request({
    url: '/fast/dfs/upload',
    method: 'post',
    data,
  })
}
