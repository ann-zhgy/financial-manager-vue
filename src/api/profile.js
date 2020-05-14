import request from '@/utils/request'

export function profile() {
  return request({
    url: '/profile',
    method: 'get',
  })
}

export function update(data) {
  return request({
    url: '/profile/modify',
    method: 'post',
    data
  })
}

export function password(data) {
  return request({
    url: '/profile/password',
    method: 'post',
    data
  })
}

export function avatar(data) {
  return request({
    url: '/profile/icon',
    method: 'post',
    data
  })
}

