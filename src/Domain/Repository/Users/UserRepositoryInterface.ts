import { User } from "../../Entity/Users/Users";
import {CreateUserDTO} from "../../../Application/Dto/Users/CreateUserDTO";

export interface UserRepositoryInterface {
    findByEmail(email: string): Promise<number | null>;
    save(user: CreateUserDTO ): Promise<boolean>;
    login(email: string, password: string): Promise<boolean> ;
}
