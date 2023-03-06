const router = require('express').Router();
import { default as controllers } from '../controllers';

router.get('/initsetup', controllers.getInitSetup);

export default router;
