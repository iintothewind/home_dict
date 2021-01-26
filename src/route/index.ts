import * as Router from 'koa-router';
import { lookup, fuzzySearch, searchHistory } from '../middleware/dict'
import { Option, cacheControl } from '../middleware/cache'

const router = new Router()
const opt = { maxAge: 3600 } as Option
router.get('/home_dict/lookup', cacheControl(opt), lookup)
router.get('/home_dict/fuzzy', cacheControl(opt), fuzzySearch)
router.get('/home_dict/history', searchHistory)

export { router }
