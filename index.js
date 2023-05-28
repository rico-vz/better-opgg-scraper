/**
 * @author Rico van Zelst
 */

const puppeteer = require("puppeteer-extra");
const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");
puppeteer.use(AdblockerPlugin());

/**
 * @param  {} user The summoner name of the account you want to scrape data of.
 * @param  {} region The region of the account you want to scrape data of.
 */

exports.getStats = async (user, region) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      channel: "chrome",
    });

    const context = browser.defaultBrowserContext();
    context.overridePermissions(`https://www.op.gg`, [
      "geolocation",
      "notifications",
    ]);
    const page = await browser.newPage();

    await page.goto(`https://www.op.gg/summoners/${region}/${user}`);

    await page.waitForTimeout(1275);

    const level = await page
      .$eval(".level", (e) => e.innerText)
      .catch(() => {
        return "Unknown";
      });
    const image = await page.$eval(".profile-icon img", (e) => e.src);
    const rank = await page
      .$eval(".tier", (e) => e.innerText)
      .catch(() => {
        return "Unknown";
      });
    const lp = await page
      .$eval(".lp", (e) => e.innerText)
      .catch(() => {
        return "Unknown";
      });
    const winrate = await page
      .$eval(".ratio", (e) => e.innerText)
      .catch(() => {
        return "Unknown";
      });
    const winrateClean = winrate.replace("Win Rate ", "");
    const ladderRank = await page
      .$eval("span.ranking", (e) => e.innerText)
      .catch(() => {
        return "Unknown";
      });

    const recentlyPlayedWith = await page
      .$$eval(".css-ut2tyh > table tbody tr", (rows) => {
        return Array.from(rows, (row) => {
          const columns = row.querySelectorAll("td");
          return Array.from(columns, (column) => column.innerText);
        });
      })
      .catch(() => {
        return "None";
      });

    const stats = {
      SummonerName: user,
      Level: level,
      Rank: rank,
      LP: lp,
      WinRate: winrateClean,
      LadderRank: ladderRank,
      SummonerIcon: image,
      RecentlyPlayedWith: recentlyPlayedWith,
    };

    await browser.close();
    
    return stats;
  } catch (e) {
    console.error(e);
  }
};