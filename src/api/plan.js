import request from '@/utils/request'
import {pageParamHandle} from "@/utils/commonUtil";

export function plans(data) {
  return request({
    url: '/plan/list',
    method: 'post',
    data
  });
}

export function pagePlans(pageNum, pageCount, condition) {
  return request({
    url: `/plan/list/page`,
    method: 'post',
    data: pageParamHandle(pageNum, pageCount, condition)
  });
}

export function plan(id) {
  return request({
    url: '/plan/' + id,
    method: 'get'
  });
}

export function availablePlan() {
  return request({
    url: '/plan/available',
    method: 'get'
  });
}

export function save(data) {
  return request({
    url: '/plan/save',
    method: 'post',
    data
  });
}

export function modify(data) {
  return request({
    url: '/plan/modify',
    method: 'post',
    data
  });
}

export function modifyStatus(data) {
  return request({
    url: '/plan/status',
    method: 'post',
    data
  });
}

export function modifyOpen(data) {
  return request({
    url: '/plan/open',
    method: 'post',
    data
  });
}
