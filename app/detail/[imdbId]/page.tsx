import type { Metadata } from "next";
import MovieDetail from "./components/movie-detail";
import Head from "next/head";
interface DetailPageProps {
  params: {
    imdbId: string;
  };
}
export const metadata: Metadata = {
  title: "Detail Page",
  description: "FilmBoxx | A movie database",
  icons: {
    icon: "/favicon.ico",
  },
};

const DetailPage: React.FC<DetailPageProps> = async ({ params }) => {
  return (
    <>
      <div className="container">
        <div>
          <MovieDetail params={params} />
        </div>
      </div>
    </>
  );
};

export default DetailPage;
