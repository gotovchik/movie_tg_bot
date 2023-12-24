import { ConfigService } from "./config/ConfigService.js";
import pkg from '@openmoviedb/kinopoiskdev_client';
const { KinopoiskDev, MovieQueryBuilder, SPECIAL_VALUE } = pkg;



export class Movie {

  // getRandomMovieWithFilters = async () => {
  //   const cs = new ConfigService();
  //   const kp = new KinopoiskDev(cs.get("KP_TOKEN"))
  //   const queryBuilder = new MovieQueryBuilder();

  //   const baseQuery = queryBuilder
  //     .select([`name`, `year`])
  //     .filterRange(`year`, [2010, 2023])
  //     .filterRange(`rating.kp`, [6, 10])
  //     .filterRange(`typeNumber`, [1])
  //     .filterExact(`genres.name`, [`для взрослых`, 'короткометражка']);

  //   const firstQuery = baseQuery
  //     .paginate(1, 1)
  //     .build();

  //   const firstRes = await kp.movie.getByFilters(firstQuery);

  //   if (firstRes.data) {
  //     const { pages } = firstRes.data;

  //     const randomPage = Math.floor(Math.random() * pages) + 1;
  //     const query = baseQuery.paginate(randomPage, 1).build();

  //     const { data, error, message } = await kp.movie.getByFilters(query);

  //     if (data) {
  //       return data.docs[0];
  //     }
  //     if (error) console.log(error, message);
  //   }
  //   if (firstRes.error) console.log(firstRes.error, firstRes.message);
  // };

  getRandomMovieWithFilters = async () => {
    const cs = new ConfigService();
    const kp = new KinopoiskDev(cs.get("KP_TOKEN"))
    // Создаем билдер запросов для фильмов
    const queryBuilder = new MovieQueryBuilder();

    // Выбираем поля, которые мы хотим получить в ответе
    const baseQuery = queryBuilder
      .select(['id', 'name', 'rating', 'poster', 'year'])
      // Добавляем фильтр для поиска фильмов с постером
      .filterExact('poster.url', SPECIAL_VALUE.NOT_NULL)
      // Добавляем фильтр для поиска фильмов с трейлерами
      .filterExact('videos.trailers.url', SPECIAL_VALUE.NOT_NULL);

    const firstQuery = baseQuery
      // получим первую страницу, чтобы узнать сколько всего фильмов удовлетворяет нашим фильтрам
      .paginate(1, 1)
      // Собираем запрос
      .build();

    // Отправляем запрос на получение количества фильмов
    const firstRes = await kp.movie.getByFilters(firstQuery);
    if (firstRes.data) {
      const { pages } = firstRes.data;
      // Генерируем случайное число от 1 до pages
      const randomPage = Math.floor(Math.random() * pages) + 1;
      const query = baseQuery.paginate(randomPage, 1).build();

      const { data, error, message } = await kp.movie.getByFilters(query);

      if (data) {
        return data.docs[0];
      }
      // Если будет ошибка, то выведем ее в консоль
      if (error) console.log(error, message);
    }

    // Если будет ошибка, то выведем ее в консоль
    if (firstRes.error) console.log(firstRes.error, firstRes.message);
  };
}

