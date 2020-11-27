import { Router } from 'express';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import videosRouter from './videos.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/signin', sessionsRouter);
routes.use('/videos', videosRouter);

export default routes;
