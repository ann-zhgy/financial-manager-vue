import request from "@/utils/request";
import {pageParamHandle} from "@/utils/commonUtil";

export function deal(id) {
  return request({
    url: '/deal/' + id,
    method: 'get',
  });
}

export function dealData(params) {
  return request({
    url: '/deal/data',
    method: 'get',
    params
  });
}

export function familyDealData(params) {
  return request({
    url: '/deal/family/data',
    method: 'get',
    params
  });
}

export function save(data) {
  return request({
    url: '/deal/save',
    method: 'post',
    data
  });
}

export function pageDeals(pageNum, pageCount, condition) {
  return request({
    url: `/deal/list/page`,
    method: 'post',
    data: pageParamHandle(pageNum, pageCount, condition)
  });
}

export function deals(data) {
  return request({
    url: `/deal/list`,
    method: 'post',
    data
  });
}

export function dealsByGroup(groupId) {
  return request({
    url: `/deal/list/group/${groupId}`,
    method: 'get',
  });
}

export function modify(data) {
  return request({
    url: '/deal/modify',
    method: 'post',
    data
  });
}

export function modifyOpen(data) {
  return request({
    url: '/deal/open',
    method: 'post',
    data
  });
}
