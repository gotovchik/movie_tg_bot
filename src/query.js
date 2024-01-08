"use strict";

import pkg from '@openmoviedb/kinopoiskdev_client';
const { MovieQueryBuilder, SPECIAL_VALUE } = pkg;

export class Query {
  queryBuilder = new MovieQueryBuilder();
  currentYear = new Date().getFullYear();

  getHorrorQuery = async () => {
    const query = this.queryBuilder
      .select(['name', 'ageRating', 'rating', 'poster', 'year', 'description', 'countries', 'genres' ])
      .filterExact('poster.url', SPECIAL_VALUE.NOT_NULL)
      .filterExact('poster', SPECIAL_VALUE.NOT_NULL)
      .filterExact('countries', SPECIAL_VALUE.NOT_NULL)
      .filterExact('countries.name', SPECIAL_VALUE.NOT_NULL)
      .filterExact('rating.imdb', SPECIAL_VALUE.NOT_NULL)
      .filterExact('description', SPECIAL_VALUE.NOT_NULL)
      .filterExact('name', SPECIAL_VALUE.NOT_NULL)
      .filterExact('genres.name', '+ужасы')
      .filterExact('type', 'movie');

    return query;
  }

  getNewMovieQuery = async () => {
    const query = this.queryBuilder
      .select(['name', 'ageRating', 'rating', 'poster', 'year', 'description', 'genres' ])
      .filterExact('poster.url', SPECIAL_VALUE.NOT_NULL)
      .filterExact('poster', SPECIAL_VALUE.NOT_NULL)
      .filterExact('rating.imdb', SPECIAL_VALUE.NOT_NULL)
      .filterExact('description', SPECIAL_VALUE.NOT_NULL)
      .filterExact('name', SPECIAL_VALUE.NOT_NULL)
      .filterExact('genres.name', '+ужасы')
      .filterExact('type', 'movie')
      .filterRange('year', [this.currentYear - 3, this.currentYear]);

    return query;
  }
}