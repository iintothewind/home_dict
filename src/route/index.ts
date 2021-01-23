import * as Router from 'koa-router';
import { translate } from '../middleware/dict'

const router = new Router()
router.get('/home_dict/translate', translate)

export { router }
