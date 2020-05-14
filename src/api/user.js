import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function userInfo() {
  return request({
    url: '/user/info',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post',
  })
}

export function checkUsername(username) {
  return request({
    url: '/check/username',
    method: 'post',
    data: {
      username
    }
  })
}

export function checkEmail(email) {
  return request({
    url: '/check/email',
    method: 'post',
    data: {
      email
    }
  })
}

export function register(data) {
  return request({
    url: '/register',
    method: 'post',
    data
  })
}
