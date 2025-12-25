import { gameImages } from "./gameData";

const csvData = `
Code,Game Name,Game UID,Game Type,,货币,,语言
65,Mahjong Ways,1189baca156e1bbbecc3b26651a63565,Slot Game,96.92%,,AED,,en
74,Mahjong Ways 2,ba2adf72179e1ead9e3dae8f0a7d4c07,Slot Game,96.95%,,AFN,,da
87,Treasures of Aztec,2fa9a84d096d6ff0bab53f81b79876c8,Slot Game,96.71%,,ALL,,de
60,Leprechaun Riches,fb2a2ac51303c0a0801dbe6a72d936f7,Slot Game,97.35%,,AMD,,es
89,Lucky Neko,e1b4c6b95746d519228744771f15fe4b,Slot Game,96.73%,,ANG,,fi
54,Captain's Bounty,cd29b9906a852ce26b53b6d6d81037d4,Slot Game,96.15%,,AOA,,fr
84,Queen of Bounty ,83a6890cf84e4c5a6bacf96d5355d472,Slot Game,96.74%,,ARS,,id
104,Wild Bandito,95fc290bb05c07b5aad1a054eba4dcc4,Slot Game,96.73%,,AWG,,it
106,Ways of the Qilin,fedfca553a97a791a3a41c4f1e3bff58,Slot Game,96.69%,,AZN,,ja
57,Dragon Hatch,4afef91d3addb9ce5107abaf3342b9a5,Slot Game,96.83%,,BAM,,ko
48,Double Fortune,3810e528e0abb8ce1cd7ddc2ece005c0,Slot Game,96.22%,,BBD,,nl
53,The Great Icescape,99f07ed2226f37e22570325fc1c078f2,Slot Game,96.33%,,BDT,,no
71,Caishen Wins,82a810ba99a5fb3e23fc514afebd6314,Slot Game,96.92%,,BGN,,pl
75,Ganesha Fortune,c4b57c6dcfac5c8a31b9174523103c8c,Slot Game,96.72%,,BHD,,pt
79,Dreams of Macau,0ef82ebe6f819619f53b83e218b9452c,Slot Game,96.73%,,BIF,,ro
98,Fortune Ox,8db4eb6d781f915eebab2a26133db0e9,Slot Game,96.75%,,BMD,,ru
135,Wild Bounty Showdown,c98bb64436826fe9a2c62955ff70cba9,Slot Game,96.75%,,BND,,sv
1312883,Prosperity Fortune Tree,0da0fda6981138234f03cb665984c07e,Slot Game,96.77%,,BOB,,th
1372643,Diner Delights,7e6298970ad1c3c983e495be86833dee,Slot Game,96.75%,,BRL,,tr
73,Egypt's Book of Mystery,1babfc499be7bc670f11695e8668b59d,Slot Game,96.75%,,BSD,,vi
82,Phoenix Rises,21c55c4cd28bb1ebf465fcfaf413477c,Slot Game,96.70%,,BTN,,my
83,Wild Fireworks,fb8888b2dec33fe9d28996376580b410,Slot Game,96.75%,,BWP,,
92,Thai River Wonders,fcc6918b79eddf49984d4f5f650c8ded,Slot Game,96.71%,,BYN,,
94,Bali Vacation,c79544b2cf7a3326c85f6ab5bdf53d25,Slot Game,96.71%,,BZD,,
103,Crypto Gold,b1e11902cecf38023f2916569c32040a,Slot Game,96.71%,,CAD,,
110,Jurassic Kingdom,4eef5090166a6889956a630321713366,Slot Game,96.72%,,CDF,,
117,Cocktail Nights,5bea5667515cb7a31f6f07dc3caa13b1,Slot Game,96.75%,,CHF,,
126,Fortune Tiger,9a8482565ce343ad3ea7fc4bc42cb043,Slot Game,96.81%,,CLP,,
127,Speed Winner,386a9d8e184d9bc7c7aca32a8a5db686,Slot Game,96.72%,,COP,,
128,Legend of Perseus,6e37f6e1b6042c2147866c4d86206979,Slot Game,96.77%,,CRC,,
1,Honey Trap of Diao Chan,cd0cc7e653b42133d57145d5505d4e96,Slot Game,96.96%,,CUP,,
3,Fortune Gods,d3aad7ca1486eb3f145e2c43f38b559c,Slot Game,95.04%,,CVE,,
24,Win Win Won,43862cc768882dff441a60b26dcec1c0,Slot Game,94.14%,,CZK,,
6,Medusa II,1c6d773d6a616d74e2573343a5dcecc3,Slot Game,94.96%,,DJF,,
26,Tree of Fortune,e7d7e8396619459db2c178ed72f81049,Slot Game,95.01%,,DKK,,
7,Medusa ,dcc55631d793ad44be98d21c99f7e361,Slot Game,95.29%,,DOP,,
25,Plushie Frenzy,b34c5e632cdc53fc67f1a5eec5758af7,Slot Game,94.82%,,DZD,,
2,Gem Saviour,9e795df6bdf093a144e714fd35afbb7a,Slot Game,96.82%,,EGP,,
18,Hood vs Wolf,222ce90a04a2246eecd5216454f9792f,Slot Game,95.39%,,ERN,,
28,Hotpot,2fea77daa52fd607ed0abe816e4dc7c7,Slot Game,95.83%,,ETB,,
29,Dragon Legend,b990b58ed9e1aa341b3164f49bcb1517,Slot Game,97.15%,,EUR,,
35,Mr. Hallow-Win,12e94577c713a431ef7765394bb9be2f,Slot Game,95.86%,,FJD,,
34,Legend of Hou Yi,1ed6fe92243975f73c944342119a1336,Slot Game,95.78%,,FKP,,
36,Prosperity Lion,1fcb23fa9fac3ca32e20adfe90028de3,Slot Game,95.77%,,GBP,,
33,Hip Hop Panda,5fdbd55ac67eea146b93939ee060cd54,Slot Game,95.75%,,GEL,,
37,Santa's Gift Rush,864edc20e589a738c632f8a49a2e02a3,Slot Game,96.36%,,GHS,,
31,Baccarat Deluxe,22c3b8df172b40ac24a7e9c909e0e50e,Slot Game,98.94%,,GIP,,
38,Gem Saviour Sword,4bbb563e9cf0211a3433beeebe70f35b,Slot Game,95.54%,,GMD,,
39,Piggy Gold,a9d874dd5305212b09845fc88f72e02d,Slot Game,95.86%,,GNF,,
41,Symbols of Egypt,0c7c636333c3c0807d2da26e1f0c8cd1,Slot Game,95.71%,,GTQ,,
44,Emperor's Favour,12766ca09f503fec11f391199fce5e24,Slot Game,96.03%,,GYD,,
42,Ganesha Gold,8dcea650a5a4d96530a77e6df8f61923,Slot Game,96.08%,,HNL,,
40,Jungle Delight,232e8e0c74f9bb16ab676e5ed49d72b4,Slot Game,96.03%,,HTG,,
50,Journey to the Wealth,139f7ae7151a8bd388511bd8b7ce0c40,Slot Game,96.39%,,HUF,,
61,Flirting Scholar,0c884fde76cbc187f2797c4f76532220,Slot Game,97.44%,,IDR,,
59,Ninja vs Samurai,2eb712d4bb30e4594032ebf1464618b1,Slot Game,97.44%,,ILS,,
64,Muay Thai Champion,82127ece1232c6762c81fedb73c99756,Slot Game,97.38%,,INR,,
63,Dragon Tiger Luck,3d3dd6e2fd819832528108e0af197c43,Slot Game,96.94%,,IQD,,
68,Fortune Mouse,8e5a4dd7da06fb68165d13f8bcd06328,Slot Game,96.96%,,IRR,,
20,Reel Love,813138051d990c0c21fb78015b14cbef,Slot Game,96.96%,,ISK,,
62,Gem Saviour Conquest,07d9e7940f430557447cb19692ae4409,Slot Game,96.92%,,JMD,,
67,Shaolin Soccer,da483088a7f719026e93ba95c5547a8c,Slot Game,96.93%,,JOD,,
70,Candy Burst ,27237d7e8d9b183c92fa9f6ab9832edc,Slot Game,96.93%,,JPY,,
69,Bikini Paradise ,18f7f3fdda3e951989731b7204572a8f,Slot Game,96.95%,,KES,,
85,Genie's 3 Wishes,16e34863dada5465919b289f83c494a1,Slot Game,96.75%,,KGS,,
80,Circus Delight,5a11d239f4368b4ec21d31e5979d85cf,Slot Game,96.70%,,KHR,,
90,Secrets of Cleopatra,7028ed373d5bffeeb22fa90c4066bd9e,Slot Game,96.74%,,KMF,,
58,Vampire's Charm,8912f36ea0ca97fc6911fc21b3be6f6a,Slot Game,96.75%,,KPW,,
88,Jewels of Prosperity,f55a666db274fcf210dd69801ae7e87a,Slot Game,96.73%,,KRW,,
97,Jack Frost's Winter,0a8772ad753cfce2c03c0599ad60c74c,Slot Game,96.70%,,KWD,,
86,Galactic Gems,5d26d9ec03d3bc031e49abd5b0ffbdda,Slot Game,96.74%,,KYD,,
91,Guardians of Ice and Fire,4e2f6b7602035730e0e8ee89675a417c,Slot Game,96.70%,,KZT,,
93,Opera Dynasty,c9ec6bce856aafad85f7de5405f7b1c3,Slot Game,96.79%,,LAK,,
95,Majestic Treasures,894240c0ef08d5c2e29b231013e1514d,Slot Game,96.68%,,LBP,,
100,Candy Bonanza,bbe2320adc5c506e7e56a2d24d96a252,Slot Game,96.72%,,LKR,,
105,Heist  Stakes,a4a67f1259cabed59e338e30149ceb0f,Slot Game,96.72%,,LRD,,
101,Rise of Apollo,3da7ee034052b8cb90c6ca060652ded4,Slot Game,96.78%,,LSL,,
102,Mermaid Riches,a9d7a5af417a94caf554170e6b345e57,Slot Game,96.71%,,LYD,,
113,Raider Jane's Crypt of Fortune,24d8e1dbc5cface0907f5a21ecd56753,Slot Game,96.75%,,MAD,,
115,Supermarket Spree,7ef03497fc0b21c34b137e85b1e409cd,Slot Game,96.71%,,MDL,,
108,Buffalo Win,2818a7add6e10b2ec5f938d7ae0efb04,Slot Game,96.71%,,MGA,,
107,Legendary Monkey King,5cdeba2ab48d6ba345b1a4de8e2776b5,Slot Game,96.71%,,MKD,,
119,Spirited Wonders,87a05c81af5635bed41765bfd076ee15,Slot Game,96.70%,,MMK,,
114,Emoji Riches,101ca3ff83b149dcf3439309e9b32142,Slot Game,96.78%,,MNT,,
118,Mask Carnival,adf297c2666c69b3abc3b61618d593b8,Slot Game,96.70%,,MUR,,
112,Oriental Prosperity,23b43b58e11aadb1f27fd05ba41e9819,Slot Game,96.75%,,MVR,,
122,Garuda Gems,aa609892f551de2053e92427dc4ae17f,Slot Game,96.77%,,MWK,,
121,Destiny of Sun & Moon,617ca04ffcffbc543a1a30cacdac98fa,Slot Game,96.80%,,MXN,,
125,Butterfly Blossom,116989bb267a72035bd01818c5496126,Slot Game,96.74%,,MZN,,
123,Rooster Rumble,5c371d9fca6109c954de93ac7986c5db,Slot Game,96.75%,,NAD,,
120,The Queen's Banquet,1b317b5f8bf2ca0cc609307810407426,Slot Game,96.71%,,NGN,,
124,Battleground Royale,e9f92f6edc2dac2d08bc345ee036260c,Slot Game,96.75%,,NIO,,
129,Win Win Fish Prawn Crab,9b344f0b2a9bda427684be60597d2fc6,Slot Game,96.72%,,NOK,,
130,Lucky Piggy,66fadac68ed45e23def86c06cc811820,Slot Game,96.79%,,NPR,,
132,Wild Coaster,a06f1a154698243bf2484853d38e5fbb,Slot Game,96.71%,,NZD,,
1338274,Totem Wonders,a03c6e7a918132b50f9caa297df1752d,Slot Game,96.73%,,OMR,,
1368367,Alchemy Gold,9860c865264dcacad1ef37176cdefc1a,Slot Game,96.78%,,PAB,,
1340277,Asgardian Rising,08d92dc2ca14f42c681b44297386d600,Slot Game,96.76%,,PEN,,
1402846,Midas Fortune,a2fd6b0cadc8fefccfb0d063b1f81d85,Slot Game,96.73%,,PGK,,
1543462,Fortune Rabbit,e175cdd3215a02f5539cc8354a149b75,Slot Game,96.75%,,PHP,,
1420892,Rave Party Fever,901aa1b709a937f6a04baddb98a8d1d3,Slot Game,96.73%,,PKR,,
1381200,Hawaiian Tiki,35d6743ae5d73a3359f143cbb44ede09,Slot Game,96.76%,,PLN,,
1418544,Bakery Bonanza,d0fe7aa2f7ed5778190b1e60d94e6773,Slot Game,96.72%,,PYG,,
1448762,Songkran Splash,894b1c7609629cf9b3d127d9dbaa372c,Slot Game,96.69%,,QAR,,
1432733,Mystical Spirits,3b2d4d1ae24b1c3ad29556a6cf875f11,Slot Game,96.75%,,RON,,
1513328,Super Golf Drive,d37dde2adb52e0ea708c0ccd6877b1b3,Slot Game,96.78%,,RSD,,
1601012,Lucky Clover Riches,288f290554746bb32322a79b96ecdcbb,Slot Game,96.77%,,RUB,,
1397455,Fruity Candy,9f2c89ae5b7c0894c9ee9e223e3fd9d8,Slot Game,96.75%,,RWF,,
1473388,Cruise Royale,8489d662ccc07a2e9677729f76e26ae8,Slot Game,96.63%,,SAR,,
1594259,Safari Wilds,97c6f05ef6a0a34cad10d5e00edc909c,Slot Game,96.75%,,SBD,,
1572362,Gladiator's Glory,2454dc7cfdc651b7318950453bc3f617,Slot Game,96.75%,,SCR,,
1529867,Ninja Racoon Frenzy,6d1937d2e7f87306333443c99ac2c03f,Slot Game,96.82%,,SDG,,
1489936,Ultimate Striker,4415d83cd9c74299814c1473db83bf7f,Slot Game,96.77%,,SEK,,
1568554,Wild Heist Cashout,028bd89b2120e880bcf1968c37277460,Slot Game,96.77%,,SHP,,
1555350,Forge of Wealth,f8ec50fc2ef996e6c182fd2fe59a16fa,Slot Game,96.74%,,SLL,,
1580541,Mafia Mayhem,c7b3016c70a06ddbb2355a3aee4179d0,Slot Game,96.76%,,SOS,,
1615454,Werewolf's Hunt,2ac70bee7b47c172381e55f7e644d92e,Slot Game,96.75%,,SRD,,
1655268,Tsar Treasures,1eb6a959aadf0491f4a648762d8d262a,Slot Game,96.75%,,SYP,,
1695365,Fortune Dragon,c5435a8a73707a3a8bb4fe8baaaef3d2,Slot Game,96.74%,,SZL,,
1451122,Dragon Hatch 2,910f25689073d17680be453d7ed90ce2,Slot Game,96.76%,,TJS,,
1671262,Gemstones Gold,877c9b2ec1c5e0505129315948f9bbfa,Slot Game,96.71%,,TMT,,
1682240,Cash Mania,c8bbb41367b3971ed3467c2f0c2627a4,Slot Game,96.75%,,TND,,
1508783,Wild Ape #3258,9b93cb0dc46d847864c87ed42a3428bb,Slot Game,96.74%,,TOP,,
1492288,Pinata Wins,f08cc025e23ee049b570517867c74be0,Slot Game,96.75%,,TRY,,
1717688,Mystic Potion,e61bde75d590e943d2c5c6d432b29b46,Slot Game,96.73%,,TTD,,
1623475,Anubis Wrath,c268154a85669eea35aa46387834ac76,Slot Game,96.75%,,TZS,,
1738001,Chicky Run,c3e600005f72f1d1cabe758e206daf57,Gamble Game,96.00%,,UAH,,
1635221,Zombie Outbreak,83b6eceea77859c14426b05480b96c34,Slot Game,96.76%,,TZS,,
1778752,Futebol Fever,314afef87ff2974867234ac317b37f4c,Slot Game,96.73%,,UGX,,
1648578,Shark Bounty,42cf824884f8ecdaf39862c9a15bf1f1,Slot Game,96.73%,,USD,,
1760238,Yakuza Honor,e4772d4ef1de4217915c678d0d1722a8,Slot Game,96.75%,,USDT,,
1747549,Wings of Iguazu,6ae667b26f908e5ebe8976ca334fd472,Slot Game,96.78%,,UYU,,
1727711,Three Crazy Piggies,a197ff914cb04283a02da3b65d8ba705,Slot Game,96.72%,,UZS,,
1815268,Oishi Delights,5af319aeb42d316100789fa1670ed869,Slot Game,96.75%,,VND,,
1755623,Museum Wonders,cb3400447555dbb09ec2fb222e5ae083,Slot Game,96.71%,,VUV,,
1786529,Rio Fantasia,dc242e2abfe13435226e9dbe8865c2ed,Slot Game,96.76%,,WST,,
1702123,Geisha's Revenge,9d9019d51ed9300035a4160d187b2a29,Slot Game,96.81%,,XAF,,
1879752,Fortune Snake,557babad95070382c94d184090133a72,Slot Game,96.75%,,XCD,,
1850016,Incan Wonders,b769cb768fa25699ddb695933bde781a,Slot Game,96.74%,,XOF,,
1799745,Mr. Treasure’s Fortune,8004c0cdbe396264d035b7a4aba58021,Slot Game,96.71%,,XPF,,
1804577,Graffiti Rush,bfe3d243abaa1cc4b23d66909fbf6beb,Slot Game,96.75%,,YER,,
1827457,Doomsday Rampage,52c57d366518d7b6e38e51ca20272584,Slot Game,96.75%,巴西暂不可用,ZAR,,
1881268,Knockout Riches,0f5374a4766f204a6420120dcfecd9e2,Slot Game,96.75%,,ZMW,,
1865521,Dead Man's Riches,20107ddd668c254f68b3a77219051801,Slot Game,96.75%,,THB,,
1666445,Chocolate Deluxe,5d6ec1ea66a6e374a6d618c7d4b814f7,Slot Game,96.76%,,,,
1834850,Jack the Giant Hunter,13109a0d9c012f7f92f192c34a8926bf,Slot Game,96.80%,,,,
1935269,Diner Frenzy Spins,458dc4c4a81223b3616329330009dc25,Slot Game,96.80%,,,,
1897678,Dragon's Treasure Quest,3a5aa3e08fc1ddb4ae99d2fb610174fe,Slot Game,96.76%,,,,
1918451,Galaxy Miner,fa4fe0c5a06d857bae0aaf727fc863f3,Slot Game,96.77%,,,,
1903012,Grimms' Bounty: Hansel & Gretel,ca64648a787f488be41bfffdc8b2f4c5,Slot Game,96.75%,,,,
1971587,Majestic Empire,1c0cb279305d27c79869490bf38eb5be,Slot Game,96.74%,,,,
1929177,Kraken Gold Rush,22b189b05dd3095a12f862d64fe88847,Slot Game,96.75%,,,,
1964781,Pharaoh Royals,a2a051eb7a3b098da94f2849a2c89bb2,Slot,96.76%,,,,
`;

function parseGames(csv:any) {
  const lines = csv.trim().split('\n');
  // Skip the header line
  return lines.slice(1).map((line: any) => {
    const parts = line.split(',');
    return {
      name: parts[1].trim(),
      uid: parts[2].trim(),
      img: ''
    };
  });
}

export const PgSlotArray = parseGames(csvData);
console.log(PgSlotArray);


