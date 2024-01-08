import { ConfigService } from "./config/ConfigService.js";
import pkg from '@openmoviedb/kinopoiskdev_client';
const { KinopoiskDev } = pkg;



export class Movie {


  getMovieWithQuery = async (baseQuery) => {
    const cs = new ConfigService();
    const kp = new KinopoiskDev(cs.get("KP_TOKEN"))

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

