// 用户名不能为空
// 密码不能为空
// 用户名长 3~20
// 用户名智能包含字母, 数字, 下划线
export function validateUsername(username: string): boolean {
  return /^[a-zA-Z0-9_]{3,20}$/.test(username)
}

export function validatePassword(password: string): boolean {
  return password.length >= 6 && password.length <= 20
}

export function validatePasswordSame(passwordA: string, passwordB: string): boolean {
  return passwordA === passwordB
}