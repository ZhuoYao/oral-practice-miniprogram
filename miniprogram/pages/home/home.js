// pages/home/home.js
import { getIse } from '../../network/ise.js'
import { post, get} from '../../network/promise.js'
const Recorder = wx.getRecorderManager()
const InnerAudioContext  = wx.createInnerAudioContext()
Page({
  data: {

  },
  start() {
    console.log('开始录音')
    Recorder.start({
      format: "wav"
    })
  },
  end() {
    Recorder.stop()
    console.log('结束录音')
  },
  play() {
    InnerAudioContext.play()
  }
})

InnerAudioContext.onPlay(() => {
  console.log('开始播放')
})
InnerAudioContext.onError((res) => {
  console.log(res.errMsg)
  console.log(res.errCode)
})

Recorder.onStop(res => {
  console.log('监听结束录音')
  InnerAudioContext.src = res.tempFilePath

  getIse('I am the king of the world', res.tempFilePath)
  .then(res => console.log(res))

  // wx.uploadFile({
  //   url: "http://192.168.0.109:3000/upload",
  //   method: "post",
  //   filePath: res.tempFilePath,
  //   name: "wx",
  //   formData: {
  //     text: 'I am the king of the world'
  //   },
  //   success(ret) {
  //     const options = JSON.parse(ret.data)

  //     post({
  //       url: options.url,
  //       data: options.data,
  //       header: options.headers
  //     }).then(res => {
  //       console.log(res)
  //     })

  //     // wx.request({
  //     //   url: options.url,
  //     //   method: 'POST',
  //     //   data: options.data,
  //     //   header: options.headers,
  //     //   success: (res) => {
  //     //     console.log(res)
  //     //   },
  //     //   fail: (error) => {
  //     //     console.log(error)
  //     //   },
  //     // })

  //   },
  //   fail(err) {
  //     console.log("录音发送到后台失败");
  //     console.log(err);
  //   }
  // })
})