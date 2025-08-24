import {
    asClass,
    createContainer,
    asFunction,
    InjectionMode,
    AwilixContainer,
    asValue
} from 'awilix';

import { Server } from './Server';
import { Router } from './Router';
import { ErrorMiddleware } from './Infrastructure/Error/ErrorMiddleware';
import { ApiRouter } from './Infrastructure/http/Router';
import { createPrismaClient } from './Infrastructure/prisma';
import { ServerLogger } from './Infrastructure/logger';
import { config } from '../config';
import { UserService } from './Application/User/UserService';
import {UserPrismaRepository} from "./Infrastructure/prisma/repositories/Users/UserPrismaRepository";
import {UserController} from "./Infrastructure/http/Controllers";

export class Container {
    private readonly container: AwilixContainer;

    constructor() {
        this.container = createContainer({
            injectionMode: InjectionMode.CLASSIC
        });

        this.register();
    }

    public register(): void {
        this.container
            .register({
                server: asClass(Server).singleton(),
                config: asValue(config),
                router: asFunction(Router).singleton(),
                logger: asClass(ServerLogger).singleton(),
                db: asFunction(createPrismaClient).singleton()
            })
            .register({
                errorMiddleware: asClass(ErrorMiddleware).singleton(),
                apiRouter: asFunction(ApiRouter).singleton()
            })
            .register({
                userRepository: asClass(UserPrismaRepository).singleton(),
                userService: asClass(UserService).singleton(),
                userController: asClass(UserController).singleton(),
            });

    }

    public invoke(): AwilixContainer {
        return this.container;
    }
}