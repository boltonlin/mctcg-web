const router = require('express').Router();
// const controllers = require('../controllers');
import { default as controllers } from '../controllers';

router.get('/initsetup', controllers.getInitSetup);

export default router;
