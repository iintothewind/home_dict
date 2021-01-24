import * as fs from 'fs'
import { Map } from 'immutable'

const cfg = {
  http: {
    port: 7081,
  },
  https: {
    key: fs.readFileSync(process.env.SERVICE_PROVIDER === 'vultr' ? '/etc/cert/key.pem' : './etc/cert/key.pem'),
    cert: fs.readFileSync(process.env.SERVICE_PROVIDER === 'vultr' ? '/etc/cert/cert.pem' : './etc/cert/cert.pem'),
    port: 7443,
  },
  host: process.env.SERVICE_PROVIDER === 'vultr' ? 'ivarchen.xyz' : '192.168.0.147'
}

const exchMapping: Map<String, String> = Map({
  'p': '过去式',
  'd': '过去分词',
  'i': '现在分词',
  '3': '第三人称单数',
  'r': '比较级',
  't': '最高级',
  's': '复数',
  'f': '复数',
  '0': 'Lemma',
  '1': 'Lemma',
})


export { cfg, exchMapping }