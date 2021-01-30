import Router from 'koa-router'
import { exchMapping } from '../util'
import { cfg } from '../util'
import * as db from '../util/db'
import * as model from '../model'
import * as entity from 'src/entity'
import { Db } from 'typeorm'

const mapExchange = (raw: string): string => raw ? raw.split('/').map(entry => `${exchMapping.get(entry.split(':')[0])} : ${entry.split(':')[1]}`).join('\n') : ''

const mapWord = (entry: entity.Word): model.Word => {
  return {
    word: entry.word || '',
    phonetic: entry.phonetic || '',
    definition: entry.definition || '',
    translation: entry.translation || '',
    exchange: mapExchange(entry.exchange)
  } as model.Word
}

const lookup: Router.IMiddleware = async ctx => {
  const { user, word } = ctx.query as { user?: string, word?: string }
  if (user
    && user.trim().length > 0
    && user.length < cfg.dict.maxUserNameLength
    && word
    && word.trim().length > 0
    && word.length < cfg.dict.maxWordLength) {
    await db
      .lookup(user, word)
      .then((entry: entity.Word) => {
        if (entry) {
          ctx.body = mapWord(entry)
        } else {
          ctx.status = 404
          ctx.body = { error: `requested word: ${word} not found` }
        }
      })
  } else {
    ctx.status = 400
    ctx.body = { error: 'request parameters: valid user and word are required' }
  }
}

const fuzzySearch: Router.IMiddleware = async ctx => {
  const { word } = ctx.query as { word?: string }
  if (word
    && word.trim().length > 0
    && word.length < cfg.dict.maxWordLength) {
    await db
      .fuzzySearch(word)
      .then(words => {
        if (words && words.length > 0) {
          ctx.body = { words: words.map(w => mapWord(w)) }
        } else {
          ctx.status = 404
          ctx.body = { error: 'requested word not found' }
        }
      })
  } else {
    ctx.status = 400
    ctx.body = { error: 'request parameter: word is required' }
  }
}

const searchHistory: Router.IMiddleware = async ctx => {
  const { user } = ctx.query as { user?: string }
  if (user
    && user.trim().length > 0
    && user.length < cfg.dict.maxUserNameLength) {
    await db
      .listUsage(user)
      .then(lst => {
        if (lst && lst.length > 0) {
          ctx.body = { history: lst.map(u => { return { word: u.word, frequency: u.frequency } }) }
        } else {
          ctx.status = 404
          ctx.body = { error: 'requested search history not found' }
        }
      })
  } else {
    ctx.status = 400
    ctx.body = { error: 'request parameter: user is required' }
  }
}

export { lookup, fuzzySearch, searchHistory }
