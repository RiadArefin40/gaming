const games = Array.from(document.querySelectorAll("mcd-game-box")).map(
  (box, index) => {
    const img = box.querySelector("img");

    return {
      id: index + 1,
      title: img?.alt ?? "",
      provider: "JILI",
      image: img?.src ?? "",
      game_uid: `replace_with_uid_${index + 1}`,
      type: "slot",
    };
  }
);

copy(JSON.stringify(games, null, 2));