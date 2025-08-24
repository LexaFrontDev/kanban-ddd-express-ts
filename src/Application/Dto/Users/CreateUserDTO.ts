export class CreateUserDTO {
    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string
    ) {}
}
