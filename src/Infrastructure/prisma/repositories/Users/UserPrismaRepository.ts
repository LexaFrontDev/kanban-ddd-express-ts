import {PrismaClient} from "@prisma/client";
import {UserRepositoryInterface} from "../../../../Domain/Repository/Users/UserRepositoryInterface";
import {User} from "../../../../Domain/Entity/Users/Users";
import bcrypt from "bcrypt";
import {CreateUserDTO} from "../../../../Application/Dto/Users/CreateUserDTO";

export class UserPrismaRepository implements UserRepositoryInterface {
    constructor(private prisma: PrismaClient) {}

    async findByEmail(email: string): Promise<number | null> {
        const user = await this.prisma.user.findUnique({
            where: { email },
            select: { id: true },
        });
        return user ? user.id : null;
    }

    async save(user: CreateUserDTO): Promise<boolean> {
        const existing = await this.findByEmail(user.email);
        if (existing) return false;
        const hashedPassword = await bcrypt.hash(user.password, 10);
        await this.prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                passwordHash: hashedPassword,
            },
        });
        return true;
    }

    async login(email: string, password: string): Promise<boolean> {
        const user = await this.prisma.user.findUnique({ where: { email } });

        if (!user) return false;

        return bcrypt.compare(password, user.passwordHash);
    }
}
