/**
 *
 * @returns 是否是移动端
 */
export function _isMobile() {
  let flag = navigator.userAgent.match(
    /(phone|pad|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows phone)/i
  )
  return flag
}
