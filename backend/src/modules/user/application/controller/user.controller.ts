import { Request, Response, Router } from "express";

export class UserController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", this.getUsers);
    this.router.post("/", this.createUser);
    this.router.put("/:id", this.updateUser);
    this.router.delete("/:id", this.deleteUser);
  }

  private getUsers = (req: Request, res: Response) => {
    res.status(200).json({ message: "Get Users" });
  };

  private createUser = (req: Request, res: Response) => {
    res.status(201).json({ message: "Create User" });
  };

  private updateUser = (req: Request, res: Response) => {
    res.status(200).json({ message: "Update User" });
  };

  private deleteUser = (req: Request, res: Response) => {
    res.status(204).json({ message: "Delete User" });
  };
}
