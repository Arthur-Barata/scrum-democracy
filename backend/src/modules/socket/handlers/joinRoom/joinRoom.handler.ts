import { DefaultEventsMap, Socket } from "socket.io";

export class JoinRoomHandler {
  public execute(
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
  ) {
    socket.on("user:joinRoom", (roomId: string) => {
      console.log(`User joined room: ${roomId}`);

      socket.join(roomId);
      socket.emit("user:roomJoined", `Welcome to room ${roomId}`);
    });
  }
}
