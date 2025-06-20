import e, {Router} from 'express'
import {usersController} from '../controllers/usersController.js'
import {tweetsController} from '../controllers/tweetssController.js' 
import {comentariosController} from '../controllers/comentariosController.js'
export const  usersRouter= Router();
usersRouter.get('/',usersController.getAll)
usersRouter.post('/',usersController.create)
usersRouter.post('/login',usersController.usuario)
export const tweetsRouter = Router();
tweetsRouter.get('/', tweetsController.getAll);
tweetsRouter.post('/', tweetsController.create);
export const comentariosRouter = Router();
comentariosRouter.get('/', comentariosController.getAll);
comentariosRouter.post('/', comentariosController.create);
comentariosRouter.get('/:tweetId', comentariosController.getByTweetId);
