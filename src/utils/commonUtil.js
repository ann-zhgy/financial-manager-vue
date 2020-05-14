export function pageParamHandle(pageNum, pageCount, condition) {
  if (!pageNum) {
    pageNum = 0
  }
  let params = {};
  params.pageNum = pageNum;
  if (pageCount) {
    params.pageCount = pageCount;
  }
  if (condition) {
    params.condition = condition;
  }
  return params;
}

export function dataURLtoFile(dataUrl, filename = String(new Date().getTime())) {
  let arr = dataUrl.split(',');
  let mime = arr[0].match(/:(.*?);/)[1];
  let suffix = mime.split('/')[1];
  let bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], `${filename}.${suffix}`, {type: mime})
}
