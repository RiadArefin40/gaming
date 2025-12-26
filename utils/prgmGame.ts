import { gameImages } from "./gameData";

const csvData = `
code,Game Name,Game UID,Game Type,RTP,Release Date,Remarks,,货币
104,Baccarat Lobby,e58e145313cf8c3a41a2240c1579b735,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",-,,,AED
401,Baccarat 1,7e1886a44af41f33e03903df4d96d9f8,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2020-03-23,,,AFN
404,Baccarat 2,7f648ebed8543261ab954f58d80be69b,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2020-03-23,,,ALL
422f,Baccarat 3,a5eb9a559136ee869dd16bed3cc132fb,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2022-01-12,,下架,AMD
422a4,Baccarat Latino 1,cb7c322bed03b8320a31b44095cf930d,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2025-04-02,"Change from Baccarat 3, Spanish speaking clients only",下架,ANG
422n,Brazilian Baccarat 1,951e3bd15d529a3d0d2e445d8126885d,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2025-03-12,"Change from Baccarat 3, Brazilian speaking clients only",下架,AOA
411,Baccarat 5,593e82ed18fb7d72463dff73110fa52c,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2020-08-12,,,ARS
413,Baccarat 6,80c0d325044a99b88a34f2e315ef1d9e,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2020-08-12,,,AWG
425,Baccarat 7,25a8376a5f822cd62869368510ef307e,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2021-12-02,,,AZN
426b,Turbo Baccarat,0b51fa9dc81ec7e5fe0905812d634419,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2025-03-11,Upgrade from Baccarat 8,,BAM
426a2,Turbo Baccarat Latino 1,4cf67d4ec6792bb3e86ff24e96d7e8e1,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2025-04-02,"Change from Turbo Baccarat, Spanish speaking clients only",下架,BBD
426i,Brazilian Turbo Baccarat 1,5da3a4042912546809633a4422185441,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2025-03-12,"Change from Turbo Baccarat, Brazilian speaking clients only",下架,BDT
436,Baccarat 9,3b657685213b492a9bddb4281a876908,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2023-08-30,,,BGN
402,Speed Baccarat 1,d0d870f20be2bedb04415d5071a5f866,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",,,,BHD
403,Speed Baccarat 2,76463248b7ca723ad49cfad50926c30e,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",,,,BIF
412,Speed Baccarat 3,4102658f5f304e126599367ba6cc13a1,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",,,,BMD
414,Speed Baccarat 5,22517580773f95ed1fccf11222a727f6,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",,,,BND
415,Speed Baccarat 6,0bace5f8418a61a7f6efccabefdb30aa,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",,,,BOB
431,Speed Baccarat 7,eb43ca69904a2d11687774a55a8bd68b,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",,,,BRL
432,Speed Baccarat 8,6b9fde7e0621b2bca3779a162257739b,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",,,,BSD
430,Speed Baccarat 9,47ff0ea2ce1eae047a4e128282acc1b8,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",,,,BTN
428,Speed Baccarat 10,34fad871fa9fec7b1057668360500688,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",,,,BWP
424f,Speed Baccarat 11,eb98b96ee69b8e1d26f458fb6508ae04,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",,,,BYN
421f,Speed Baccarat 12,c17ea744619079ba0385f02648f8d22d,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",,,,BZD
438f,Speed Baccarat 13,3199591c742d1e586446d23ad51afe76,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",,,,CAD
405,Speed Baccarat 14,08965eef9364825b0e4476bf7290c611,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2020-03-23,,,CDF
427b,Speed Baccarat 15,b8b814a4ce5f191c4a818018db607281,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2021-12-02,,,CHF
435,Speed Baccarat 16,ed16a06c9a68f7ccc171fd547fc5bd72,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2023-08-30,,,CLP
439,Speed Baccarat 17,baf9852dbf195a8f79bbea6b33305c99,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2023-08-30,,,COP
427a2,Speed Baccarat Latino 1,6922b4ab4fcf1c45d51a6b3a85f548ae,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2025-04-02,"Change from Speed Baccarat 15, Spanish speaking clients only",下架,CRC
438a1,Speed Baccarat Latino 2,6d8d3e325414a9106778e75473f4856c,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2025-04-02,"Change from Speed Baccarat 13, Spanish speaking clients only",下架,CUP
421a2,Speed Baccarat Latino 3,3e7027156e407b56ceef2bd10a30e9c1,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2025-04-02,"Change from Speed Baccarat 12, Spanish speaking clients only",下架,CVE
424a3,Speed Baccarat Latino 4,262e0194ad1b24a8c778bd223a3119df,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2025-04-02,"Change from Speed Baccarat 11, Spanish speaking clients only",下架,CZK
427n,Brazilian Speed Baccarat 1,d155481e0ce7c4fbaad3fae66ca193f2,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2025-03-12,"Change from Speed Baccarat 15, Brazilian speaking clients only",下架,DJF
438p,Brazilian Speed Baccarat 2,54e73a8f055e59bf360fdea513672454,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2025-03-12,"Change from Speed Baccarat 13, Brazilian speaking clients only",下架,DKK
421w,Brazilian Speed Baccarat 3,7353fa4eeee9e52cdf83956a63a7e242,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2025-03-12,"Change from Speed Baccarat 12, Brazilian speaking clients only",下架,DOP
424v,Brazilian Speed Baccarat 4,f1cc99f718fc90e6d8f6f49b54a49a43,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2025-03-12,"Change from Speed Baccarat 11, Brazilian speaking clients only",下架,DZD
441,Korean Speed Baccarat 1,3f83f390c17e56aaf999480608f7e74b,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2022-12-14,,,EGP
449,Korean Speed Baccarat 2,a96de223a6cb1b7933bf0783b5bb614e,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2023-03-29,,,ERN
459,Korean Speed Baccarat 3,22f71244570f56f20e3f62f329859318,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2023-11-22,,,ETB
460,Korean Speed Baccarat 7,73deeee2bc2a889a286cd4459d9cba02,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2023-11-22,Rename on 2025-04-29,,EUR
476,Korean Speed Baccarat 5,619d1fb3b26a202c6545acbe1841ed3d,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2024-02-28,,,FJD
499,Korean Speed Baccarat 6,48268e48a610c33029cf797d87ebb4e8,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2025-04-23,Reopening,,FKP
477,Korean Turbo Baccarat 1,2099d4989d635d92524cf3499f87f58a,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2025-03-11,Upgrade from Korean Speed Baccarat 6,,GBP
488,Japanese Speed Baccarat 1,2613dd5c8b385fa70fbf4a2678a8981c,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2024-02-21,,,GEL
489,Japanese Speed Baccarat 2,8cc12a57d141fac71ef87357c94c44c3,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2024-02-21,,,GHS
490,Japanese Speed Baccarat 3,15ec6cd193207f3e219e0d185205952f,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2024-03-28,,,GIP
450,Indonesia Speed Baccarat 1,f9590a5f1796c536e78c85b7f9efd405,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2023-12-12,,,GMD
451,Thai Speed Baccarat 1,746e28de8b39898a1a5e436bb39b91f6,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2024-01-24,,,GNF
452,Thai Speed Baccarat 2,687bc54053fbe1ab50561719d46c234e,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2025-01-28,,,GTQ
454,Privé Lounge Baccarat 1,422384b37bffa38f63d24f6d9e098950,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2024-01-17,,,GYD
455,Privé Lounge Baccarat 2,744876957659f5833d4beb0cf9f6787c,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2024-01-17,,,HNL
456,Privé Lounge Baccarat 3,ca0f92bbad03cbcac09140e56a272001,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2024-01-17,,,HTG
458,Privé Lounge Baccarat 5,56634c1f851fcc441b25cabfb904843e,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2024-01-17,,,HUF
466,Privé Lounge Baccarat 6,c5e27c4d01c4973ed505b3935740808a,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2024-06-27,,,IDR
467,Privé Lounge Baccarat 7,0f4593fbf8f16c85dcc5d13455ac1224,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2024-06-27,,,ILS
468,Privé Lounge Baccarat 8,1f3be17a8274456ea0b3b5ce1699c2d7,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2024-06-27,,,INR
457,Privé Lounge Baccarat 9,7cd376336ab4101f48c0c8d44fcbdd81,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2024-10-08,,,IQD
461,Korean Privé Lounge Baccarat,06cf269e870cf6b0a97278c680c93f85,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2025-03-20,,,IRR
433,Super 8 Baccarat,302cf0ef3b36479d4d4f4b57b3560343,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2022-05-25,,,ISK
434,Fortune 6 Baccarat,c20d79035300304273bdfd6fbb227d91,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2022-07-06,,,JMD
442,Mega Baccarat,fc836890aa838e03419a2751af98d0ce,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2023-05-10,,,JOD
481,Chinese Speed Baccarat 1,7065fa8abfbb96b16d87ceb7554503b8,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2024-03-11,,,JPY
482,Chinese Speed Baccarat 2,c8b889832a452aa68115ec1494d8843d,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2024-04-25,,,KES
483,Chinese Speed Baccarat 3,e8d4616742fc5829633d17e117aac18f,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2024-07-02,,,KGS
479,Vietnamese Speed Baccarat 1,4457be7be5a268e8d43747a7af82fec5,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2024-05-14,,,KHR
480,Vietnamese Speed Baccarat 2,95af7c5b659d78ca19a3cc1b5f39a83c,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2025-02-11,,,KMF
484,Vietnamese Speed Baccarat 3,20edd55781b1239427e6f02a6a310463,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2025-03-10,,,KPW
491,Punto Banco Italia Tricolore,0953a894d0e79b4c4a514fc073ef877d,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2024-05-23,,,KRW
851,Squeeze Baccarat 1,4e6ea2bc5ec46aa9d00fa6e056f8867b,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",2025-04-03,,,KWD
102,Roulette Lobby,831d834fbc4f2b343e7cd5fb58eb6300,CasinoLive,"Regular Baccarat game theoretical RTP
Player: 98.94%
Banker: 98.76%
Tie: 85.64%
Side bets theoretical RTP
Either Pair: 86.29%
Perfect Pair: 86.97%
Big: 95.65%
Small: 94.71%
No-Commission Baccarat theoretical RTP
Player: 98.94%
Banker: 98.54%
Tie: 85.64%
Super 6 side bet: 86.18%",-,,,KYD
227,Roulette 1 - Azure,6310a699c52341452fac399be10a2b48,CasinoLive,97.30%,2020-09-09,,,KZT
201,Roulette 2 -  Green,2cc6eafbc10fac25501311627b90e59b,CasinoLive,97.30%,2020-09-24,,,LAK
230a20,Roulette 3 - Ruby,b3ce126267c25045e996424f8a012644,CasinoLive,97.30%,2021-12-07,,,LBP
206,Roulette Macao,bc981c617e610b6b6bdb9092156fb741,CasinoLive,97.30%,2020-03-23,,,LKR
221,Russian Roulette,8ae416822700ec743ab026d918aa76e2,CasinoLive,97.30%,2020-02-11,,,LRD
222,German Roulette,54d923372a1a92b10615557607d3bdc4,CasinoLive,97.30%,2020-02-11,,,LSL
224,Turkish Roulette,286e61fe71b1ab35a427604bff45e4aa,CasinoLive,97.30%,2020-03-10,,,LYD
223,Roulette Italia Tricolore,89e6a326a58724c3d8b56e80dd0497db,CasinoLive,97.30%,2020-02-11,,,MAD
229,Roulette  Indian,93322d58de1175bb2078e473c1ea5757,CasinoLive,97.30%,2021-11-06,Close on 2025-01-31,,MDL
235,Dutch Roulette,f84f7c9220f185c790ba055fef0584e8,CasinoLive,97.30%,2022-06-30,,下架,MGA
233,Romanian Roulette,cf4788eb4b98a4db606f19be2cc92293,CasinoLive,97.30%,2022-07-07,,,MKD
234,Roulette Latina,2c168555600287f0aa10e2185410bebf,CasinoLive,97.30%,2025-06-05,"Upgrade from ""Spanish Roulette""",,MMK
213,Korean Roulette,8cc297adeaa7484459187b88d1289f4e,CasinoLive,97.30%,2023-08-23,,,MNT
237,Brazilian Roulette,877b3c2652fc0cbb8cc1f0ceba928df8,CasinoLive,97.30%,2023-08-30,,,MUR
260,Swedish Roulette,201c85571b7d65f3cf76728e32908148,CasinoLive,97.30%,2023-06-08,Swidish Regulated Market Only,下架,MVR
297,Greek Roulette,0589e93edde9870d60551e4e2aeae37e,CasinoLive,97.30%,2024-11-06,Greek Regulated Market Only,下架,MWK
262,Vietnamese Roulette,3db984189385e4dd7a1695fc8bbaea3c,CasinoLive,97.30%,2024-01-18,,,MXN
951,Indonesian Roulette,b6fcedf3c9f9c3cfcb69256977a59840,CasinoLive,97.30%,2024-12-11,,,MZN
204,Mega Roulette,b60df57bbcd472a887a9c9cff2a0e19c,CasinoLive,97.30%,2021-02-24,2024-04-22 Upgrade,,NAD
287,Mega Roulette - Brazilian,d384d4856e230a106657c59821f8c43a,CasinoLive,97.30%,2024-08-28,,,NGN
208,Turkish Mega Roulette,31b812b939407f0e7971675f306c2f3e,CasinoLive,97.30%,2024-03-14,,,NIO
298,Italian Mega Roulette,f6c5f7daea4c2237f609351834509a94,CasinoLive,97.30%,2024-12-04,,,NOK
225,Auto Roulette,97382290852d66f486270fcbb8a4d33c,CasinoLive,97.30%,2020-04-23,,,NPR
226,Speed Auto Roulette,f0add665a33f9b0440694015268d1d6d,CasinoLive,97.30%,2023-05-03,,,NZD
210,Auto Mega Roulette,a973fbb6b172cca38155523ab540d69f,CasinoLive,97.30%,2023-07-18,,,OMR
203,Speed Roulette 1,1f602196b12c5dfa56b9dd2e94d9abab,CasinoLive,97.30%,2019-09-24,,,PAB
205,Speed Roulette 2,dc4f44b7e7bd3ff918b6008d89598c3f,CasinoLive,97.30%,2019-09-24,,,PEN
211,Lucky 6 Roulette,f2269c8c6428711cecfbcdf33530a90c,CasinoLive,97.30%,2023-10-11,,,PGK
240,PowerUP Roulette,d9a2bfc6b6a88dad99f4fb2c9e56a787,CasinoLive,97.30%,2022-10-12,,,PHP
545,VIP Roulette - The Club,306f8bd0e756fea31ae5c3a0a458dd26,CasinoLive,97.30%,2023-08-02,,,PKR
266,VIP Auto Roulette,491e8650612cfd6e00c86c976da5f3ae,CasinoLive,97.30%,2024-09-25,,,PLN
270,Fortune Roulette,8189b037222a0e3812587e4bdebdf6f6,CasinoLive,97.30%,2025-01-29,,,PYG
292,Immersive Roulette Deluxe,11b298077e1d23836cd28204179eca61,CasinoLive,97.30%,2025-02-19,,,QAR
261,Thai Roulette,befa78fbaf34a24e50a445a3ee83f85d,CasinoLive,97.30%,2025-03-24,,,RON
28401,French Roulette,6f007f883359289806f7a25503be1141,CasinoLive,97.30%,2025-05-27,,,RSD
28201,Privé Lounge Roulette,1d08d4f0e9514c902bb7cf633321afb4,CasinoLive,97.30%,2025-06-24,,下架,RUB
950,American Roulette,f8810130607b6b5b2bdbb91463ae0fdd,CasinoLive,94.74%,2025-03-05,,,RWF
105,Game Shows Lobby,1d93109e3e25654e679f911c60b4414b,CasinoLive,,-,,,SAR
1401,Boom City,4eca0516b36cf28b4a3a66c7f3af284f,CasinoLive,93.49% - 96.21%,2022-07-27,,,SBD
1101,Sweet Bonanza Candyland,89a12f80c6dc0aa7651400364e8f5e80,CasinoLive,91.59% - 96.95%,2021-11-24,,,SCR
801,Mega Wheel,e18b53fffb12388f9e3cbe9895ca82f1,CasinoLive,96.50% - 96.51%,2020-11-11,,,SDG
1601,Snakes & Ladders Live,03a00a10ccd01b5424bc988c3648776a,CasinoLive,96.46% - 96.66%,2024-06-20,New and improved,,SEK
1701,Treasure Island,9a7ccf5d0e8862eaf13a0f3c18807cd2,CasinoLive,96.51% - 96.55%,2024-11-07,New and improved,,SHP
1501,The Bingo Spot,8b439fcc22a0f30dd282dcfc0072c0bc,CasinoLive,95.03% - 95.97%,2023-07-26,,,SLL
4001,Super Trunfo (Football Blitz Top Card),950e9141d10bb5528012e84f1d8bbff8,CasinoLive,87.49% - 96.27%,2024-04-30,,,SOS
107,Mega Sic Bo Lobby,af022dc4300f7c55ebdaf559688115d9,CasinoLive,97.22%,-,,,SRD
711,Sic Bo,ac5c6c0d1f5c046ca401375bb3388265,CasinoLive,97.22%,2023-10-18,,下架,SYP
701,Mega Sic Bo,96682117485be3f7551db8fd70f87c73,CasinoLive,97.22%,2020-07-14,,,SZL
2101,Mega Sic Bac,8152838110b3d0b988236c9b94db8f78,CasinoLive,97.22%,2024-07-03,,,TJS
108,Dragon Tiger Lobby,75776a4167b0616cec63966d3877ff22,CasinoLive,96.27%,-,,,TMT
1001,Dragon Tiger,43473f00e237b4d8754d22095d701b4c,CasinoLive,96.27%,2021-04-28,,,TND
2701,Casino Hold’em,5b7cd53d358874a31116a5080ce6a8fe,CasinoLive,"Ante (Initial Bet): 97.84%
 Ante (Total Bet): 99.18%
 Jackpot: 94.04%
 AA+: 93.74%",2025-06-18,,下架,TOP
1024,Andar Bahar,9412795579b89bdee57f00ee2d301a22,CasinoLive,92.97% - 98.10%,2021-10-06,,,TRY
103,Blackjack Lobby,f86cec4da2d8d7595abd84b4498af5e3,CasinoLive,,-,,下架,TTD
901,One Blackjack,d123ad1b85006f4d5a5f3f26a81d722b,CasinoLive,99.28%,2021-03-03,,,TZS
902a9,ONE Blackjack 2 - Ruby,f7821ef4d27448883986e2ddd00a00ca,CasinoLive,99.28%,2021-03-03,,仅面向土耳其市场。,UAH
903,Dutch ONE Blackjack,aa169b49b583a2b5af89203c2b78c67c,CasinoLive,99.28%,2021-03-03,Dutch Regulated Market Only,20250208,UGX
904,Turkish ONE Blackjack,f47d0ad31c4c49061b9e505593e3db98,CasinoLive,99.28%,2021-03-03,,,USD
906,Brazilian ONE Blackjack,e88c3138de3cddcc43c9de3237eada5f,CasinoLive,99.28%,2024-11-05,,,USDT
912,Bet Behind Pro Blackjack ,82b9e0d3bcaaf66cff008cc4618c40fd,CasinoLive,99.28%,2024-10-09,,,UYU
521,Blackjack 17 - Azure,91d0432f60cd300de21a2e6208dac5b7,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2021-06-03,,下架,UZS
522,Blackjack 18 - Azure,055cb22758a5228225765870963b710a,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2021-06-03,,下架,VND
523,Blackjack 19 - Azure,6839a114fa9e9f8ac2bfcb9fba206465,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2021-06-03,,下架,VUV
524,Blackjack 20 - Azure,3b1ca946e70290892f421525da403ccc,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2021-06-03,,下架,WST
525,Blackjack 21 - Azure,58b5741e665021610fa5a77ad44815fa,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2021-06-03,,下架,XAF
526,Blackjack 22 - Azure,e1b6a6ff63ca3bc82a6e41b26e81b9b5,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2021-06-24,,下架,XCD
527,Blackjack 23 - Azure,552d3088b31c970afdfee48494e25e48,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2021-06-24,,下架,XOF
528,Blackjack 24 - Azure,a8b5904ad0d4cb6e6191cb08bb5d6349,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2021-06-24,,下架,XPF
529,Blackjack 25 - Azure,a1291f4da9452c9c6957be507820744d,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2021-06-24,,下架,YER
530,Blackjack 26 - Azure,a79ab346c31da793864ef368898ad544,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2021-06-24,,下架,ZAR
539,Blackjack 27 - Azure,8389ccc15a79c612c8a592f40479ecff,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2021-07-29,,下架,ZMW
538,Blackjack 28 - Azure,735c251edfb00f174c55a3d89694dcad,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2021-07-29,,下架,
537,Blackjack 29 - Azure,628aedd1ecdcf2eb02571166ebbeaa34,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2021-07-29,,下架,
536,Blackjack 30 - Azure,01656d94c8b88ecd2301f1e75e997dd2,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2021-07-29,,下架,
535,Blackjack 31 - Azure,9f32e166bd21a96c40c40bb218159bde,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2021-07-29,,下架,黑色背景的是需要额外付费的二十一点桌位，要么是受监管的国家/地区桌位
540,Blackjack 32 - Azure,69a2445fd1a4c4fdfd8b883c289c1b09,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2021-08-19,,下架,
511,Blackjack 3 - Azure,415de32b6fc7d584fdaebfa3edbe8e5b,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",,,下架,
512,Blackjack 6 - Azure,527eb5e3845373717a210c385b25156a,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",,,下架,
513,Blackjack 7 - Azure,fe39013013d0d6b9597b9b10bbf8d5f5,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",,,下架,
514,Blackjack 4 - Azure,4c7f6a64b44ba0284750a8b903048871,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",,,下架,
515,Blackjack 1 - Azure,29ca2281e7447b3face375aedcaa3397,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2020-09-23,,下架,
516,Blackjack 9 - Azure,8ffc3a97e95397ca4f28525dda788233,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2020-09-23,,下架,
517,Blackjack 10 - Azure,ca58c5b1cdb54c3e3db03d89d9579fff,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2020-09-09,,下架,
518,Blackjack 5 - Azure,c01bbc8ad855b4b4c84e2dfcff729e8e,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2020-09-23,,下架,
519,Blackjack 2 - Azure,fdb638c7581e34cc1b5966903bb93503,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2020-09-23,,下架,
520,Blackjack 8 - Azure,f851aa0e72778c72d8131d510f2a958f,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2020-11-01,,下架,
301,Blackjack 11,58d23bbe6844fc3aa643655108f67487,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",,,下架,
302,Blackjack 12,136f520268917391dcdd9133719def8f,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",,,下架,
303,Blackjack 14,9ac649ab5d0eb75d27cedba2d6cad415,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",,,下架,
304,Blackjack 15,90bc12916b442ab46ad299bd119d6ab4,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",,,下架,
305,Blackjack 16,8f5a6244fe71970797ea363040ea0e1b,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",,,下架,
541,Blackjack 33 - The Club,567907a58023cc249b189386d0648162,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2021-11-15,,下架,
542,Blackjack 34 - The Club,7a6f4f0f5275985a95b55eb73b87ef27,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2021-11-15,,下架,
543,Blackjack 35 - The Club,d78d2727b15b1e59ef581c9346d1a7f9,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2021-11-15,,下架,
544,Blackjack 36 - The Club,5a9078434d4abe675a40aa33a5308935,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2021-11-15,,下架,
562,Blackjack 37 - Ruby,1fec32f21f1b1f51dbc59d1e375d4c39,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2022-02-16,,下架,
563,Blackjack 38 - Ruby,84f77a894a99f6513c01c9c15127f8cf,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2022-02-16,,下架,
564,Blackjack 39 - Ruby,aa8978f442ba04335faee18ff2ccf78e,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2022-02-16,,下架,
565,Blackjack 40 - Ruby,b8a5030b7d59d4bc616e0bd783933a49,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2022-02-16,,下架,
555,Blackjack 41 - Ruby,290b36d0bf03a2f4a953fb209f903173,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2022-02-16,,下架,
556,Blackjack 42 - Ruby,7603303ed9ca045c4eb216a49139e698,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2022-02-16,,下架,
557,Blackjack 43 - Ruby,96fd53d40cd66653fa950944db74bb7b,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2022-02-16,,下架,
558,Blackjack 44 - Ruby,eaf2a8428aa8dce45d8eca3512c30cf0,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2022-02-16,,下架,
559,Blackjack 45 - Ruby,8cba287be667414b19e29919dec9d82a,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2022-02-16,,下架,
560,Blackjack 46 - Ruby,dedc4397f5ea230966890a3ae6e8182f,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2022-02-16,,下架,
561,Blackjack 47 - Ruby,ff06cae56d513a8dad8c78956b7a091d,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2022-02-16,,下架,
551,Blackjack 48 - Ruby,e57bb770a9fb68a3770c728387cdf59c,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2022-02-16,,下架,
552,Blackjack 49 - Ruby,6f453a97246c07a84a28bdcd0c3170a1,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2022-02-16,,下架,
553,Blackjack 50 - Ruby,5e50d2591c8d018bbd9692938dedaa42,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2022-02-16,,下架,
554,Blackjack 51 - Ruby,1e733ddde18fa2601903a9973687355c,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2022-02-16,,下架,
594,Blackjack 52 - Ruby,29d4a561a49a5bee4621ce5461f252bb,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2022-11-30,,下架,
595,Blackjack 53 - Ruby,f7b2f188afc8d856b59ba75150bcc040,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2022-11-30,,下架,
596,Blackjack 54 - Ruby,b9018dbbed0f5d5825ba7510f0560f6c,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2022-11-30,,下架,
597,Blackjack 55 - Ruby,581c803de6edcde127bb2d2943063b35,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2022-11-30,,下架,
593,Blackjack 56 - Ruby,d42ae55252b2f07aaa9fd4c6c00506b3,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2022-11-30,,下架,
598,Blackjack 57 - Azure,c4bc3b17f09e816972d4626795855090,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2023-01-24,,下架,
599,Blackjack 58 - Azure,af7496565c99cb9d235ea3e9a294397e,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2023-01-24,,下架,
600,Blackjack 59 - Azure,37ec0a5173cb60a45fa68a23e885df25,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2023-01-24,,下架,
601,Blackjack 60 - Azure,211d46f91206b166d786cb3ee2586cb7,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2023-01-24,,下架,
602,Blackjack 61 - Azure,5d2f76a9535ba2be2dd45efef3b59686,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2023-01-24,,下架,
603,Blackjack 62 - Azure,338747b1f48c13477f2dc2ac7432f360,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2023-01-24,,下架,
590,Blackjack 63 - Azure,c85d151f106004b3860e26cd43e44e21,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2023-01-24,,下架,
730,Blackjack 75 - Azure,1ec3bbb2e41bebde37d77fe45d0c31a3,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2024-01-31,,下架,
731,Blackjack 76 - Azure,0c8469a7cf283d5554f850437815e54a,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2024-01-31,,下架,
620,Blackjack 64 - Ruby,6773baab3310a1a62c0bcb0f2bb87ef8,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2023-03-30,,下架,
621,Blackjack 65 - Ruby,3cb2b440463621c679db6fd904240d06,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2023-03-30,,下架,
626,Blackjack 70 - Ruby,a9dddc85b6a550879d3cdeda2e1dcefb,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2023-03-30,,下架,
616,Blackjack 71 - Ruby,905c3e86a2deb62ee750242d03cf60dc,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2023-04-26,,下架,
617,Blackjack 72 - Ruby,eb2e33f5d45d79b8221138c50f85e656,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2023-04-26,,下架,
618,Blackjack 73 - Ruby,e549701764ef66fc2291f867f664525f,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2023-04-26,,下架,
619,Blackjack 74 - Ruby,815150b7af997abeec52f97ac046385c,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2023-04-26,,下架,
569,Blackjack 77 - Ruby,7b79254291e698861e360a79aa5f8c6d,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2024-01-31,,下架,
570,Blackjack 78 - Ruby,6b5c9d3f7a46e88ce266e4c71faaedf7,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2024-01-31,,下架,
676,Blackjack 79 - Emerald,3a49b5d0953f31b0dd7cb70a26964de5,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2024-03-21,,下架,
677,Blackjack 80 - Emerald,c6263bdb4528b30a05d0a982ea0b7641,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2024-03-21,,下架,
678,Blackjack 81 - Emerald,356c141eab19102d8953d3f5f6f8cf34,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2024-03-21,,下架,
673,Blackjack 82 - Emerald,ef00dd8e0699f0e786c6b57d6ade7e13,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2024-04-10,,下架,
674,Blackjack 83 - Emerald,95d7bab3f6cf28e13eb8038166c50e9d,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2024-04-10,,下架,
675,Blackjack 84 - Emerald,18f85b652e631a15b295fc385bf7ff68,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2024-04-10,,下架,
683,Blackjack 85 - Emerald,d7996188e2850c5a7f545ab8bb2cba16,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2024-05-29,,下架,
369,Blackjack 86 - Ruby,f8f951f2a23056348bff0d096be5f4cf,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2024-07-01,,下架,
776,Blackjack 87 - Emerald,766441c99ec109905079a4355fd9998a,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2024-07-04,,下架,
777,Blackjack 88 - Emerald,83c6742f0d93a564a76aeeb34f3dbcd9,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2024-07-04,,下架,
778,Blackjack 89 - Emerald,507da655e80e2b951a848303be2f7cc8,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2024-07-04,,下架,
767,Blackjack 90 - Azure,e229a2881c6739d975bf64e286a217a2,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2024-07-04,,下架,
768,Blackjack 91 - Azure,aa177f91b10bce3c9b4b10dd5a8a4203,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2024-07-04,,下架,
769,Blackjack 92 - Azure,6356c708f3460df985f3140a76112596,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2024-07-04,,下架,
771,Blackjack 93 - Azure,ca683afa7f94dce7037bd62147ba11a4,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2024-07-04,,下架,
694,Blackjack 94 - Emerald,7ce5d783bb279180d63c99e6293411af,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2024-07-31,,下架,
696,Blackjack 95 - Emerald,1f21a96bc31a34be97530d97da567952,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2024-07-31,,下架,
697,Blackjack 96 - Emerald,b594feb76196752c016d0c876f29ea6d,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2024-07-31,,下架,
787,Blackjack 97 - Azure,365a2c37c3cec3974d1a4fa39f7fa58b,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2024-07-31,,下架,
789,Blackjack 98 - Azure,4958c988a861ccf8e9dc6d1510efde71,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2024-07-31,,下架,
790,Blackjack 99 - Azure,f1e714167e4b8dcd29883234bc094837,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2024-07-31,,下架,
791,Blackjack 100 - Azure,36527b874180fc201bd9c845425c67ea,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2024-07-31,,下架,
792,Blackjack 101 - Azure,b5b4fc0925ae0388072e7bc9af45a983,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2024-07-31,,下架,
372,Blackjack 102 - Emerald,f84c284fdd7757593812131e3cbd36d0,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2024-09-04,,下架,
373,Blackjack 103 - Emerald,c2d05fa71c564aa289106bc4fc8b7d51,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2024-09-04,,下架,
374,Blackjack 104 - Emerald,178b7a3e473967f4034741fd00cb4bef,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2024-09-04,,下架,
375,Blackjack 105 - Emerald,09e8e2704e33f5293e993cf3381f81a1,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2024-09-04,,下架,
376,Blackjack 106 - Emerald,9a8641c76b864c24f189fc4f4b93b494,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2024-09-04,,下架,
689,Blackjack 107 - Emerald,47decc034239ef7d06f451b2429d9c70,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2024-09-04,,下架,
698,Blackjack 108 - Emerald,66497efdc438459f78e18da5c5524215,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2024-09-04,,下架,
650,Blackjack 109,adc3e08ae26db0da5e2c9962a344b031,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2024-10-03,,下架,
651,Blackjack 110,09b75a2e42d9102bea4146a9ec26aae7,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2024-10-03,,下架,
652,Blackjack 111,74bc3508f609b932764ab778cafdc9b6,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2024-10-03,,下架,
325,Blackjack 112,3e66ec38bd579523b32ded576ee2fe3b,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2024-10-03,,下架,
326,Blackjack 113,78b8a690699b6f0d6c0ce65a186c4287,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2024-10-03,,下架,
327,Blackjack 114,6505eab8899b20850f3c92e13a85aa50,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2024-10-03,,下架,
667,Blackjack 115,63c9f0beda0efbd918091cb06a120126,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2025-03-03,,下架,
668,Blackjack 116,e99ad361c428381a264548673e18a494,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2025-03-03,,下架,
669,Blackjack 117,506b950a11f79f7fe8d00d06704d263b,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2025-03-03,,下架,
670,Blackjack 118,cad90067dfb1d9b72d4d6b4ee7964a40,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2025-03-03,,下架,
726,Blackjack 119,791c5fc4d12440b06e2a995fc7bb099f,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2025-03-03,,下架,
346,Blackjack 120,88c89110ca466bc6522b4859616c151f,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2025-03-03,,下架,
727,Blackjack 121,133c038dce7307e439fb29433ca38db8,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2025-03-03,,下架,
728,Blackjack 122,60e87b40824f68c031ad43da176f6c38,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2025-03-03,,下架,
729,Blackjack 123,cf73bc9a57a93506c69eaf59f4b63905,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2025-03-03,,下架,
732,Blackjack 124,316317b15826c7f43ae98c0d9bc8cc4a,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2025-03-03,,下架,
733,Blackjack 125,262d8c66c57ad13ce28103db775f5dbe,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2025-03-03,,下架,
347,Blackjack 126,492fe55f51e33e5b0a90fdc2f8bb987d,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2025-03-03,,下架,
931,Blackjack 127,0d85b7c5436dd9b828bc79c994d36355,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2025-04-24,,下架,
932,Blackjack 128,20d877882943cb0828016665c388d201,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2025-04-24,,下架,
933,Blackjack 129,274c87f105c6c52b00b07e2bd60aa60b,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2025-04-24,,下架,
1155,Blackjack 130,4c1e422ff83258dc4704202db25b843a,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2025-04-24,,下架,
1157,Blackjack 131,f1f20e5e19221317eed3fd8db3c899b9,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2025-04-24,,下架,
1153,Blackjack 132,0e82e3c5da3f04947ca44b7af3986ea3,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2025-04-24,,下架,
1154,Blackjack 133,d5f5a7965b4015b3d9b6196ff5b6244d,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2025-04-24,,下架,
1156,Blackjack 134,9ef64d9fb8a66286ce38516eed496461,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2025-04-24,,下架,
687,Blackjack 135,92156a92bd82a565098d5df39e5e1797,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2025-04-10,Switch from Speed Blackjack 33 to regular,下架,
684,Blackjack 136,76c69459691bbedbb18e81278c496479,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2025-04-10,Switch from Speed Blackjack 36 to regular,下架,
685,Blackjack 137,2f0ae5b92e05d4b06f9eb0e5ba0f4e3d,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2025-04-10,Switch from Speed Blackjack 37 to regular,下架,
691,Blackjack 138,6af0bf63864b34a29e724c9dd5b670e9,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2025-04-10,Switch from Speed Blackjack 48 to regular,下架,
692,Blackjack 139,8f6d51052aa6edc726b4d4f935b10a96,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2025-04-10,Switch from Speed Blackjack 49 to regular,下架,
693,Blackjack 140,36b43fd1dcade9472d685bcfbc3c447c,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2025-04-10,Switch from Speed Blackjack 50 to regular,下架,
329,Blackjack 141,40780825ff1af74fe50b5a4616d08468,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2025-04-10,Switch from Speed Blackjack 63 to regular,下架,
331,Blackjack 142,9a79efca4e39d8f26fca5cdd60037743,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2025-04-10,Switch from Speed Blackjack 65 to regular,下架,
322,Turkish Blackjack 1,f7c5a83bbc44ce2243da13af0aa42c44,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2023-08-16,Turkish market only,下架,
766,Turkish Blackjack 2,9f6d054c487916fbd880f1296eff9ca7,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2024-06-18,Turkish market only,下架,
765,Turkish Blackjack 3,ae598a43de8d5becb71920e089cb05b6,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2024-09-23,Turkish market only,下架,
335,Turkish Blackjack 4,3cc7fd808a9a26d9710c5658a524a0cf,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2024-10-24,Turkish market only,下架,
1152,Turkish Privé Lounge Blackjack,52b7ead1fb813542a32cd1af7400561d,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2025-06-19,Turkish market only,下架,
382,Brazilian Blackjack 1,6b95a7cdedaa0c1225dd17efdcd5f214,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2025-02-13,Brazilian market only,下架,
384,Brazilian Blackjack 2,667347edf3393171a4d74cf139c214bb,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2025-02-13,Brazilian market only,下架,
546,VIP Blackjack 1 - Ruby,2e0f09f130bacd981aca5b1cf262d8e8,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2022-02-23,,下架,
547,VIP Blackjack 2 - Ruby,199450eaf48946ad346fcad571297d43,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2022-03-30,,下架,
548,VIP Blackjack 3 - Ruby,ebe48446f68364d83f8fd09ed8ca0d31,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2022-03-30,,下架,
549,VIP Blackjack 4 - Ruby,bf6e45492d2119049ea91c3dc2e14133,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2022-03-30,,下架,
550,VIP Blackjack 5 - Ruby,98c2177b5e1319e15f0cf6259d7edb53,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2022-03-30,,下架,
662,VIP Blackjack 6 - Emerald,90a4ace57f8d1a84d42359a6c0f09511,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2023-06-14,,下架,
663,VIP Blackjack 7- Emerald,c8af0ca1c551ccb92ede18bb3b45dac3,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2023-06-14,,下架,
664,VIP Blackjack 8 - Emerald,e32ff20a9c349a31daa879c9ca2cf47c,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2023-06-14,,下架,
622,VIP Blackjack 9 - Ruby,e6d7fc7fe63b08d2f37553c1d0810828,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2023-08-18,,下架,
623,VIP Blackjack 10 - Ruby,c50274b8e8b4a78c73f7b4c8a87bbc82,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2023-08-18,,下架,
624,VIP Blackjack 11 - Ruby,5ca79feba16dcc629d549b9aa97ea336,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2023-08-18,,下架,
625,VIP Blackjack 12 - Ruby,9dabd1f0fb07bdfe00e58a9f6660dc64,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2023-08-18,,下架,
671,VIP Blackjack 13 - Emerald,e3e9c37207c871150d67978f737621b7,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2024-03-21,,下架,
672,VIP Blackjack 14 - Emerald,a0ff51f9b994c97d5e807430bc2f6062,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2024-03-21,,下架,
355,Romanian VIP Blackjack 1,22cd92eb2804b733bb88111946684f20,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2023-10-25,,下架,
385,Brazilian VIP Blackjack 1,4ada862fb271db5ab3a5842bae9cfe81,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2025-02-13,Brazilian market only,下架,
721,Privé Lounge Blackjack 1,5b9a81d95a47601ed39b401521d397da,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2023-08-02,,下架,
722,Privé Lounge Blackjack 2,53ca053f408ad6db1c03bbb5001e5b4d,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2023-08-02,,下架,
723,Privé Lounge Blackjack 3,99cc4a7ece8ba5bede61842e71805617,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2023-08-02,,下架,
724,Privé Lounge Blackjack 4,72c5f7167452879b8622fff2fe98a58b,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2023-08-02,,下架,
725,Privé Lounge Blackjack 5,3196f2781d9f764e6b4baba310977bde,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2023-08-02,,下架,
747,Privé Lounge Blackjack 6,573701b8d62542b719f27aceb9d44f38,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2024-04-15,,下架,
748,Privé Lounge Blackjack 7,cb7d038980fd70c2afc869922b0f8190,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2024-04-15,,下架,
749,Privé Lounge Blackjack 8,511afb59e83b2497239408f729dfd722,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2024-04-15,,下架,
750,Privé Lounge Blackjack 9,77ed97a4efa44355908e037678161dde,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2024-04-15,,下架,
751,Privé Lounge Blackjack 10,7ab5248f9affec6a68a3ffbb39fdcd92,CasinoLive,"Blackjack game: 99.28%
 Perfect Pairs: 95.90%
 21+3: 96.30%",2024-04-15,,下架,
566,Speed Blackjack 1 - Ruby,2a844a3331ef745d6090cf47e4c22b66,CasinoLive,99.59%,,,下架,
567,Speed Blackjack 2 - Ruby,e96fd2d5b290ca64aa53b08d10bdd84f,CasinoLive,99.59%,2022-06-01,,下架,
568,Speed Blackjack 3 - Ruby,70f38d6dbf3ce74a47623d0ddc43eda8,CasinoLive,99.59%,2022-05-04,,下架,
591,Speed Blackjack 6 - Ruby,392f717ea9796f860a47929c6ff212fc,CasinoLive,99.59%,2023-01-24,,下架,
592,Speed Blackjack 7 - Ruby,2c9ae5efe538c55ed806330eca464125,CasinoLive,99.59%,2023-01-24,,下架,
604,Speed Blackjack 8 - Ruby,0efc93a33010fe09a36368c5abf4c606,CasinoLive,99.59%,2023-01-24,,下架,
605,Speed Blackjack 9 - Ruby,a30a83782ba40ceb25c2b4aedc09fb51,CasinoLive,99.59%,2023-01-24,,下架,
606,Speed Blackjack 10 - Ruby,f9ec89dc6ea497087fe62d0e416fbc4b,CasinoLive,99.59%,2023-01-24,,下架,
607,Speed Blackjack 11 - Azure,08d7e07c4180caf4dabfbf875b365445,CasinoLive,99.59%,2023-01-24,,下架,
608,Speed Blackjack 12 - Azure,59b21b0c4d50ecc046a94754e2348ebe,CasinoLive,99.59%,2023-01-24,,下架,
609,Speed Blackjack 14 - Azure,62060015742b1a450f01b5601ae79c3d,CasinoLive,99.59%,2023-04-26,,下架,
612,Speed Blackjack 15 - Ruby,b3635e0ac1a77fc2d693dcec65291eef,CasinoLive,99.59%,2023-04-26,,下架,
613,Speed Blackjack 16 - Ruby,2fc67894d892e8ac1001fa14e1ec7f84,CasinoLive,99.59%,2023-04-26,,下架,
614,Speed Blackjack 17 - Ruby,383d754caf92c613a3e2ab8cbbebebbb,CasinoLive,99.59%,2023-04-26,,下架,
615,Speed Blackjack 18 - Ruby,aaf5c1c39485f11d13919cf10f65c716,CasinoLive,99.59%,2023-04-26,,下架,
658,Speed Blackjack 19 - Emerald,e42cc9ffb2b2b947476e65d890ab08a7,CasinoLive,99.59%,2023-06-14,,下架,
659,Speed Blackjack 20 - Emerald,82799e031f36dddf002a831e8e0da575,CasinoLive,99.59%,2023-06-14,,下架,
660,Speed Blackjack 21 - Emerald,80cf04da18316330e1b6dc932949f8cd,CasinoLive,99.59%,2023-06-14,,下架,
661,Speed Blackjack 22 - Emerald,08b7c467f1cd9690235074891c57d5e4,CasinoLive,99.59%,2023-06-14,,下架,
333,Turkish Speed Blackjack 3,e070f03865c17197ecf6dd4759ebb7e6,CasinoLive,99.59%,2024-10-24,Turkish market only,下架,
764,Turkish Speed Blackjack 2,f41831eb20465b6382b7f75b1516f790,CasinoLive,99.59%,2024-06-18,Turkish market only,下架,
321,Turkish Speed Blackjack 1,3cbea87e3977c3db6830a10cc0922a8f,CasinoLive,99.59%,2023-08-16,Turkish market only,下架,
641,Speed Blackjack 24 - Emerald,c644d11694349ef8ef32f0bf51e36c8e,CasinoLive,99.59%,2023-08-09,,下架,
642,Speed Blackjack 25 - Emerald,93825b206758f9b389a33a5bcef62be6,CasinoLive,99.59%,2023-08-09,,下架,
643,Speed Blackjack 26 - Emerald,826e4c066a555f4533f1884d40a22799,CasinoLive,99.59%,2023-08-09,,下架,
644,Speed Blackjack 27 - Emerald,f3b6d567d613b2307f621597349a8ed7,CasinoLive,99.59%,2023-08-09,,下架,
645,Speed Blackjack 28 - Emerald,7005cac3a79eb72c0f9b6ca2fc507d08,CasinoLive,99.59%,2023-08-09,,下架,
646,Speed Blackjack 29 - Emerald,c4752d57124fd509506cb7561862e60b,CasinoLive,99.59%,2023-08-09,,下架,
647,Speed Blackjack 30 - Emerald,e880ab67fc9bb7cf775e3d4c494b1bbd,CasinoLive,99.59%,2023-08-09,,下架,
681,Speed Blackjack 31 - Emerald,7dbe436b1be09b0e248a957d48a5efec,CasinoLive,99.59%,2024-05-29,,下架,
682,Speed Blackjack 32 - Emerald,f51ccb0dbc92bebf2c2f85459337283e,CasinoLive,99.59%,2024-05-29,,下架,
688,Speed Blackjack 34 - Emerald,1815d8f1ebc8a3935cb0ae393ba2bafe,CasinoLive,99.59%,2024-05-29,,下架,
686,Speed Blackjack 35 - Emerald,514827182897bc05df776ef03700c0d9,CasinoLive,99.59%,2024-05-29,,下架,
370,Speed Blackjack 38 - Ruby,b0fd1d14762db8ef35ae3e224f78a0e3,CasinoLive,99.59%,2024-07-01,,下架,
371,Speed Blackjack 39 - Ruby,322fd1a7b4dbb999f99f529cd0eeb739,CasinoLive,99.59%,2024-07-01,,下架,
779,Speed Blackjack 40 - Emerald,ce80e5df4dee18c498093918099a8022,CasinoLive,99.59%,2024-07-04,,下架,
780,Speed Blackjack 41 - Emerald,28a6b277b5a66dfa29d437c3dc002ee5,CasinoLive,99.59%,2024-07-04,,下架,
781,Speed Blackjack 42 - Emerald,ee1fcd8c0328924f4d8ac918ae717e74,CasinoLive,99.59%,2024-07-04,,下架,
770,Speed Blackjack 43 - Azure,4ff2fafdef69ffd9e1e18dfd4cb6296b,CasinoLive,99.59%,2024-07-04,,下架,
772,Speed Blackjack 44 - Azure,ee4d8cb5e4e580e877063ef1c53809ee,CasinoLive,99.59%,2024-07-04,,下架,
773,Speed Blackjack 45 - Azure,864e0afa320068a73b4414f0da9b77a2,CasinoLive,99.59%,2024-07-04,,下架,
774,Speed Blackjack 46 - Azure,9e726ba28eed43667448a7babb0bfb05,CasinoLive,99.59%,2024-07-04,,下架,
775,Speed Blackjack 47 - Azure,73984a421f0732077d27ccedca872d8f,CasinoLive,99.59%,2024-07-04,,下架,
788,Speed Blackjack 51 - Azure,492cb5736927fad39daacc17db222989,CasinoLive,99.59%,2024-07-31,,下架,
784,Speed Blackjack 52 - Azure,4810929da3aab0311574776e972abeee,CasinoLive,99.59%,2024-07-31,,下架,
785,Speed Blackjack 53 - Azure,4ef8506602e8c4eebd87bf42b0e8f60f,CasinoLive,99.59%,2024-07-31,,下架,
786,Speed Blackjack 54 - Azure,0a38edd4414ea1855387fe7ad4c73fe7,CasinoLive,99.59%,2024-07-31,,下架,
377,Speed Blackjack 55 - Emerald,862a8689b959cc7b82a7b28cb6efcb85,CasinoLive,99.59%,2024-09-04,,下架,
378,Speed Blackjack 56 - Emerald,ee3d9d1b704c1abbcdb845b2cb282d10,CasinoLive,99.59%,2024-09-04,,下架,
379,Speed Blackjack 57 -  Emerald,009ac64b70e9c672a3d48dc758432ae4,CasinoLive,99.59%,2024-09-04,,下架,
380,Speed Blackjack 58 - Emerald,a5d3b6ce6c460bba8ca1f9f7e3cd94f1,CasinoLive,99.59%,2024-09-04,,下架,
381,Speed Blackjack 59 - Emerald,b269caed186329c3978e2025562df18a,CasinoLive,99.59%,2024-09-04,,下架,
690,Speed Blackjack 60 - Emerald,6e8b85fdeac8797345ac90841ede19b3,CasinoLive,99.59%,2024-09-04,,下架,
695,Speed Blackjack 61 - Emerald,26bbdb270e23a564fb035c3ecc1fcf59,CasinoLive,99.59%,2024-09-04,,下架,
328,Speed Blackjack 62,351468d6871ef3c2e0d0639bbce1eb27,CasinoLive,99.59%,2024-10-03,,下架,
330,Speed Blackjack 64,ad7905d3b0fd57247a08548130834389,CasinoLive,99.59%,2024-10-03,,下架,
332,Speed Blackjack 66,13e225cd3f5b5696dadb0c4a55d79686,CasinoLive,99.59%,2024-10-03,,下架,
3001,Blackjack X 1 - Azure,a92a531d389c718b5f5f82cfc2448e39,CasinoLive,99.28%,2024-03-06,,,
3002,Blackjack X 2 - Azure,5b59af29c7164779f449311554225daf,CasinoLive,99.28%,2024-03-06,,,
3003,Blackjack X 3 - Azure,eb28ac23ccd830d067728173c1f91ee6,CasinoLive,99.28%,2024-03-06,,,
3004,Blackjack X 4 - Ruby,49bba35a57238c3b51d09819045dff93,CasinoLive,99.28%,2024-03-06,,,
3005,Blackjack X 5 - Ruby,1a98b36378f464b523aa55f335056e47,CasinoLive,99.28%,2024-03-06,,,
3006,Blackjack X 6 - Azure,1366abf4bb64ddf7937affa23f859026,CasinoLive,99.28%,2024-03-13,,,
3007,Blackjack X 7- Azure,d64c9a0d9886af9532f70aaa53e622b3,CasinoLive,99.28%,2024-03-13,,,
3008,Blackjack X 8 - Ruby,ae96e109c6ebb6b93a5f89c5a61bbfda,CasinoLive,99.28%,2024-03-13,,,
3009,Blackjack X 9 - Ruby,4c31c4ff5031d8f7ea19b58d7deea2ae,CasinoLive,99.28%,2024-03-13,,,
3010,Blackjack X 10 - Ruby,396319990608a705114e00847b316d1b,CasinoLive,99.28%,2024-03-13,,,
3046,BlackjackX 11 - Emerald,c730a004b714edfdd4f0c42e9e81fd23,CasinoLive,99.28%,2024-04-18,,,
3047,BlackjackX 12 - Emerald,4145dd9cf243e0b897d79df58fdf67e1,CasinoLive,99.28%,2024-04-18,,,
3048,BlackjackX 13 - Emerald,e1223c4465b2ecfebdafcdbb065b5707,CasinoLive,99.28%,2024-04-18,,,
3014,Blackjack X 14 - Ruby,420b9b1546097c64bb6ee29f74604712,CasinoLive,99.28%,2024-03-13,,下架,
3015,Blackjack X 15 - Ruby,a0ee8dc9da394e4b9ae9ad5c9ea1e722,CasinoLive,99.28%,2024-03-13,,,
3016,Blackjack X 16 - Azure,4d6bd82a165718745b741da33ebd0cb0,CasinoLive,99.28%,2024-03-13,,,
3017,Blackjack X 17 - Azure,f03517eabcf89387efc0f2bfd193c2ce,CasinoLive,99.28%,2024-03-13,,,
3018,Blackjack X 18 - Azure,e9a3880ae1414fa2b59de54336b6508d,CasinoLive,99.28%,2024-03-13,,,
3019,Blackjack X 19 - Ruby,ef44063ba6f5fde0769cc7677262838e,CasinoLive,99.28%,2024-03-13,,,
3020,Blackjack X 20 - Ruby,6255ddedaa5f480b9dfa9fa40f7b8326,CasinoLive,99.28%,2024-03-13,,,
3021,Blackjack X 21 - Ruby,3e5004fa6ad33e9c5130b1017c0ac6b2,CasinoLive,99.28%,2024-03-13,,,
3049,BlackjackX 22 - Emerald,a364410030dac262dfff1979521288d8,CasinoLive,99.28%,2024-04-18,,,
3050,BlackjackX 23 - Emerald,3e0d79b9e524d8d9888848559192611e,CasinoLive,99.28%,2024-04-18,,,
3024,Blackjack X 24 - Azure,d9b511ca291529bfe669a154a321386a,CasinoLive,99.28%,2024-03-13,,,
3025,Blackjack X 25 - Azure,ac1e682e6ce50f787124ef4daf01f691,CasinoLive,99.28%,2024-03-13,,,
3051,BlackjackX 26 - Emerald,d2a22cfc9baaeec562ae159b2672174c,CasinoLive,99.28%,2024-04-18,,,
3052,BlackjackX 27 - Emerald,17785357bb6ff50b3d252fe4300cb881,CasinoLive,99.28%,2024-04-18,,,
3053,BlackjackX 28 - Emerald,16f45de0f1ac6aecb7bbbab2816acdd5,CasinoLive,99.28%,2024-04-18,,,
3054,BlackjackX 29 - Emerald,3c0994fc8d99afdc3e8b290867679f30,CasinoLive,99.28%,2024-04-18,,,
3055,BlackjackX 30 - Emerald,4cc29ee405b5a2b2d7c245e5ee7bd763,CasinoLive,99.28%,2024-04-18,,,
3231,BlackjackX 31,995fd6a37ee90f442bf1cdb020097673,CasinoLive,99.28%,2025-01-09,,下架,
3232,BlackjackX 32,c7490f453eb023fe4b142ae4c7f96307,CasinoLive,99.28%,2025-01-09,,下架,
3233,BlackjackX 33,0d904227ec25333d6ac1f67189d1dc1a,CasinoLive,99.28%,2025-01-09,,下架,
3234,BlackjackX 34,558ef1a939e5d2a0227f48a7876458a4,CasinoLive,99.28%,2025-01-09,,下架,
3235,BlackjackX 35,d7db7afef5c428d0b7bf75545efe67b1,CasinoLive,99.28%,2025-01-09,,下架,
3238,BlackjackX 36,294c94dd9c4e5e0453f1de38f473912e,CasinoLive,99.28%,2025-01-09,,下架,
3239,BlackjackX 37,254bbca908409b4ee044affb9ea5161a,CasinoLive,99.28%,2025-01-09,,下架,
3240,BlackjackX 38,f0c81700bbe0ae9c71f630f870999542,CasinoLive,99.28%,2025-01-09,,下架,
3241,BlackjackX 39,2309cfa59d6064db6ae8573eb220aa8e,CasinoLive,99.28%,2025-01-09,,下架,
3242,BlackjackX 40,93c22ce9abe70468f73cd394c0b528ef,CasinoLive,99.28%,2025-01-09,,下架,
3252,Indonesian BlackjackX 1,e9a53623feebf01c99683d18bb1626a5,CasinoLive,99.28%,2024-12-12,,下架,
3253,Indonesian BlackjackX 2,f2d45286b1bf353251ce64c09f29da8e,CasinoLive,99.28%,2024-12-12,,下架,
3254,Indonesian BlackjackX 3,c841cfbc8d51fb08302f4af21e7c5d8c,CasinoLive,99.28%,2024-12-12,,下架,
3255,Indonesian BlackjackX 4,85cffde52811b2c5d0b709f5e9933096,CasinoLive,99.28%,2024-12-12,,下架,
3256,Indonesian BlackjackX 5,ebf939f487f8a55cc9d14d8fae174789,CasinoLive,99.28%,2024-12-12,,下架,
3310,Indonesian BlackjackX 6,9d22271dd2e069f651b17a5b5f220e6c,CasinoLive,99.28%,2025-02-18,,下架,
3311,Indonesian BlackjackX 7,06acb5ea3578b3ed8d1785daab1512c1,CasinoLive,99.28%,2025-02-18,,下架,
3312,Indonesian BlackjackX 8,ca4d32b8d0f2ca3698c515289d73cfb4,CasinoLive,99.28%,2025-02-18,,下架,
3313,Indonesian BlackjackX 9,8feab75c075507d5b127050ebc16e9bb,CasinoLive,99.28%,2025-02-18,,下架,
3314,Indonesian BlackjackX 10,4d9cf931867a942fe0c8bec5c7fb4f69,CasinoLive,99.28%,2025-02-18,,下架,
3315,Indonesian BlackjackX 11,946da5ed901d063be7d882eb685aaa36,CasinoLive,99.28%,2025-02-18,,下架,
3316,Indonesian BlackjackX 12,983f036814b9f4cc169cfba7da163538,CasinoLive,99.28%,2025-02-18,,下架,
3317,Indonesian BlackjackX 13,2798b92c4a47cfb6cdc173a761afe341,CasinoLive,99.28%,2025-02-18,,下架,
3318,Indonesian BlackjackX 14,49062a067ec68b21e6a30029d9560ff4,CasinoLive,99.28%,2025-02-18,,下架,
3319,Indonesian BlackjackX 15,478fa18daabb990ef390df55daada6d9,CasinoLive,99.28%,2025-02-18,,下架,
3340,Indonesian BlackjackX 16,2177dd3793a027f66f35a96be15220b0,CasinoLive,99.28%,2025-04-30,,下架,
3341,Indonesian BlackjackX 17,2408d5f936015af27c29b44a186d431f,CasinoLive,99.28%,2025-04-30,,下架,
3342,Indonesian BlackjackX 18,b4a18dfc8a7ba8753fb7da62e55e600c,CasinoLive,99.28%,2025-04-30,,下架,
3343,Indonesian BlackjackX 19,0254f321cb5f35d5446f9bb918d43d0b,CasinoLive,99.28%,2025-04-30,,下架,
3344,Indonesian BlackjackX 20,7b28ef278e33ea89e829e2ac5d1e67dd,CasinoLive,99.28%,2025-04-30,,下架,
3321,BlackjackX Latino 1,9c6573beab469465862daf18734df021,CasinoLive,99.28%,2025-04-02,Spanish speaking clients only,下架,
3322,BlackjackX Latino 2,a84a821300eacb8128a70f5ad86dc078,CasinoLive,99.28%,2025-04-02,Spanish speaking clients only,下架,
3323,BlackjackX Latino 3,f25c88b061a0b1abd70c1e6900cdab47,CasinoLive,99.28%,2025-04-02,Spanish speaking clients only,下架,
3324,BlackjackX Latino 4,1e9855329053c9e02f80cfca72ab67be,CasinoLive,99.28%,2025-04-02,Spanish speaking clients only,下架,
3325,BlackjackX Latino 5,74248dd080ccfc49927a78ea2e6a7c60,CasinoLive,99.28%,2025-04-02,Spanish speaking clients only,下架,
3133,Korean BlackjackX 1,21dd6efed2a194bd9575d0fd0187cabb,CasinoLive,99.28%,2024-07-24,Korean Market Only,下架,
3134,Korean BlackjackX 2,bb4d0881bcd52ca3bf54b5badc54ecd4,CasinoLive,99.28%,2024-07-24,Korean Market Only,下架,
3135,Korean BlackjackX 3,057a010fc58f224987dc90461d1583d2,CasinoLive,99.28%,2024-07-24,Korean Market Only,下架,
3091,Turkish BlackjackX 1,16955e346b4a8ae2b34c5e7619bafaf8,CasinoLive,99.28%,2024-06-19,Turkish market only,下架,
3092,Turkish BlackjackX 2,a1602f9a3993a58524bb9765b1497c4f,CasinoLive,99.28%,2024-06-19,Turkish market only,下架,
3093,Turkish BlackjackX 3,81bd146c32e6a4873e061eadd959b3ec,CasinoLive,99.28%,2024-06-19,Turkish market only,下架,
3094,Turkish BlackjackX 4,98f6d32cb904703d10253d6146434987,CasinoLive,99.28%,2024-06-19,Turkish market only,下架,
3095,Turkish BlackjackX 5,4bb93110a55eb548980f4e4c008f0ad2,CasinoLive,99.28%,2024-06-19,Turkish market only,下架,
3096,Turkish BlackjackX 6,6d7c28e8af9b950263ea70ff950cb315,CasinoLive,99.28%,2024-09-18,Turkish market only,下架,
3097,Turkish BlackjackX 7,44413a3285581c8528e697ebd43cd8c5,CasinoLive,99.28%,2024-09-18,Turkish market only,下架,
3125,BlackjackX Italia Tricolore 1,89a45b49281562f9fbebeb24c369d8a2,CasinoLive,99.28%,2024-06-25,Italian market only,下架,
3126,BlackjackX Italia Tricolore 2,cc2ba40571cba9ea787a9a8cb059d4f1,CasinoLive,99.28%,2024-06-25,Italian market only,下架,
3127,BlackjackX Italia Tricolore 3,c7345b6df8705a7509bcd610d5a1dd61,CasinoLive,99.28%,2024-06-25,Italian market only,下架,
3128,BlackjackX Italia Tricolore 4,e81b5b8923f944d016cc40605b252270,CasinoLive,99.28%,2024-06-25,Italian market only,下架,
3129,BlackjackX Italia Tricolore 5,5150ec4999a1f9ccc78c83e43e47be93,CasinoLive,99.28%,2024-06-25,Italian market only,下架,
3334,Dutch BlackjackX 1,d38b7f4066082e7b8f413a414a67a4f9,CasinoLive,99.28%,2025-05-15,Dutch and Belgian market only,下架,
3335,Dutch BlackjackX 2,d845f57d46939fcaa49dd967aad976cc,CasinoLive,99.28%,2025-05-15,Dutch and Belgian market only,下架,
3336,Dutch BlackjackX 3,ff74c1e33bda3bd4d230a7bcf9e8f028,CasinoLive,99.28%,2025-05-15,Dutch and Belgian market only,下架,
3337,Dutch BlackjackX 4,e3574bcf1110887b84e71705e72f631d,CasinoLive,99.28%,2025-05-15,Dutch and Belgian market only,下架,
3338,Dutch BlackjackX 5,259cb7bb7907d2e6bc9ffca235b46b67,CasinoLive,99.28%,2025-05-15,Dutch and Belgian market only,下架,
3141,Brazilian BlackjackX 1,32433f23788008307ec42888a912f300,CasinoLive,99.28%,2024-12-28,Brazilian market only,下架,
3142,Brazilian BlackjackX 2,bc5effaa426d03bcd61ed936d145ee14,CasinoLive,99.28%,2024-12-28,Brazilian market only,下架,
3143,Brazilian BlackjackX 3,886f664af4cb8a46574d8d2fae4d04c8,CasinoLive,99.28%,2024-12-28,Brazilian market only,下架,
3144,Brazilian BlackjackX 4,3d5f160597b4c188c204a76cf856e009,CasinoLive,99.28%,2024-12-28,Brazilian market only,下架,
3145,Brazilian BlackjackX 5,c6b70ab1dfab07bd65c5ba4341264cda,CasinoLive,99.28%,2024-12-28,Brazilian market only,下架,
3155,Romanian BlackjackX 1,c46c253b7c8606d4c9404433f3b44d93,CasinoLive,99.28%,2024-09-11,Romanian market only,下架,
3156,Romanian BlackjackX 2,10d4c1536233c5c01733bfbe99dc338d,CasinoLive,99.28%,2024-09-11,Romanian market only,下架,
3157,Romanian BlackjackX 3,5a79013a992f1c6bd1280f1a2dca01da,CasinoLive,99.28%,2024-09-11,Romanian market only,下架,
3158,Romanian BlackjackX 4,f3136cace991627fc8cb0ea94a011fc4,CasinoLive,99.28%,2024-09-11,Romanian market only,下架,
3159,Romanian BlackjackX 5,ce1ac98875d198eef851263402195561,CasinoLive,99.28%,2024-09-11,Romanian market only,下架,
2601,Jacks or Better Draw Poker,a027f3ed752e12a2bf9a55b16307d359,CasinoLive,"Optimal strategy 99.54%
Simplified strategy 96.69%
Jackpot	 94.04%",2025-07-02,,,
1401,Dice City,ac0d236e246960e00ce50daebf1396c6,CasinoLive,96.55% - 96.57%,2025-07-10,,,
28301,Privé Lounge Roulette Deluxe,884fc1978b337e63a42f8bd0ad223955,CasinoLive,97.30%,2025-07-15,,,
1159,Korean ONE Blackjack,4f4ee74b552beb580ddee0da0feadb48,CasinoLive,99.28%,2025-07-17,,,
1160,Indonesian ONE Blackjack,b9eaeb81370231860bec7bf0f6d5b98b,CasinoLive,99.28%,2025-07-22,,,
703a1,Korean Mega Sic Bo,af8554a4f8763de3eeffb07ef1f324be,CasinoLive,97.22%,2025-08-07,,,
703a2,Indonesian Mega Sic Bo,b4ff5ded8990dce64fd7601af15d50ed,CasinoLive,97.22%,2025-08-25,,,
2750,Money Time,042f275d795c467244dd0014618ccc76,CasinoLive,96.56%,2025-09-24,,,
2901,Mega Roulette 3000,303b7bda6d4878d36b0f3cfe7e35ac1f,CasinoLive,97.30% - 97.50%,2025-10-29,,,
`;




interface Game {
  name: string;
  uid: string;
  image: string;
}




const parseGames = (csvData: string) => {
  // Split by line breaks, but handle cases where line breaks are inside quotes
  const lines = csvData.trim().split(/\r?\n(?=(?:(?:[^"]*"){2})*[^"]*$)/);
  
  // Get the header to find the index of "Game Name" and "Game UID"
  const headers = lines[0].split(',');
  const nameIdx = headers.indexOf('Game Name');
  const uidIdx = headers.indexOf('Game UID');

  // Process rows (skipping header)
  return lines.slice(1).map(line => {
    // Split by comma, but ignore commas inside double quotes
    const columns = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    
    return {
      name: columns[nameIdx]?.replace(/^"|"$/g, '').trim(),
      uid: columns[uidIdx]?.trim()
    };
  });
};

// Example Usage:
// const result = processCsv(yourCsvString);
// console.log(result);

export const prgmGamesArray = parseGames(csvData);
console.log(prgmGamesArray);


