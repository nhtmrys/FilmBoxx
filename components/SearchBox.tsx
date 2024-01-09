import React from "react";
import { Input } from "./ui/input";

const SearchBox = (props: any) => {
  return (
    <div className="col col-sm-4">
      <Input
        className="form-control"
        value={props.value}
        onChange={(event) => props.setSearchValue(event.target.value)}
        placeholder="Type to search..."
      />
    </div>
  );
};

export default SearchBox;
