import Router from 'koa-router'
import { exchMapping } from '../util'
import { cfg } from '../util'
import { lookup } from '../util/db'
import { Translation } from '../model'

const mapExchange = (raw: string): string => raw ? raw.split('/').map(entry => `${exchMapping.get(entry.split(':')[0])} : ${entry.split(':')[1]}`).join('\n') : ''

const translate: Router.IMiddleware = async ctx => {
  const { user, word } = ctx.query as { user?: string, word?: string }
  if (user
    && user.trim().length > 0
    && user.length < cfg.dict.maxUserNameLength
    && word
    && word.trim().length > 0
    && word.length < cfg.dict.maxWordLength) {
    const entry = await lookup(user, word)
    if (entry) {
      const translation: Translation = {
        word: entry.word || '',
        phonetic: entry.phonetic || '',
        definition: entry.definition || '',
        translation: entry.translation || '',
        exchange: mapExchange(entry.exchange)
      }
      ctx.body = translation
    } else {
      ctx.status = 404
      ctx.body = { error: 'requested word not found' }
    }
  } else {
    ctx.status = 400
    ctx.body = { error: 'request parameters: valid user and word are required' }
  }
}

export { translate }
