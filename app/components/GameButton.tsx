'use client'
import React from "react";
import { getAuthUser } from "@/lib/auth";
const user = getAuthUser()

function LaunchGameButton({ userId, walletAmount, gameUid }: { userId: string; walletAmount: number; gameUid: string }) {
 const handleLaunchGame = async () => {
  try {
    const res = await fetch('https://api.bajiraj.cloud/launch_game', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
      },
      body: JSON.stringify({
          userName: user.name,
          game_uid: "89a12f80c6dc0aa7651400364e8f5e80",
          credit_amount: user.wallet,
      })
    });

    // Parse the JSON response
    const data = await res.json();
    console.log("Launch Game Response:", data);
    if (data.success && data.gameUrl) {
      // 🔥 Redirect to game
      window.location.href = data.gameUrl;
    } else {
      alert("Failed to launch game");
    }

  } catch (error) {
    console.error("Error launching game:", error);
  }
};


  return (
    <button
      onClick={handleLaunchGame}
      style={{
        padding: "10px 20px",
        backgroundColor: "#ff6600",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontWeight: "bold"
      }}
    >
      Launch Game
    </button>
  );
}

export default LaunchGameButton;
