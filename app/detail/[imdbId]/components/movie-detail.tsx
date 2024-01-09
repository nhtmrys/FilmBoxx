"use client";

import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";

interface MovieProps {
  Poster: string;
  Title: string;
  Year: string;
  imdbID: string;
  Plot: string;
  Rated: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Actors: string;
  Language: string;
  Country: string;
  Awards: string;
}

const MovieDetail = ({ params }: any) => {
  // initializing state
  const [movie, setMovie] = useState<MovieProps | null>(null);

  // fetching data from api
  const getMovieRequest = async (imdbId: string) => {
    const url = `http://www.omdbapi.com/?i=${imdbId}&apikey=263d22d8`;

    try {
      const response = await fetch(url);
      const responseJson = await response.json();

      // checking if response is true
      if (responseJson.Response === "True") {
        setMovie(responseJson);
      } else {
        console.error("Error fetching movie data");
      }
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getMovieRequest(params.imdbId);
    }, 500);
  }, [params.imdbId]);

  return (
    <div className="mx-auto my-8 max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {!movie || !movie.Poster ? (
            <Skeleton className="w-full h-screen" />
          ) : null}
          <img
            src={movie?.Poster === "N/A" ? "/no-image.png" : movie?.Poster}
            alt={movie ? movie.Title : ""}
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-5xl font-bold mb-4">
            {!movie ? <Skeleton /> : movie.Title}
          </h1>
          <p className="text-gray-600 mb-6">
            {!movie ? <Skeleton count={2} /> : movie.Plot}
          </p>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Year:</span>{" "}
                {!movie ? <Skeleton /> : movie.Year}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Rated:</span>{" "}
                {!movie ? <Skeleton /> : movie.Rated}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Runtime:</span>{" "}
                {!movie ? <Skeleton /> : movie.Runtime}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Genre:</span>{" "}
                {!movie ? <Skeleton /> : movie.Genre}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Director:</span>{" "}
                {!movie ? <Skeleton /> : movie.Director}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Actors:</span>{" "}
                {!movie ? <Skeleton /> : movie.Actors}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Language:</span>{" "}
                {!movie ? <Skeleton /> : movie.Language}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Country:</span>{" "}
                {!movie ? <Skeleton /> : movie.Country}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Awards:</span>{" "}
                {!movie ? <Skeleton /> : movie.Awards}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
