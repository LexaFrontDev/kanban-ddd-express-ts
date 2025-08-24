import { Request, Response } from "express";
import {UserService} from "../../../../Application/User/UserService";

export class UserController {
    constructor(private userService: UserService) {}

    register = async (req: Request, res: Response) => {
        try {
            const {name, email, password } = req.body;
            const user = await this.userService.register(name, email, password);
            res.json(user);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    };
}
