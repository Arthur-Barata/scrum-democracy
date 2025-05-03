import { DefaultEventsMap, Server, Socket } from "socket.io";

export class JoinRoomHandler {
  public execute(
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    socketRooms: Map<string, string>
  ) {
    socket.on("user:joinRoom", (roomId: string) => {
      console.log(`User joined room: ${roomId}`);

      socket.join(roomId);
      socketRooms.set(socket.id, roomId);

      const clientsConnected = io.of("/").adapter.rooms.get(roomId)?.size || 0;

      io.to(roomId).emit("user:roomJoined", {
        message: `new user connected in room ${roomId}`,
        clientsConnected,
      });
      return roomId;
    });
  }
}
