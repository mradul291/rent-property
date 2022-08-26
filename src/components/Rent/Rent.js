import React, { useState } from "react";
import Cards from "./Cards";
import Search from "./Search";

function Rent(props) {
  const [search, setSearch] = useState({});
  const [flag, setFlag] = useState();

  const filterData = (e) => {
    setSearch(e);
  };

  const flagg = (e) => {
    setFlag(e);
  };

  return (
    <>
      <Search getFilteredData={filterData} flagg={flagg} />
      <Cards filteredData={search} flag={flag} />
    </>
  );
}

export default Rent;
