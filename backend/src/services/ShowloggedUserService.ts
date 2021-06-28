import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UsersRepositories";

class ShowloggedUserService {
    async execute(user_id){
        const userRepositories = getCustomRepository(UserRepositories)

        const users = await userRepositories.findOne(user_id);

        return classToPlain(users);
    }
}

export { ShowloggedUserService };
