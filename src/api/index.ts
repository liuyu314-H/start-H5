import { getURIParam } from '@/utils/index.js'
import http from './http'
import { getBrowerId } from '@/utils'

const HRequest: any = {
  // 供应商爱豆展示
  getAdPage: () => {
    return http({
      url: `/starcall/page/getGrayMode`,
      method: 'get'
    })
  },
  //获取短信验证码
  // getSmsCodeApi: (params: { phone: string | number | null; actId: string }) => {
  //   return http({
  //     url: "/active/authbase/sendSmsWithOutCodejm",
  //     method: "get",
  //     params,
  //   });
  // },

  //获取活动配置
  actSettingApi: (actId: any) => {
    return http({
      url: `/active/authbase/verifyAct?actId=${actId}`,
      method: 'get'
    })
  },
  //订购
  // getGdorder: (code: string, ordertype: string, enginetype: string, chn: string) => {
  //   return http({
  //     url: `/active/gdztvms/gdorder?code=${code}&ordertype=${ordertype}&enginetype=${enginetype}&channel=${chn}`,
  //     method: "get",
  //   });
  // },
  //打印大数据
  setBigData: async (params: { buttonName: string }) => {
    window._hmt.push(['_trackEvent', '广西视频秘书', params.buttonName])
    let url = `/active/kafka/printlog?ts=${new Date().getTime()}`
    let data = {
      ...params,
      actId: 'gxztvd',
      chn: getURIParam('chn') == null ? '4024' : getURIParam('chn'),
      actName: '广西视频秘书',
      url: window.location.href,
      fingerprint: localStorage.getItem('browserId') || (await getBrowerId())
    }
    let config: any = {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    }
    fetch(url, config)
      .then(res => {
        return res.json()
      })
      .catch(err => {
        console.log(err)
      })
  },
  //获取短信验证码
  // getSmsCodeApi: (params: {
  //     phone: string | number | null
  //     actId: string
  // }) => {
  //     return http({
  //         url: '/active/authbase/sendSmsWithOutCodejm',
  //         method: 'get',
  //         params
  //     })
  // },

  getSmsCodeApi: (params: { phone: string | number | null }) => {
    return http({
      url: '/starcall/h5/login/sendSms',
      method: 'post',
      params
    })
  },
  //短信验证码登录
  loginBySmsApi: (params: { phone: string; code: string; loginChn: string; tag: string; version: string }) => {
    return http({
      url: '/starcall/h5/login/verifySms',
      method: 'get',
      params
    })
  },
  //短信验证码登录
  // loginBySmsApi: (params: {
  //   phone: string
  //   code: string
  //   actId: string
  //   channel: string
  // }) => {
  //   return http({
  //       url: '/active/authbase/verifySmsCode',
  //       method: 'get',
  //       params
  //   })
  // },
  // 唤起sim认证
  simLogin: (params: { phone: string }) => {
    return http({
      url: '/starcall/h5/login/simLogin',
      method: 'post',
      params
    })
  },
  // sim认证结果
  simConfirm: (params: { phone: string; version: string }) => {
    return http({
      url: '/starcall/h5/login/simConfirm',
      method: 'post',
      params
    })
  },

  //获取用户信息
  userDetail: (params: { loginChn: string }) => {
    return http({
      url: '/starcall/user/userDetail',
      method: 'get',
      params
    })
  },
    //是否新订购用户
  isNewOrder: () => {
    return http({
      url: '/starcall/user/isNewOrder',
      method: 'get',
    })
  },
  // 获取用户的爱豆列表
  getIdolList: (state: Number, type: Number) => {
    return http({
      url: `/starcall/star/getStarList?state=${state}&type=${type}`,
      method: 'get'
    })
  },
  // 根据亲友自己获取爱豆配置列表
  // getStateIdolList: (state:Number,type:number) => {
  //   return http({
  //       url: `/outcall/user/getStateIdolList?state=${state}&type=${type}`,
  //       method: 'get',

  //   })
  // },
  //查询是否定购
  isOrder: (idolId: String) => {
    return http({
      url: `/outcall/order/isOrder?idolId=${idolId}`,
      method: 'get'
    })
  },
  // 列表展示
  listIdol: (pageIndex: number, pageSize: number, type: number, isLogin: number) => {
    return http({
      url: `/outcall/showBar/listIdol?pageIndex=${pageIndex}&pageSize=${pageSize}&type=${type}&isLogin=${isLogin}`,
      method: 'get'
    })
  },
  // 供应商爱豆展示
  oneClicklistIdol: (isLogin: number, size: number, type: number) => {
    return http({
      url: `/outcall/showBar/oneClicklistIdol?isLogin=${isLogin}&size=${size}&type=${2}`,
      method: 'get'
    })
  },
  // 组合包展示0未登录1已登录    1，2，3，4，对应白银黄金铂金钻石
  listComboPack: (isLogin: number) => {
    return http({
      url: `/outcall/showBar/listComboPack?isLogin=${isLogin}`,
      method: 'get'
    })
  },

  //设置页面渲染
  getscenceList: (pageIndex: string, pageSize: string, type: string) => {
    return http({
      url: `/starcall/sceneConfig/getSceneList?pageIndex=${pageIndex}&pageSize=${pageSize}&type=${type}`,
      method: 'get'
    })
  },
  getMute: (type: string) => {
    return http({
      url: `/starcall//sceneConfig/mute?type=${type}`,
      method: 'get'
    })
  },
  //查询亲友手机号
  getFriphone: (sceneConfigId: string) => {
    return http({
      url: `/starcall/sceneConfig/getFriPhone?sceneConfigId=${sceneConfigId}`,
      method: 'get'
    })
  },
  //ido列表展示
  getIdolByIdolId: (starId: string) => {
    return http({
      url: `/starcall/star/getStarById?starId=${starId}`,
      method: 'get'
    })
  },
  //ido列表展示
  checkIdol: () => {
    return http({
      url: `/outcall/user/checkIdol`,
      method: 'post'
    })
  },
  //ido列表展示
  isExperienceUser: () => {
    return http({
      url: `/outcall/user/isExperienceUser`,
      method: 'get'
    })
  },
  //获取用户状态
  //   GetUserState() {
  //     return http({
  //       url: '/active/gxvms/GetUserState',
  //       method: 'get'
  //     })
  //   },

  getAppId: () => {
    return http({
      url: '/starcall/h5/login/getAppId',
      method: 'GET'
    })
  },
  // gdchksid: () => {
  //     return http({
  //         url: '/active/gdvms/gdchksid',
  //         method: 'GET'
  //     })
  // },
  getSign: (params: { preSign: string }) => {
    return http({
      url: '/starcall/h5/login/getSign',
      method: 'get',
      params
    })
  },
  //获取手机号，未登录
  getPhoneBy4G: (params: {
    token: string
    userInformation: string
    tag: '2'
    loginChn: '4'
    // actId: string
  }) => {
    return http({
      url: '/starcall/h5/login/getUserInfo',
      method: 'post',
      params
    })
  },
  getVersion: () => {
    return http({
      url: '/starcall/h5/login/getVersion',
      method: 'get'
    })
  },
  //获取手机号，未登录
  singleLogin: (params: {
    // ssoToken: string
    ssoToken:string
    tag: string
    loginChn: string
    // appId: string
    version: string
    // actId: string
  }) => {
    return http({
      // url: '/outcall/h5/login/singleLogin',
      url: "/starcall/h5/login/ssoLogin",
      method: 'post',
      params
    })
  },
  //一键登录确认
  confirmAuthLogin: (params: { channel: string; actId: string; encrypt: string; loginChn: string; tag: string; version: string }) => {
    return http({
      url: '/starcall/h5/login/quickLogin',
      method: 'post',
      params
    })
  },
  // 保存设置
  addCalled: (params: Object) => {
    return http({
      url: '/outcall/idolCalledRet/addCalled',
      method: 'post',
      data: params
    })
  },
  // 切换音视频
  changeType: (params: Object) => {
    return http({
      url: '/outcall/user/changeType',
      method: 'post',
      data: params
    })
  },
  // 定购
  csdg: (params: Object) => {
    return http({
      url: '/outcall/order/csdg',
      method: 'post',
      data: params
    })
  },
  // 删除手机号
  delCalled: (params: Object) => {
    return http({
      url: '/outcall/idolCalledRet/delCalled',
      method: 'post',
      data: params
    })
  },
  // 删除
  deleteScene: (params: { sceneConfigId: number }) => {
    return http({
      url: `/starcall/sceneConfig/deleteScene?sceneConfigId=${params.sceneConfigId}`,
      method: 'post',
      data: params
    })
  },
  // 保存设置
  setScene: (params: Object) => {
    return http({
      url: '/starcall/sceneConfig/setScene',
      method: 'post',
      data: params
    })
  },
    //一键来电
  oneClickSet: (params: Object) => {
    return http({
      url: '/starcall/sceneConfig/oneClickSet',
      method: 'post',
      data: params
    })
  },
  // 编辑设置
  updateScene: (params: Object) => {
    return http({
      url: '/starcall/sceneConfig/updateScene',
      method: 'post',
      data: params
    })
  },
  //获取形象
  onLineStore: () => {
    return http({
      url: '/active/gdvideoexp/onlineStores',
      method: 'get'
    })
  },
  // 获取跳转token
  getNavToken() {
    return http({
      url: '/active/gxvms/getcmpptokenUn',
      method: 'get'
    })
  },
  // 定购组合包
  csdgComboPack: (params: Object) => {
    return http({
      url: '/outcall/order/csdgComboPack',
      method: 'post',
      data: params
    })
  },
  play: (url: string, type: string) => {
    return http({
      url: `/starcall/star/showBar/play?url=${url}&type=${type}`,
      method: 'GET',
      responseType: 'blob'
    })
  },
  // 获取亲友模块开启状态
  getFriModule: () => {
    return http({
      url: `/starcall/page/getOpenFriMode`,
      method: 'get'
    })
  },
  // 获取跳转token
  isMobile(params: string) {
    return http({
      url: '/starcall/sceneConfig/isMobile',
      method: 'get',
      params
    })
  },
  //为亲友时间限制
  getCallTime: (params: { type: number }) => {
    return http({
      url: `/starcall/sceneConfig/getCallTime`,
      method: 'get',
      params
    })
  },

  //
  getSelectedIdol: () => {
    return http({
      url: `/starcall/star/getSelectedStar`,
      method: 'get'
    })
  },
  selectIdol: (params: Object) => {
    return http({
      url: '/starcall/star/selectStar',
      method: 'post',
      data: params
    })
  },
  //查询组合包爱豆列表
  getIdolListCom: () => {
    return http({
      url: `/outcall/unify/getIdolListCom?type=2`,
      method: 'get'
    })
  },
  // 获取跳转token
  getIdolListComDetail(params: Object) {
    return http({
      url: '/outcall/unify/getIdolListComDetail',
      method: 'post',
     data: params
    })
  },
    //查询组合包爱豆列表
    setSurveyOrder: (isOrder:number) => {
      return http({
        url: `/outcall/unify/setSurveyOrder?isOrder=${isOrder}`,
        method: 'get'
      })
    },
     //查询组合包爱豆列表
     getSceneUrl: (params: { ringId: number }) => {
      return http({
        url: `/starcall/star/getSceneUrl`,
        method: 'get',
        params
      })
    },
      //获取用户Diy
  getDiyScene: (params: Object) => {
    return http({
      url: '/starcall/diyStarScene/getDiyScene',
      method: 'post',
      params: params
      
    })
  },
    // diy视频删除
    deleteDiyScene(params: Object) {
      return http({
        url: '/starcall/diyStarScene/deleteDiyScene',
        method: 'DELETE',
        params: params
      })
    },
     // diy视频编辑场景名称
    renameDiyScene(params: Object) {
      return http({
        url: '/starcall/diyStarScene/renameDiyScene',
        method: 'post',
        params: params
      })
    },
    // 帮你写文案diy生成
    generateText(params: Object) {
      return http({
        url: '/starcall/diyStarScene/generateText',
        method: 'post',
        params: params
      })
    },
    // 文案生成换一换
    regenerateText(params: Object) {
      return http({
        url: '/starcall/diyStarScene/regenerateText',
        method: 'post',
        params: params
      })
    },
    // 编辑文案
    editText(params: Object) {
      return http({
        url: '/starcall/diyStarScene/editText',
        method: 'post',
        params: params
      })
    },
     // 文案敏感词审核
    checkText(params: Object) {
      return http({
        url: '/starcall/diyStarScene/checkText',
        method: 'post',
        params: params
      })
    },
    // diy视频生成
    createVideo(params: Object) {
      return http({
        url: '/starcall/diyStarScene/createVideo',
        method: 'post',
        data: params
      })
    },
    // 视频生成成功后确定保存
    saveDiyScene(params: Object) {
      return http({
        url: '/starcall/diyStarScene/saveDiyScene',
        method: 'post',
        data: params
      })
    },

    

     getSub: () => {
      return http({
        url: `/starcall/order/getSub`,
        method: 'get',
    
      })
    },
    h5Unsub: (params: any) => {
    return http({
      url: '/starcall/order/h5Unsub',
      method: 'post',
      data: params
    })
  },

    getAllFriPhone: (params: any) => {
    return http({
      url: '/starcall/phoneBook/getAllFriPhone',
      method: 'post',
      data: params
    })
  },
  addFriPhone: (params: any) => {
    return http({
      url: '/starcall/phoneBook/addFriPhone',
      method: 'post',
      data: params
    })
  },
  delFriPhone: (params: any) => {
    return http({
      url: '/starcall/phoneBook/delFriPhone',
      method: 'delete',
      data: params
    })
  },
  // 单点登录获取临时token接口
getSsoTempToken: (params: { phone: string; usessionId: string }) => {
    return http({
      url: "/starcall/h5/login/getSsoTempToken",
      method: "post",
      params
    });
  },
  // 退出
  getLogout: (params: { phone: string; loginChn: string }) => {
    return http({
      url: "/starcall/h5/logout",
      method: "post",
      params
    });
  },
  getDiyTemplate: (params: any) => {
    return http({
      url: '/starcall/diyStarScene/getDiyTemplate',
      method: 'post',
      params: params
    })
  },
  // 上传图片
  uploadImage: (params: any) => {
    return http({
      url: '/starcall/starFrameUser/uploadImage',
      method: 'post',
      data: params
    })
  },
  // 获取同框模板
  getStarFrameTemplate: (params: any) => {
    return http({
      url: '/starcall/starFrameUser/getStarFrameTemplate',
      method: 'post',
      data: params
    })
  },
  // 获取用户明星合影形象数据
  getStarFrameList: () => {
    return http({
      url: '/starcall/starFrameUser/getStarFrameList',
      method: 'post',
    })
  },
    // 设置合影形象名称
  editImageName: (params: any) => {
    return http({
      url: '/starcall/starFrameUser/editImageName',
      method: 'post',
      params: params
    })
  },
  // 明星合影确认创建形象
    createStarFrame: (params: any) => {
    return http({
      url: '/starcall/starFrameUser/createStarFrame',
      method: 'post',
      data: params
    })
  },
    // 明星合影图片合成
    createImage: (params: any) => {
    return http({
      url: '/starcall/starFrameUser/createImage',
      method: 'post',
      data: params
    })
  },
  // 查询用户当日使用合成功能次数详情
  getComposeCount: () => {
    return http({
      url: '/starcall/starFrameUser/getComposeCount',
      method: 'get',
    })
  },
    // 删除用户明星合影形象
  delStarFrame: (params: any) => {
    return http({
      url: '/starcall/starFrameUser/delStarFrame',
      method: 'DELETE',
      params: params
    })
  },
}

export default HRequest
