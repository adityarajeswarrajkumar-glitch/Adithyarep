CREATE TABLE movies (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  year INTEGER NOT NULL,
  genre TEXT NOT NULL,
  rating NUMERIC(3,1) NOT NULL,
  poster TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now()
);
CREATE TABLE reviews (
  id BIGSERIAL PRIMARY KEY,
  movie_id BIGINT NOT NULL REFERENCES movies(id),
  user_id TEXT NOT NULL,
  rating INTEGER NOT NULL,
  review TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now()
);
CREATE INDEX reviews_movie_idx ON reviews(movie_id);