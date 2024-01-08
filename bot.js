"use strict";

import { ConfigService } from "./src/config/ConfigService.js";
import { Movie } from "./src/movie.js";
import { Bot, Keyboard } from "grammy";
import { Query } from "./src/query.js";

const cs = new ConfigService();
const bot = new Bot(`${cs.get("BOT_TOKEN")}`);
const movie = new Movie();
const query = new Query();

const keyboard = new Keyboard()
  .text("Мне повезёт 🎲")
  .text("Новинки 🆕")
  .row()
  .text("Советское 🎞️")
  .text("Ностальгия 🥹")
  .row()
  .text("Жанры 🍿")
  .resized();



bot.command("start", async (ctx) => {
  await ctx.reply("Hello!");
  await ctx.reply("keyboard", {
  reply_markup: keyboard
});

});

bot.hears("Мне повезёт 🎲", async (ctx) => {
  const baseQuery = await query.getHorrorQuery();
  const data = await movie.getMovieWithQuery(baseQuery);
  const genres = data.genres.map((el) => el.name).join(", ")
  const string = `Ваш случайный фильм:\n\nНазвание: ${data.name} | Год: ${data.year}\nРейтинг IMDB: ${data.rating.imdb === 0 ? 'без рейтинга' : data.rating.imdb}\nЖанр: ${genres} \n\nОписание:\n${data.description}`;
  const posterUrl = data.poster.previewUrl;
  await ctx.reply(string);
  await ctx.replyWithPhoto(posterUrl);
});

bot.hears("Новинки 🆕", async (ctx) => {
  const baseQuery = await query.getNewMovieQuery();
  const data = await movie.getMovieWithQuery(baseQuery);
  const genres = data.genres.map((el) => el.name).join(", ")
  const string = `Ваша случайная новинка:\n\nНазвание: ${data.name} | Год: ${data.year}\nРейтинг IMDB: ${data.rating.imdb === 0 ? 'без рейтинга' : data.rating.imdb}\nЖанр: ${genres} \n\nОписание:\n${data.description}`;
  const posterUrl = data.poster.previewUrl;
  await ctx.reply(string);
  await ctx.replyWithPhoto(posterUrl);
});

// bot.on('message', async (ctx) => {
//   await ctx.reply('Пока что я не понимаю, что вы пишите, используйте кнопки ниже!');
// })






bot.start();





