import Router from 'koa-router'
import { exchMapping } from '../util'
import { lookup } from '../util/db'
import { Translation } from '../model'

const mapExchange = (raw: string): string => raw.split('/').map(entry => `${exchMapping.get(entry.split(':')[0])} : ${entry.split(':')[1]}`).join('\n')

const translate: Router.IMiddleware = async ctx => {
  const { user, word } = ctx.query as { user?: string, word?: string }
  if (user && word) {
    const entry = await lookup(user, word)
    if (entry) {
      const translation: Translation = {
        word: entry.word,
        phonetic: entry.phonetic,
        definition: entry.definition,
        translation: entry.translation,
        exchange: mapExchange(entry.exchange)
      }
      ctx.body = translation
    } else {
      ctx.status = 404
      ctx.body = { error: 'requested word not found' }
    }
  } else {
    ctx.status = 400
    ctx.body = { error: 'request parameters: user and word are required' }
  }
}

export { translate }
