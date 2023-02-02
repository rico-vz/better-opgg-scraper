
# Better OP.GG Scraper

An improved promised based scraper for the League of Legends stat site <https://op.gg>.

Working with the latest OP.GG UI & URL Update (Oct 4th 2022)

https://www.npmjs.com/package/better-opgg-scraper

## Installation

npm i better-opgg-scraper

```javascript
 const opggScrape = require('better-opgg-scraper'); 
```

## Usage/Examples

```javascript
const opggScrape = require('better-opgg-scraper');

opggScrape.getStats('built', 'euw').
    then(stats => console.log(stats))   
```

#### Output

```javascript
{
  SummonerName: 'Built',
  Level: '277',
  Rank: 'Challenger',
  LP: '1,347 LP',
  WinRate: '57%',
  LadderRank: '25 ',
  SummonerIcon: 'https://opgg-static.akamaized.net/images/profile_icons/profileIcon3901.jpg?image=q_auto&image=q_auto,f_png,w_auto&v=1665153311871',
  RecentlyPlayedWith: [
    [ 'decayyyy', '2', '1 - 1', '50%' ],
    [ 'Khnum Khufu', '2', '1 - 1', '50%' ],
    [ 'twtv mrrdv', '2', '0 - 2', '0%' ]
  ]
}
```

## Paramaters

getStats(username: string, region: string)

#### Supported Regions

NA, KR, OCE, JP, EUW, EUNE, LAN, BR, RU & TR
