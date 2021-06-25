import { Request, Response } from "express";
import { CreateComplimentService } from "../services/CreateCompliments";

class CreateComplimentController {
  async handle(request: Request, response: Response) {
    const { tag_id, user_receiver, message, user_sender } = request.body;
    const createComplimentService = new CreateComplimentService();

    const compliment = await createComplimentService.execute({
      tag_id,
      user_receiver,
      message,
      user_sender,
    });

    return response.json(compliment);
  }
}

export { CreateComplimentController };
