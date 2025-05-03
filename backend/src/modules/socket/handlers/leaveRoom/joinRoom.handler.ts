import { DefaultEventsMap, Server, Socket } from "socket.io";

export class LeaveRoomHandler {
  public execute(
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
  ) {
    socket.on("user:leaveRoom", (roomId: string) => {
      console.log(`User leaved room: ${roomId}`);
      socket.leave(roomId);
      const clientsConnected = io.of("/").adapter.rooms.get(roomId)?.size || 0;

      socket.to(roomId).emit("user:leavedRoom", {
        message: `An User has levead room ${roomId}`,
        clientsConnected,
      });
    });
  }
}
