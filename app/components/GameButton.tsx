import React from "react";

function LaunchGameButton({ userId, walletAmount, gameUid }: { userId: string; walletAmount: number; gameUid: string }) {
  const handleLaunchGame = async () => {
    const url = `/api/launch_game?user_id=${encodeURIComponent(userId)}&wallet_amount=${encodeURIComponent(walletAmount)}&game_uid=${encodeURIComponent(gameUid)}`;


    try {
        const res = await fetch(`/api/launch_game?user_id=${encodeURIComponent(userId)}&wallet_amount=${encodeURIComponent(walletAmount)}&game_uid=${encodeURIComponent(gameUid)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
          }
        });
        const data = await res.json();
        console.log('vendorlist', data);
      } catch (err) {
        console.error(err);
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
