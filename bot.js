"use strict";


// import { ConfigService } from "./src/config/ConfigService.js";
import { Movie } from "./src/movie.js";
// import { Bot } from "grammy";

// const cs = new ConfigService();
// const bot = new Bot(`${cs.get("BOT_TOKEN")}`);



// bot.command("start", (ctx) => {
//   ctx.reply("Hello!");
// });
const showData = async () => {
  const qb = new Movie();
  const data = await qb.getRandomMovieWithFilters();
  console.log(data);
};

showData();


// bot.start();





