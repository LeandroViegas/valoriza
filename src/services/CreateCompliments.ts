import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/complimentsRepositories";
import { UserRepositories } from "../repositories/UsersRepositories";

interface IComplimentRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

class CreateComplimentService {
  async execute({
    tag_id,
    user_receiver,
    message,
    user_sender,
  }: IComplimentRequest) {
    const complimentsRepositories = getCustomRepository(
      ComplimentsRepositories
    );
    const userRepositories = getCustomRepository(UserRepositories);

    if (user_sender === user_receiver)
      throw new Error("Incorrect user receiver!");

    const userReceiverExists = await userRepositories.findOne(user_receiver);

    if (!userReceiverExists) throw new Error("User Receiver does not exists!");

    const compliment = complimentsRepositories.create({
      tag_id,
      user_receiver,
      message,
      user_sender,
    });

    await complimentsRepositories.save(compliment);

    return compliment;
  }
}

export { CreateComplimentService };
