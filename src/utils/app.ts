import HRequest from '@/api'
// @ts-ignore
//掌厅判断版本号是否大于等于7.5.6
function versionJudgment(version:any) {
  var stp = version.split('.')
  if (stp[0] > 7) {
    return true
  } else if (stp[0] == 7 && stp[1] > 5) {
    return true
  } else if (stp[0] == 7 && stp[1] == 5 && stp[2] > 5) {
    return true
  } else {
    return false
  }
}

// app单点登录 

export const appSSO = () => {
  const promise = new Promise((resolve, reject) => {
    var ua:any = navigator.userAgent.toLowerCase()
    if (ua.match(/cmccit/i) == 'cmccit') {
      //在手机营业厅的webview内
      console.log('在手机营业厅的webview内')
      // @ts-ignore
      cmcc.userStatus({
        success: function (res:any) {
          var status = res.status //本网登录状态：0未登录；1服务密码登录；2短信验证码登录
          if (status == 1 || status == 2) {
            //会话校验
            // @ts-ignore
            cmcc.checkSessionIsvalid({
              success: function (res1:any) {
                var status1 = res1.status //字符串类型，状态：0 校验失败；1 校验成功。
                if (status1 == 1) {
                  //获取客户端用户信息
                  // @ts-ignore
                  cmcc.getUserInfo({
                    success: function (res2:any) {
                      if (versionJudgment(res2.version)) {
                        //大网认证
                        // @ts-ignore
                        cmcc.getYDRZToken({
                          debug: false,
                          sourceId: '001319', //目标业务平台sourceId
                          success: function (res3:any) {
                            //是否有凭证
                            console.log('res3', res3)
                            if (!!res3.token) {
                              //调用移动认证token校验接口流程
                              console.log('之前缓存的token',localStorage.getItem('tk'));
                              localStorage.removeItem('tk')
                              console.log('删除的token',localStorage.getItem('tk'));
                              
                              console.log('res3.token','获取的token', res3.token)
                              console.log('总体数据', res3)
                              // logins(res3.token)
                              resolve(res3.token)
                              return res3.token
                            } else {
                              // //获取token中的UID
                              // var UID = res2.token.match(/UID=(\w+);/)[1];
                              // //走AppSSO.action接口流程
                              reject()
                            }
                          },
                          error: function (res:any) {
                            reject()
                          }
                        })
                      } else {
                        // //获取token中的UID
                        // var UID = res2.token.match(/UID=(\w+);/)[1];
                        // //走AppSSO.action接口流程
                        reject()
                      }
                    },
                    error: function (res2:any) {
                      reject()
                    }
                  })
                } else {
                  
                  console.log('会话失效，拉起登录!')
                  // @ts-ignore
                  cmcc.overTime() //会话失效，拉起登录
                }
              },
              error: function (res1:any) {
                reject()
              }
            })
          } else {
            // @ts-ignore
            cmcc.showLogin() //非登录状态拉起登录
          }
        },
        error: function (res:any) {
          console.log('获得用户状态失败！')
          reject()
        }
      })
    } else {
      //不在手机营业厅的webview内
      // console.log('不在手机营业厅的webview内')

      reject()
    }
  })
  return promise
}


// const logins = async (token:string) => {
//   console.log('拿到jsdk 的token',token);
  
//   const params = {
//     ssoToken:token,
//     tag: '1',
//     loginChn: '4'
//   }
//   const res = await HRequest.singleLogin(params)
//   console.log('jssdk储存token成功', res.data.token)
//   localStorage.setItem('tk', res.data.token)
//   console.log('新储存的token',localStorage.getItem('tk'));
//   // userDetail()
// }


// const userDetail = async () => {
 
//   const params = {
//     loginChn: '4'
//   }
//   const res = await HRequest.userDetail(params)
//   if (res.code == 200) {
//     // 用户信息储存
//     sessionStorage.setItem('user', JSON.stringify(res.data))
//     sessionStorage.setItem('userType', res.data.userType) // 储存用户状态是否有权限
// }}