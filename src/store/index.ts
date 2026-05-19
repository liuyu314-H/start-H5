import { defineStore } from 'pinia'

export const gdXmsStore = defineStore('gdxms', {
  state: () => ({
    actId: '',
    channel: '',
    ydrzRes: {},
    encryptedPhone: '',
    phon: '',
    type: '',
    show:false,
    phonshow:false
  }),
  getters: {
    getActId: (state) => {
      return state.actId   
    },
    getPhon: (state) => {
      return state.phon
    },
    getType: (state) => {
      return state.type
    },
    getShow: (state) => {
      return state.show
    },
    getPhonshow: (state) => {
      return state.phonshow
    },
    getChannel: (state) => {
      return state.channel
    },
    getYDRZres: (state) => {
      return state.ydrzRes
    },
    getUserPhone: (state) => {
      // if (!state.encryptedPhone) {
      //   return 'UNKNOW'
      // } else {
      //   // const phone: string = AESDecrypt(state.encryptedPhone)
      //   // return `${phone[0]}${phone[1]}${phone[2]}*****${phone[8]}${phone[9]}${phone[10]}`
        return state.encryptedPhone
      // }
    }
  },
  actions: {
    setActId(actId: string) {
      this.actId = actId;
    },
    setChannel(chn: string) {
      this.channel = chn
    },
    setYDRZres(res: object) {
      this.ydrzRes = res
    },
    setEncryptedPhone(phone: string) {
      this.encryptedPhone = phone
    },
    setPhon(phon: string) {
      this.phon = phon
    },
    setType(type: string) {
      this.type = type
    },
     setShow(show: boolean) {
      this.show = show
    },
    setPhonshow(show: boolean) {
      this.phonshow = show
    }
  },
})