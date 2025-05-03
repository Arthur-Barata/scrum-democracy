"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation"; // Use Router para navegação
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  const handleJoinRoom = () => {
    if (roomId) {
      router.push(`/room/${roomId}`);
    } else {
      alert("Please enter a valid Room ID");
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Join in a room</h1>

        <div style={{ width: "300px" }}>
          <Input
            placeholder="Enter Room Id"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <Button onClick={handleJoinRoom}>Join room</Button>
        </div>
      </main>
    </div>
  );
}
