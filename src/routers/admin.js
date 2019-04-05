import express from 'express';
import auth from '../controllers/auth';
import controller from '../controllers/articles';

// create an express router
const router = express.Router();

// route controllers
router.route('/article').post(controller().save);
router.route('/article/:url').delete(controller().remove);
router.route('/article/:url').put(controller().update);

router.route('/whoami').get(auth().whoami);

export default router;
