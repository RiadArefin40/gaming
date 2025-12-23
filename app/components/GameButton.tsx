import React from "react";

function LaunchGameButton({ userId, walletAmount, gameUid }: { userId: string; walletAmount: number; gameUid: string }) {
 const handleLaunchGame = async () => {
  try {
    const res = await fetch('/api/launch_game', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
      },
      body: JSON.stringify({
        userName: "player123",
        game_uid: "ba2adf72179e1ead9e3dae8f0a7d4c07",
        credit_amount: 1200
      })
    });

    // Parse the JSON response
    const data = await res.json();
    console.log("Launch Game Response:", data);

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
