import { Request, Response, NextFunction, Router } from 'express';
import * as controllers from '../Controllers';

export const ApiRouter = (
    UsersController: controllers.UserController,
): Router => {
    const apiRouter = Router();

    apiRouter.post(
        '/register',
        UsersController.register,
    );

    return apiRouter;
};