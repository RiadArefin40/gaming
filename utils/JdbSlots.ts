import { gameImages } from "./gameData";

const csvData = `
Game Name,Game UID,Game Type,,货币,,语言,,,,,,,,,BRL
Dragon Soar,9341a18d096ad901ef77338998f29098,Slot Game,,BRL,,en,,,,,,,,,COP
Pop Pop Candy,fde142e65f14da39f784e9e5325e0a77,Slot Game,,BDT,,th,,,,,,,,,INR
Open Sesame Mega,cb5e57be0354264c6c7ea0cdf4eb18b3,Slot Game,,COP,,vi,,,,,,,,,VND
Fruity Bonanza,f5d6b418b755f3aefe3b9828f3112c9c,Slot Game,,EGP,,id,,,,,,,,,USD
Caishen Coming,45ecec5dd5077785e7a09988b95bbd24,Slot Game,因应市场需求 BDT、PKR、INR 正式环境预设关闭 ,PKR,,pt,,,,,,,,,THB
Coocoo Farm,d1f17fd51e474b0e72892332ea551ba1,Slot Game,,PHP,,ko,,,,,,,,,ZAR
Elemental Link Water,b84274cdfa5731945a34bfd0db1ddeea,Slot Game,,PEN,,es,,,,,,,,,PEN
Elemental Link Fire,46016a772b92c7f47dfdc5873f184ef1,Slot Game,,MYR,,lo,,,,,,,,,NGN
Birdsparty Deluxe,786d1cd7f4fa9905c825378292f1204c,Slot Game,,IDR,,ja,,,,,,,,,MMK
Moneybags Man 2,33c862e7db9e0e59ab3f8fe770f797da,Slot Game,,INR,,bn,,,,,,,,,KRW
Trump Card,96c010fc4a95792401e903213d7add44,Slot Game,,THB,,ru,,,,,,,,,IDR
Fortune Neko,49b706ccfe7c53727ee6760cd9a8721a,Slot Game,,TZS,,,,,,,,,,,KES
Book Of Mystery,13072a6eb2111c1b5202fe6155227e94,Slot Game,,USD,,,,,,,,,,,TZS
Prosperitytiger,1d704bbb187a113229f3fdaa3b5406fe,Slot Game,,USDT,,,,,,,,,,,EGP
Glamorous Girl,2663e14e5b455525252a25d9bd99e840,Slot Game,,VND,,,,,,,,,,,PHP
Blossom Of Wealth,ed6fbaeb7a104dd7ed96fa1683a48669,Slot Game,,ZAR,,,,,,,,,,,BDT
Boom Fiesta,1ffb31ff605f1a7862a138f5cd712056,Slot Game,下架,GHS,,,,,,,,,,,MYR
Big Three Dragons,600c338d3fca2da208f1bba2c9d29059,Slot Game,因应市场需求 BDT、PKR、INR 正式环境预设关闭 ,KES,,,,,,,,,,,RUB
Mayagoldcrazy,6c8009d165293759bb218b72ba3c380f,Slot Game,,,,,,,,,,,,,LAK
Lantern Wealth,f2f2eae301311f0320ef669b68935546,Slot Game,,,,,,,,,,,,,KZT
Marvelous Iv,126cf2bfe8a8e606b362d23de02c0d5e,Slot Game,,,,,,,,,,,,,KGS
Wonder Elephant,540da2ba4c849fc1c315f43ae74df220,Slot Game,,,,,,,,,,,,,UAH
Kong,f6e9fd31cbc3be8cd3bd95486177377b,Slot Game,,测试环境请用BRL或者MYR进行测试,,,,,,,,,,,BYN
Lucky Diamond,6f6867ad1956a04b174c92629cab7f54,Slot Game,,正式环境限制台湾和新加坡地区,,,,,,,,,,,PKR
Spindrift 2,05dc8c7a43305c3fcb43574c570d6378,Slot Game,,,,,,,1qbg f def,,,,,,CLP
Jungle Jungle,6c5fe548bd6e09b683566298b29510ea,Slot Game,下架,,,,,,,,,,,,PGK
Dragons Gate,feaba603992f26633116fb54562e3693,Slot Game,,,,,,,,,,,,,UZS
Spindrift,b624d1917ef5a740c151e4904a7cf0dd,Slot Game,,,,,,,,,,,,,MXN
Double Wilds,7bd5233c83de0669336ee649e6c8d2b5,Slot Game,因应市场需求 BDT、PKR、INR 正式环境预设关闭 ,,,,,,,,,,,,JPY
Moneybags Man,c4fdebb24ff26fffb3a65d018da8ae92,Slot Game,,,,,,,,,,,,,BND
Miner Babe,e705514fdd4f9bea5f82bbd0b2c0a353,Slot Game,,,,,,,,,,,,,XAF
Super Niubi Deluxe,5d940d11c48b64ec1e6a3c8be5228250,Slot Game,,,,,,,,,,,,,EUR
Funky King Kong,cdea2d0670bc40309b4a9b6f942a218a,Slot Game,,,,,,,,,,,,,
Golden Disco,dfb8a198ce0e821560cf543387a2acc2,Slot Game,,,,,,,,,,,,,
Treasure Bowl X-Huge,0651af3e73c7600633522ffe15cc175b,Slot Game,,,,,,,,,,,,,
Mjolnir,e270f0674dff538b181499d18ab47845,Slot Game,,,,,,,,,,,,,
Pirate Treasure,bfb3241e64953f731e72bc833f2fa79a,Slot Game,下架,,,,,,,,,,,,
Fortune Treasure,5a55a19d9cfbead5e64b8169e96bd27a,Slot Game,,,,,,,,,,,,,
Egypt Treasure,b7f39e861e2e02633cb5cb08958f1041,Slot Game,下架,,,,,,,,,,,,
Super Niubi,4042e5d0c777e1d3c3bd481dac0a867e,Slot Game,,,,,,,,,,,,,
Dragons World,00b886803f3d067f7028872468e84745,Slot Game,因应市场需求 BDT、PKR、INR 正式环境预设关闭 ,,,,,,,,,,,,
Go Lai Fu,a3584394182e8abce362d90c2f048c75,Slot Game,,,,,,,,,,,,,
Birds Party,7b497c4d19f87c86ea29910c12129edc,Slot Game,,,,,,,,,,,,,
Triple King Kong,a9f60e017f2765c74e1ec80473ac4ffa,Slot Game,,,,,,,,,,,,,
Orient Animals,bdb0459f7e116a20839a3b2a0063a2ff,Slot Game,,,,,,,,,,,,,
Lucky Seven,b560b7c42bd29f7d0cda06485a3c4af5,Slot Game,,,,,,,,,,,,,
Lucky Racing,8b51a987c5c536a894b592ae361d655d,Slot Game,下架,,,,,,,,,,,,
Mining Upstart,a26bdb5af2cf4964dfb241fbaec09252,Slot Game,下架,,,,,,,,,,,,
Rolling In Money,55bfa979698650a3580d169c1469f79c,Slot Game,下架,,,,,,,,,,,,
Daji,2254bbebab4925c0df6a98d9edcfeec4,Slot Game,下架,,,,,,,,,,,,
Kingsman,55e3b4d064b014a403be6ffba8c4343e,Slot Game,,,,,,,,,,,,,
Street Fighter,528e5d4fda0a34e233a28930783d2c63,Slot Game,下架,,,,,,,,,,,,
Dragon,735fcdbf9f5e6042132cc01e9860723f,Slot Game,因应市场需求 BDT、PKR、INR 正式环境预设关闭 ,,,,,,,,,,,,
Dragon Warrior,29135c91125ae1655f8c91eb29617705,Slot Game,,,,,,,,,,,,,
One Punch Man,5aa472006c8698cf6f59dd0548129cda,Slot Game,下架,,,,,,,,,,,,
Billionaire,16b1418fe87a6fa5628eec8cb40da056,Slot Game,,,,,,,,,,,,,
Mr. Bao,8c4681d49251042820069339dee4250c,Slot Game,下架,,,,,,,,,,,,
Panda Panda,6652927614dccaf87d8965c509e96f82,Slot Game,下架,,,,,,,,,,,,
Legendary 5,04a3be36bbf1110345d53e07df9c9cc3,Slot Game,,,,,,,,,,,,,
Chef Panda,078a7876afc6553fd0c0c9d1cbe0b04a,Slot Game,下架因应市场需求 BDT、PKR、INR 正式环境预设关闭 ,,,,,,,,,,,,
Lucky Fuwa,55946533d07080972b83c4aae1d4be2f,Slot Game,下架,,,,,,,,,,,,
Monkey King,5ecca33d3cabee8cbab8897ce2843459,Slot Game,下架,,,,,,,,,,,,
Rooster In Love,2f24019dc8abbe05b984611462a1f01c,Slot Game,,,,,,,,,,,,,
Xi Yang Yang,f1496f1b49981a63e6064ac84517b5ae,Slot Game,,,,,,,,,,,,,
Fortune Horse,ca6e7b621b13077debbf1bf9d5a6c031,Slot Game,,,,,,,,,,,,,
Flirting Scholar Tang Ii,857d3426c220b4003cd0e4521c07e94b,Slot Game,下架,,,,,,,,,,,,
Open Sesameii,558ca5b101d1be5bd7a08c6d01422c4f,Slot Game,,,,,,,,,,,,,
Winning Mask Ii,955ab46e30fcda3b2446169409848fa7,Slot Game,因应市场需求 BDT、PKR、INR 正式环境预设关闭 ,,,,,,,,,,,,
Guan Gong,90bfd55dcf41709d27f1f38fd4a314a9,Slot Game,下架,,,,,,,,,,,,
Beauty And The Kingdom,478d2e337f0d0a1b40e0e3521f89f1ba,Slot Game,因应市场需求 BDT、PKR、INR 正式环境预设关闭 ,,,,,,,,,,,,
Lucky Phoenix,8244e0afc46b2b8a3446ec18ae0e129a,Slot Game,下架,,,,,,,,,,,,
Lucky Miner,8146db6ded1ef29540d262650817d090,Slot Game,下架,,,,,,,,,,,,
Olympian Temple,ca11d9830495d2888d7e50770353ce32,Slot Game,,,,,,,,,,,,,
Mahjong,e9d4b66c06a43e73ec8f1b2055f83c3a,Slot Game,因应市场需求 BDT、PKR、INR 正式环境预设关闭 ,,,,,,,,,,,,
Banana Saga,77f407b50f00ec4569249b008a5adca0,Slot Game,,,,,,,,,,,,,
Open Sesame,d5cede7b6800bd9cd266cde8c4f73dc6,Slot Game,,,,,,,,,,,,,
Four Treasures,d53f82ab4fbb353480e012fd763bc339,Slot Game,因应市场需求 BDT、PKR、INR 正式环境预设关闭 ,,,,,,,,,,,,
Napoleon,e4b973ece238c954fbcdf30fdfeae969,Slot Game,,,,,,,,,,,,,
New Year,319fb2a372755ff47f6adc4f36e67b0f,Slot Game,因应市场需求 BDT、PKR、INR 正式环境预设关闭 ,,,,,,,,,,,,
Moonlight Treasure,85e29fa6b578c6bf131ad4fdff750acb,Slot Game,,,,,,,,,,,,,
Lucky Lion,c1557ea0fad63c5e07b32d9f62ef1899,Slot Game,下架,,,,,,,,,,,,
Lucky Qilin,f2298bcf0de0dccdd767d30b6e4f811a,Slot Game,下架,,,,,,,,,,,,
Formosa Bear,e0afed167c1ef4c9a35c527a52419f0a,Slot Game,,,,,,,,,,,,,
The Llama Adventure,6800ef74e2b33c9a9155848f1328c8e5,Slot Game,,,,,,,,,,,,,
Wukong,59acc6ad72fd6fb6cf30eb58cd9bedb8,Slot Game,因应市场需求 BDT、PKR、INR 正式环境预设关闭 ,,,,,,,,,,,,
Winning Mask,4aebce625a1495532a25344f0e4ac584,Slot Game,因应市场需求 BDT、PKR、INR 正式环境预设关闭 ,,,,,,,,,,,,
Dragon Soar - Hyper Wild,07df172c089e29e576aa41eeb0cbeb2b,Slot Game,因应市场需求 BDT、PKR、INR 正式环境预设关闭 ,,,,,,,,,,,,
Lucky Dragons,c32fff242e09a234f7350bb9aaa055cc,Slot Game,因应市场需求 BDT、PKR、INR 正式环境预设关闭 ,,,,,,,,,,,,
Spirit Tide Legend,638d38491dad4a6562713143b1fc6cc1,Fish Game,,,,,,,,,,,,,
Fishing Disco,e453b811fd1782fd2ade1f93ee0dee32,Fish Game,,,,,,,,,,,,,
Dragon Master,f691d904ea681ce449263f7e9cc47c35,Fish Game,,,,,,,,,,,,,
Fishing Yilufa,877c97367d24925a11d342726eb0320f,Fish Game,,,,,,,,,,,,,
Shade Dragons Fishing,89e967a8336fb8caad2c1b6d735588fe,Fish Game,,,,,,,,,,,,,
Cai Shen Fishing,6df463eabe5fcdaa033e1c89b9ffd162,Fish Game,,,,,,,,,,,,,
Dragon Fishing Ii,6cef8d8ea517d86602db60fe9781b01b,Fish Game,,,,,,,,,,,,,
Dragon Fishing,1145d7cd96518a5ba2f77cb14cb363c4,Fish Game,,,,,,,,,,,,,
Plinko,cb54272cd536cf77eb6093bae2513095,Arcade Game,,,,,,,,,,,,,
Hilo,9ffbc085919e5e19f93a682fd3a737bb,Arcade Game,,,,,,,,,,,,,
Goal,0160b30b64598290365f61211fb84a7b,Arcade Game,,,,,,,,,,,,,
Firework Burst,19f082ffb4656934e80459a73ab73037,Arcade Game,,,,,,,,,,,,,
Mines,45a2a92108634508e5c47c690eb01c0b,Arcade Game,,,,,,,,,,,,,
Galaxy Burst,37ca0b32e1908480e03db00cdc1bc2cf,Arcade Game,,,,,,,,,,,,,
Jogo Do Bicho,0e8432be6bc0cab304b41bc964aaf154,Arcade Game,,,,,,,,,,,,,
Caishen Party,6437f1794f0753b268b2badbd69ef156,Arcade Game,,,,,,,,,,,,,
Lucky Color Game,5708005e9f2340dbd719567a94ba44b4,Arcade Game,,,,,,,,,,,,,
King Of Football,4088c7ed9db461f990d9514d6b9f7537,Arcade Game,,,,,,,,,,,,,
Crazy King Kong,c2c611f87d47faae8e4b285fe8145d41,Arcade Game,,,,,,,,,,,,,
Super Super Fruit,a9899c045de7873e620e0ef330f3fc73,Arcade Game,,,,,,,,,,,,,
Huaguoshan Legends,6ff786580f7d9453728b9a8a3d1c3499,Arcade Game,,,,,,,,,,,,,
Beer Tycoon,b133cf4f3c32b80344b381cc9f26442a,Arcade Game,,,,,,,,,,,,,
Birds And Animals,db93ffd7164953bb1eb4c86b68542ed6,Arcade Game,,,,,,,,,,,,,
Happy New Year,d0b0d503d3d553643f665d5d2fdab138,Arcade Game,因应市场需求 BDT、PKR、INR 正式环境预设关闭 ,,,,,,,,,,,,
Classic Mario,627148e0dd36ff12df432fc920a0c59f,Arcade Game,,,,,,,,,,,,,
Happy Lottery,d6cd29e274d066e2e8f0cb171e7583a8,Lottery Game,,,,,,,,,,,,,
Gold Rooster Lottery,2f3361619ef9520214c08fd2aecf33da,Lottery Game,,,,,,,,,,,,,
Cai Shen Bingo,f3629935719cf04d6b689933486177ce,Lottery Game,因应市场需求 BDT、PKR、INR 正式环境预设关闭 ,,,,,,,,,,,,
Tongits Rush,3ecfba28c6c8f3ffce6c8134478a6bfa,Card Game,只支持PHP币种,因应市场需求 BDT、PKR、INR 正式环境预设关闭 ,,,,,,,,,,,
Tongits Fight,6996a44ebff8fc97ce19cf791f4916cc,Card Game,只支持PHP币种,因应市场需求 BDT、PKR、INR 正式环境预设关闭 ,,,,,,,,,,,
Pusoy Rush,f03953d954b4ac3809efbedd5dfabec2,Card Game,只支持PHP币种,因应市场需求 BDT、PKR、INR 正式环境预设关闭 ,,,,,,,,,,,
Dragon Tiger - Joker Bonus,067d540d7ece7e7dfcfcadf11f25a71d,Card Game,,,,,,,,,,,,,
Tongits,47614f18718c2f911b89f00fd053b527,Card Game,只支持PHP币种,因应市场需求 BDT、PKR、INR 正式环境预设关闭 ,,,,,,,,,,,
Pusoy,f436610d0255b4e3646603a1e42793b7,棋牌游戏,下架只支持PHP币种,因应市场需求 BDT、PKR、INR 正式环境预设关闭 ,,,,,,,,,,,
Fighter Fire,ff83699bef9b2e773857ed1a9eedc5fb,Fish Game,,,,,,,,,,,,,
Dice,6aa921aebc8d7e170740cfc8e88426f6,Arcade Game,,,,,,,,,,,,,
Mole Crash,a170eb308c8fab8f2a5cdac5b427acbd,Arcade Game,,,,,,,,,,,,,
Mines2,b1ad7a48e4d4839dbe53fcadf7eb5183,Arcade Game,,,,,,,,,,,,,
Pusoy,524ff2b54801f94ada51a1e2b37c593e,arcade,下架,,,,,,,,,,,,
Piggy Bank,7d21ecdabd01130a22326115d3967ffa,Slot Game,,,,,,,,,,,,,
Fishin' Fever X-Huge,226b63d399440f774ce384c0f020387d,Slot Game,20250603,,,,,,,,,,,,
Pop Pop Candy 1000,b87763aef6ce72c565302a377676d16e,Slot Game,,,,,,,,,,,,,
Fruity Bonanza Combo,a34e49e1d90c2e5f4e93e366836ba5ae,Slot Game,,,,,,,,,,,,,
Fortune Jewel,03c2cd347f0600cc87601e0d0af3b2f4,Slot Game,,,,,,,,,,,,,
Magic Ace WILD LOCK,e5e26fa480a5c256d8a6361122635da9,Slot Game,,,,,,,,,,,,,
Bull Treasure X-Huge,48d1aaad7b3c4e25ad1d0320c461aa9c,Slot Game,,,,,,,,,,,,,
Dragon Soar - Hyper Wild,a7c3e0e49972128da40ef7ff03925651,Slot Game,,,,,,,,,,,,,
Ragnarok : Thor VS Loki,5634d86cb6d36e67bb686e7349efa95c,Slot Game,20250721,,,,,,,,,,,,
Lucky Elephant X-Huge,60f7634877928ae6fc7de2262e45d9d3,Slot Game,20250812,,,,,,,,,,,,
Cricket Burst,36d1db0afc55e149119f89e5c10e5ae5,Arcade Game,只支持INR、BDT、LKR、MUR、NPR、PKR、AED,,,,,,,,,,,,
Teen Patti 20-20,6e6fa6dba69ca95e81b1ff4fe3592ead,Card Game,只支持INR、BDT、LKR、MUR、NPR、PKR、AED,,,,,,,,,,,,
Andar Bahar,c35a9edab6fef481c60851d6ea7c6fec,Card Game,只支持INR、BDT、LKR、MUR、NPR、PKR、AED,,,,,,,,,,,,
Rummy,160186998b6d8e1723980f7332582f0b,Card Game,只支持INR、BDT、LKR、MUR、NPR、PKR、AED,,,,,,,,,,,,
Aviator Extra Bet,2cb0f27d6690031bf682bc1703792738,Arcade Game,,,,,,,,,,,,,
Koi Trio,dcf9970165a8991c915fb6185f8f995a,Slot,,,,,,,,,,,,,
Magic Ace,f110691f927f86e7f1ace67ce5ffe331,Slot,,,,,,,,,,,,,
Dragon of Demons,dfa84de00ebc583e8b485e864b2bfb63,Fish,,,,,,,,,,,,,
Piggy Bank TapTap,9dba332c462d80423ce4d15a2a3a041b,Arcade Game,,,,,,,,,,,,,
Olympig,892af2fa3627269cabfd5ce894f6f00e,Slot,,,,,,,,,,,,,
Wealthway,3d97f2073a05873b428be0ff20df724c,Slot,,,,,,,,,,,,,
Tongits Go,046f8dce34ee2a53c86d0a54e0bb89d2,Card Game,只支持PHP币种,,,,,,,,,,,,
Pusoy Go,d73aa0a49f4702fd7785250906aaaba0,Card Game,只支持PHP币种,,,,,,,,,,,,
`;

function parseGames(csv:any) {
  const lines = csv.trim().split('\n');
  // Skip the header line
  return lines.slice(1).map((line: any) => {
      const parts = line.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/);

    const name = parts[0]?.trim();
    const uid = parts[1]?.trim();
    return {
      name: name,
      uid: uid,
      img: ''
    };
  });
}

export const JdbSlotArray = parseGames(csvData);
console.log(JdbSlotArray);


