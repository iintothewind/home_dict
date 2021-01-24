import * as Router from 'koa-router';
import { translate } from '../middleware/dict'
import { Option, cacheControl } from '../middleware/cache'

const router = new Router()
const opt = { maxAge: 3600 } as Option
router.get('/home_dict/translate', cacheControl(opt), translate)

export { router }
