import { DefaultEventsMap, Socket } from "socket.io";

export class MessageHandler {
  public execute(
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
  ) {
    socket.on("message", (data: { message: string; roomId: string }) => {
      console.log(`New message: ${data.message} in room: ${data.roomId}`);

      socket.to(data.roomId).emit("message:received", data.message);
    });
  }
}
