"use client";
import React, { useState, useEffect } from "react";
import SearchBox from "@/components/SearchBox";
import { DataTable } from "@/components/movies/data-table";
import { columns } from "@/components/movies/columns";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const App = () => {
  //initializing state
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [yearValue, setYearValue] = useState("");
  const [searchValue, setSearchValue] = useState("Pokemon");
  const [page, setPage] = useState(1);
  const [filmType, setFilmType] = useState([] as any);

  //filtering type of film
  const types = [
    { slug: "movie", name: "Movie" },
    { slug: "series", name: "Series" },
    { slug: "episode", name: "Episode" },
  ];

  //fetching data from api
  const getMovieRequest = async (
    searchValue: string,
    yearValue: number,
    type: []
  ) => {
    const url = `https://www.omdbapi.com/?s=${searchValue}&y=${
      yearValue > 0 ? yearValue : ""
    }&page=${page}&type=${filmType}&apikey=263d22d8`;

    const response = await fetch(url);
    const responseJson = await response.json();
    setTotalResults(responseJson.totalResults);
    //checking if response is true

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  //handling type change
  const handleTypeChange = (selectedType: any) => {
    setFilmType(selectedType);
  };

  //useEffect to fetch data by selections
  useEffect(() => {
    getMovieRequest(searchValue, parseInt(yearValue), filmType);
  }, [searchValue, yearValue, filmType, page]);

  return (
    <div className="container">
      <div className="flex flex-col justify-start items-left mt-4 mb-4">
        <div className="flex flex-col gap-y-2">
          <SearchBox
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
          <Input
            placeholder="Year"
            onChange={(event) => setYearValue(event.target.value)}
          />
          <Select
            onValueChange={(selectedType) => handleTypeChange(selectedType)}
          >
            <SelectTrigger>
              <SelectValue
                defaultValue={filmType}
                placeholder="Select type.."
              />
              <SelectContent>
                {types.map((type) => (
                  <SelectItem key={type.slug} value={type.slug}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectTrigger>
          </Select>
        </div>
      </div>
      <Heading
        title={`Current keyword : ${searchValue}`}
        description={`Result: ${totalResults}`}
      />
      <DataTable
        columns={columns}
        data={movies}
        page={page}
        setPage={setPage}
        totalResults={totalResults}
      />
    </div>
  );
};

export default App;
