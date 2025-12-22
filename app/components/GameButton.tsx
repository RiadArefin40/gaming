import React from "react";

function LaunchGameButton({ userId, walletAmount, gameUid }: { userId: string; walletAmount: number; gameUid: string }) {
  const handleLaunchGame = () => {
    const url = `/launch_game?user_id=${encodeURIComponent(userId)}&wallet_amount=${encodeURIComponent(walletAmount)}&game_uid=${encodeURIComponent(gameUid)}`;
    window.open(url, "_blank"); // Opens game in a new tab
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
