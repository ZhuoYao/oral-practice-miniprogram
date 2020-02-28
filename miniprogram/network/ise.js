import {post, get} from './promise.js'
const Base64 = require('js-base64').Base64
const MD5 = require('js-md5')
// 获取当前时间戳
let ts = parseInt(new Date().getTime() / 1000)

export function getIse(text, path) {
  const config = {  // 系统配置
    hostUrl: "https://api.xfyun.cn/v1/service/v1/ise",
    appid: "5dc6603e",
    apiKey: "c948e8535303f8611d07ce35e283a1b7",
    file: path,    // 音频文件地址
    paper: text    // 评测文本
  }  
  function getXParamStr() {  // 组装业务参数
    let xParam = {
      "aue": "raw",      // 音频编码
      // "result_level": "simple",      // 结果级别
      "language": "en_us",      // 语种
      "category": "read_sentence"      // 评测种类
    }
    return Base64.encode(xParam)
  }
  function getReqHeader() {  // 组装请求头
    let xParamStr = getXParamStr()
    let xCheckSum = MD5(config.apiKey + ts + xParamStr).toString()
    return {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      'X-Appid': config.appid,
      'X-CurTime': ts + "",
      'X-Param': xParamStr,
      'X-CheckSum': xCheckSum
    }
  }
  function getPostBody() {  // 组装postBody
    let buffer = wx.getFileSystemManager().readFileSync(config.file)
    return {
      audio: buffer.toString('base64'),
      text: config.paper
    }
  }
  let options = {
    url: config.hostUrl,
    headers: getReqHeader(),
    form: getPostBody()
  }
  return post({
    url: options.url,
    data: options.form,
    headers: options.headers
  })
}
