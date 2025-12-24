import { gameImages } from "./gameData";

const csvData = `
code,Game Name,Game UID,Game Type,RTP,Release Date,Remarks,货币
104,Baccarat Lobby,e58e145313cf8c3a41a2240c1579b735,CasinoLive,"Regular Baccarat Player: 98.94%",,,
`;




interface Game {
  name: string;
  uid: string;
  image: string;
}

function parseGames(): Game[] {
  const games: Game[] = [
    {
      name: "Lobby",
      uid: "e58e145313cf8c3a41a2240c1579b735",
      image: "https://img.j189eb.com/jb/h5/assets/v3/images/icon-set/vendor-type/for-dark/vendor-awcmpp.png"
    }
  ];

  return games;
}

export const prgmGamesArray = parseGames();
console.log(prgmGamesArray);


