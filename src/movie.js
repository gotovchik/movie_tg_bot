import { ConfigService } from "./config/ConfigService.js";
import pkg from '@openmoviedb/kinopoiskdev_client';
const { KinopoiskDev, MovieQueryBuilder, SPECIAL_VALUE } = pkg;



export class Movie {

  getRandomMovieWithFilters = async () => {
    const cs = new ConfigService();
    const kp = new KinopoiskDev(cs.get("KP_TOKEN"))

    const queryBuilder = new MovieQueryBuilder();

    const baseQuery = queryBuilder
      .select(['id', 'name', 'rating', 'poster', 'year', 'description'])
      .filterExact('poster.url', SPECIAL_VALUE.NOT_NULL)
      .filterExact('videos.trailers.url', SPECIAL_VALUE.NOT_NULL)
      .filterExact('rating.imdb', SPECIAL_VALUE.NOT_NULL)
      .filterExact('description', SPECIAL_VALUE.NOT_NULL)
      .filterExact('name', SPECIAL_VALUE.NOT_NULL);

    const firstQuery = baseQuery
      .paginate(1, 1)
      .build();

    const firstRes = await kp.movie.getByFilters(firstQuery);
    if (firstRes.data) {
      const { pages } = firstRes.data;
      const randomPage = Math.floor(Math.random() * pages) + 1;
      const query = baseQuery.paginate(randomPage, 1).build();

      const { data, error, message } = await kp.movie.getByFilters(query);

      if (data) {
        return data.docs[0];
      }
      if (error) console.log(error, message);
    }

    if (firstRes.error) console.log(firstRes.error, firstRes.message);
  };
}

