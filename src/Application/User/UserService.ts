import {UserRepositoryInterface} from "../../Domain/Repository/Users/UserRepositoryInterface";
import {User} from "../../Domain/Entity/Users/Users";
import {CreateUserDTO} from "../Dto/Users/CreateUserDTO";

export class UserService {
    constructor(private userRepository: UserRepositoryInterface) {}

    async register(name: string, email: string, password: string): Promise<boolean> {
        const existing = await this.userRepository.findByEmail(email);
        if (existing) throw new Error("User already exists");
        const user = new CreateUserDTO(name, email, password);
        return this.userRepository.save(user);
    }
}

