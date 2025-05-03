import { DefaultEventsMap, Server, Socket } from "socket.io";
import { JoinRoomHandler } from "./handlers/joinRoom/joinRoom.handler";
import { LeaveRoomHandler } from "./handlers/leaveRoom/joinRoom.handler";
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
  private socketRooms = new Map<string, string>();
  private readonly joinRoomHandler = new JoinRoomHandler();
  private readonly messageHandler = new MessageHandler();
  private readonly leaveRoomHandler = new LeaveRoomHandler();

  public initializeSocket() {
    this.io.on(
      "connection",
      (
        socket: Socket<
          DefaultEventsMap,
          DefaultEventsMap,
          DefaultEventsMap,
          any
        >
      ) => {
        console.log("New client connected");
        socket.emit("message", "Welcome to the server!");

        this.joinRoomHandler.execute(socket, this.io, this.socketRooms);
        this.leaveRoomHandler.execute(socket, this.io);
        this.messageHandler.execute(socket);

        socket.on("disconnect", (reason) => {
          const roomId = this.socketRooms.get(socket.id);
          if (roomId) {
            console.log(`User from room ${roomId} disconnected`);
            const clientsConnected =
              this.io.of("/").adapter.rooms.get(roomId)?.size || 0;

            this.io.to(roomId).emit("user:leavedRoom", {
              socketId: socket.id,
              clientsConnected,
            });
            this.socketRooms.delete(socket.id);
          }
          console.log("Client disconnected");
        });
      }
    );
  }
}
