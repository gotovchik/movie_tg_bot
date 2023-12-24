"use strict";

import { ConfigService } from "./src/config/ConfigService.js";
import { Movie } from "./src/movie.js";
import { Bot } from "grammy";

const cs = new ConfigService();
const bot = new Bot(`${cs.get("BOT_TOKEN")}`);
const movie = new Movie();


bot.command("start", (ctx) => {
  ctx.reply("Hello!");
});

bot.hears("Мне повезёт!", async (ctx) => {
  const data = await movie.getRandomMovieWithFilters();
  const string = `Ваш случайный фильм:\nНазвание: ${data.name} | Год: ${data.year}\nРейтинг IMDB: ${data.rating.imdb}\n\nОписание:\n${data.description}`;
  const posterUrl = data.poster.previewUrl;
  await ctx.reply(string);
  await ctx.replyWithPhoto(posterUrl);
});


bot.start();





