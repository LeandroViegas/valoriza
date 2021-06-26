import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/complimentsRepositories";

class ListUserSendComplimentsService {
  async execute(user_id) {
    const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
    console.log(user_id)

    const compliments = await complimentsRepositories.find({
      where: { user_sender: user_id },
      relations: ["userSender", "userReceiver", "tag"]
    });
    
    return compliments
  }
}

export { ListUserSendComplimentsService };