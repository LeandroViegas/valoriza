import { Request, Response } from "express";
import { ListUsersService } from "../services/ListUsersService";

class ListUsersControlller {
    async handle(request: Request, response: Response){
        const listUsersService = new ListUsersService();

        const users = await listUsersService.execute()

        return response.json({users})
    }
}

export {ListUsersControlller}