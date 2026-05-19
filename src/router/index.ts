import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"

import Home from "@/views/Home.vue";
import Guide from "@/views/Guide.vue"
import { KeepAlive } from "vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/g",
    component: Guide,
  },
  // {
  //   path: '/appLogin',
  //   name: 'appLogin',
  //   component: () => import('@/views/login/appLogin.vue')
  // },
  // {
  //   path: '/idolTelephone',
  //   name: 'idolTelephone',
  //   component: () => import('@/views/page/idolTelephone.vue'),
  //   meta: {
  //     activeNum: 0,
  //     isShow: true
  //   },
  // },
  {
    path: '/starDetails',
    name: 'starDetails',
    component: () => import('@/views/page/starDetails.vue'),
    meta: {
      activeNum: 1,
      isShow: true
    },
  },
  {
    path: '/sceneDiscipline',
    name: 'sceneDiscipline',
    component: () => import('@/views/page/sceneDiscipline.vue'),
    meta: {
      activeNum: 2,
      isShow: true
    }
  },
  {
    path: '/remindScene',
    name: 'remindScene',
    component: () => import('@/views/page/remindScene.vue'),
    meta: {
      activeNum: 3,
      isShow: true,
      // keepAlive: true // 缓存该页面
    }
    
  },
  // 自定义场景页
    {
    path: '/customize',
    name: 'customize',
    component: () => import('@/views/page/customize.vue'),
    meta: {
      activeNum: 4,
      isShow: true,
      keepAlive: true // 缓存该页面

    }
    
  },
    //生成视频页
    {
    path: '/generateVideo',
    name: 'generateVideo',
    component: () => import('@/views/page/generateVideo.vue'),
    meta: {
      activeNum: 5,
      isShow: true
    }
    
  },
      //亲友号吗录
    {
    path: '/friendsRecord',
    name: 'friendsRecord',
    component: () => import('@/views/page/friendsRecord.vue'),
    meta: {
      activeNum: 6,
      isShow: true
    }
    
  },
   {
    path: '/mxyhxy',
    name: 'mxyhxy',
    component: () => import('@/views/page/mxyhxy.vue'),
    meta: {
      activeNum: 7,
      isShow: true
    }
    
  },
    {
    path: '/mxyszc',
    name: 'mxyszc',
    component: () => import('@/views/page/mxyszc.vue'),
    meta: {
      activeNum: 8,
      isShow: true
    }
    
  },
      {
    path: '/summary',
    name: 'summary',
    component: () => import('@/views/page/summary.vue'),
    meta: {
      activeNum: 9,
      isShow: true
    }
    
  },
        {
    path: '/renew',
    name: 'renew',
    component: () => import('@/views/page/renew.vue'),
    meta: {
      activeNum: 10,
      isShow: true
    }
    
  },
    {
    path: '/about',
    name: 'about',
    component: () => import('@/views/page/about.vue'),
    meta: {
      activeNum: 11,
      isShow: true
    }
    
  },
   {
      path: '/diyFgure',
      name: 'diyFgure',
      component: () => import('@/views/page/diyFgure.vue'),
      meta: {
        activeNum: 12,
        isShow: true
      }
    },
  {
    path: '/common',
    name: 'common',
    component: () => import('@/views/page/common.vue'),
    meta: {
      activeNum: 13,
      isShow: true
    }
    
  },
  

  // 我的爱豆
  {
    path: '/myidol',
    name: 'myidol',
    component: () => import('@/views/page/myidol.vue'),
    meta: {
      activeNum: 4,
      isShow: true
    }
  },
    // 更多爱豆
    {
      path: '/moreidol',
      name: 'moreidol',
      component: () => import('@/views/page/moreidol.vue'),
      meta: {
        activeNum: 4,
        isShow: true
      }
    },
    // 爱豆组合包
    {
      path: '/idolcombination',
      name: 'idolcombination',
      component: () => import('@/views/page/idolcombination.vue'),
      meta: {
        activeNum: 4,
        isShow: true
      }
    },
    {
      path: '/videoPlay',
      name: 'videoPlay',
      component: () => import('@/views/page/videoPlay.vue'),
      meta: {
        activeNum: 4,
        isShow: true
      }
    },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
router.beforeEach((to, from, next) => {
  // 将来源路由信息存储到 meta 中
  to.meta.from = from.fullPath
  next()
})

export default router