/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare interface Window {
  YDRZ: any,
  wx: any,
  _hmt: any,
  gdp: any
}

declare module 'crypto-js'

declare type logintype = {
  canAuth: Boolean,
  phone: string | number
}

declare module 'fingerprintjs2'