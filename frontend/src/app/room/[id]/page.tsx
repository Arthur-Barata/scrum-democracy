"use client";
import { socket } from "@/app/socket";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function RoomPage() {
  const { id } = useParams();
  const [clientsConnected, setClientsConnected] = useState(0);

  useEffect(() => {
    socket.connect();

    return () => {
      socket.emit("user:leaveRoom", id, () => {
        socket.disconnect();
      });
    };
  }, []);

  useEffect(() => {
    socket.emit("user:joinRoom", id);

    const handleRoomConnectionsChange = (data: {
      message: string;
      clientsConnected: number;
    }) => {
      setClientsConnected(data.clientsConnected);
      console.log(data.message);
    };

    socket.on("user:roomJoined", handleRoomConnectionsChange);
    socket.on("user:leavedRoom", handleRoomConnectionsChange);

    return () => {
      socket.off("user:roomJoined", handleRoomConnectionsChange);
    };
  }, [id]);
  return (
    <>
      <main className={styles.main}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Welcome to the room {id} 🎯</h2>
          <h3 className={styles.sectionText}>
            number of clients connected: {clientsConnected}
          </h3>
        </section>
      </main>
    </>
  );
}
