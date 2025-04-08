import { DefaultEventsMap, Server } from "socket.io";
import { JoinRoomHandler } from "./handlers/joinRoom/joinRoom.handler";
import { MessageHandler } from "./handlers/message/message.handler";

export class SocketInitializer {
  constructor(
    private readonly io: Server<
      DefaultEventsMap,
      DefaultEventsMap,
      DefaultEventsMap,
      any
    >
  ) {}
  private readonly joinRoomHandler = new JoinRoomHandler();
  private readonly messageHandler = new MessageHandler();

  public initializeSocket() {
    this.io.on("connection", (socket: any) => {
      console.log("New client connected");

      this.joinRoomHandler.execute(socket);
      this.messageHandler.execute(socket);

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });
  }
}
