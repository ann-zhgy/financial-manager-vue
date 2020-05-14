import request from "@/utils/request";

export function family(username) {
  return request({
    url: '/family' + (username ? `/${username}` : ''),
    method: 'get',
  });
}

export function members() {
  return request({
    url: '/family/members',
    method: 'get',
  });
}

export function deals(pageNum) {
  return request({
    url: `/deal/family/${pageNum}`,
    method: 'get',
  });
}

export function plans(pageNum) {
  return request({
    url: `/plan/family/${pageNum}`,
    method: 'get',
  });
}

export function save(data) {
  return request({
    url: '/family/save',
    method: 'post',
    data
  });
}

export function update(data) {
  return request({
    url: '/family/modify',
    method: 'post',
    data
  });
}

export function join(familyId) {
  return request({
    url: '/family/join',
    method: 'post',
    data: familyId
  });
}

export function exit(userId) {
  return request({
    url: '/family/exit' + (userId ? `/${userId}` : ''),
    method: 'post',
  });
}

export function del() {
  return request({
    url: '/family/delete',
    method: 'post',
  });
}

export function admin(userId) {
  return request({
    url: `/family/admin/${userId}`,
    method: 'post',
  });
}
