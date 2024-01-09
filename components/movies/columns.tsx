"use client";

import { ColumnDef } from "@tanstack/react-table";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export type MovieColumn = {
  Poster: string;
  Title: string;
  Year: string;
  imdbID: string;
};

const PosterCell = ({ row }: any) => {
  // initializing state
  const [showLargeImage, setShowLargeImage] = useState(false);

  // hovering over image to show large image functions
  const handleMouseEnter = () => {
    setShowLargeImage(true);
  };

  const handleMouseLeave = () => {
    setShowLargeImage(false);
  };

  return (
    <div
      className="flex items-center gap-x-2"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showLargeImage && (
        <div
          style={{
            backgroundColor: "white",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-100%, -100%)",
            zIndex: 1000,
          }}
        >
          <img
            src={
              row.original.Poster === "N/A"
                ? "/no-image.png"
                : row.original.Poster
            }
            alt={row.original.Title}
            className="w-96 h-96 border"
          />
        </div>
      )}

      {row.original.Poster === "N/A" ? (
        <img src="/no-image.png" className="w-64 border" />
      ) : (
        <img src={row.original.Poster} className="w-64 border" />
      )}
    </div>
  );
};

export const columns: ColumnDef<MovieColumn>[] = [
  {
    accessorKey: "Poster",
    header: "Poster",
    cell: PosterCell,
  },
  {
    accessorKey: "Title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-x-2">
          <a
            href={`/detail/${row.original.imdbID}`}
            className="hover:underline cursor-pointer"
          >
            {row.original.Title}
          </a>
        </div>
      );
    },
  },
  {
    accessorKey: "Type",
    header: ({ column }) => {
      return <div>Type</div>;
    },
  },

  {
    accessorKey: "Year",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Year
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "imdbID",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          imdbID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
