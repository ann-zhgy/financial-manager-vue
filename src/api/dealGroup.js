import request from "@/utils/request";
import {pageParamHandle} from "@/utils/commonUtil";

export function save(data) {
  return request({
    url: '/deal/group/save',
    method: 'post',
    data
  });
}

export function groups() {
  return request({
    url: `/deal/group/list`,
    method: 'post',
  });
}

export function pageGroups(pageNum, pageCount, condition) {
  return request({
    url: `/deal/group/list/page`,
    method: 'post',
    data: pageParamHandle(pageNum, pageCount, condition)
  });
}

export function group(id) {
  return request({
    url: '/deal/group/' + id,
    method: 'get'
  });
}

export function modify(data) {
  return request({
    url: '/deal/group/modify',
    method: 'post',
    data
  });
}


export function modifyOpen(data) {
  return request({
    url: '/deal/group/open',
    method: 'post',
    data
  });
}
