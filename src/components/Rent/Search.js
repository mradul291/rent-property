import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import axios from "axios";

function Search(props) {
  const [prices, setPrices] = useState([]);
  const [propertyTypes, setPropertyType] = useState([]);
  const [flag, setFlag] = useState(true);
  const [search, setSearch] = useState({
    location: "",
    when: "",
    price: "",
    property_type: "",
  });

  const fetchPrice = () => {
    axios.get("/prices").then((res) => {
      setPrices(res.data);
    });
  };

  const fetchPropertyTypes = () => {
    axios.get("/property-types").then((res) => {
      setPropertyType(res.data);
    });
  };

  useEffect(() => {
    fetchPrice();
    fetchPropertyTypes();
  }, []);

  const filterData = () => {
    props.getFilteredData(search);
    setFlag(!flag);
    props.flagg(flag);
  };

  return (
    <>
      <div className="property-serchbox">
        <div className="custom-container">
          <div className="top-bar">
            <h2>{`Search properties to rent`}</h2>
            <select
              name=""
              id=""
              className="form-control"
              defaultValue={"Select"}
            >
              <option value="">Select</option>
              <option value="">Residential</option>
              <option value="">Commercial</option>
              <option value="">Land</option>
              <option value="">Industrial</option>
            </select>
          </div>
          <div className="custom-row">
            <div className="custom-12">
              <form className="search-property">
                <div className="custom-row">
                  <div className="custom-3">
                    <div className="form-group border-0">
                      <label>Location</label>
                      <div className="form-field">
                        <div className="icon">
                          <FiSearch />
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Keyword"
                          onChange={(e) => {
                            setSearch({
                              ...search,
                              ["location"]: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="custom-3">
                    <div className="form-group p-4">
                      <label>When</label>
                      <div className="form-field">
                        <div className="select-wrap">
                          <input
                            type="date"
                            className="form-control"
                            placeholder="Enter Keyword"
                            onChange={(e) => {
                              setSearch({
                                ...search,
                                ["when"]: e.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="custom-3">
                    <div className="form-group">
                      <label>Price</label>
                      <div className="form-field">
                        <select
                          name=""
                          id=""
                          className="form-control"
                          onChange={(e) => {
                            setSearch({ ...search, ["price"]: e.target.value });
                          }}
                        >
                          <option key={"0"} value="">
                            Select
                          </option>
                          {prices.map((e, i) => (
                            <option key={i} value={e.value}>
                              {e.price}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="custom-3">
                    <div className="form-group">
                      <label>Property Type</label>
                      <div className="form-field">
                        <select
                          name=""
                          id=""
                          className="form-control"
                          onChange={(e) => {
                            setSearch({
                              ...search,
                              ["property_type"]: e.target.value,
                            });
                          }}
                        >
                          <option key={"0"} value="">
                            Select
                          </option>
                          {propertyTypes.map((e, i) => (
                            <option key={i} value={e}>
                              {e}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="custom-3">
                    <div className="form-group">
                      <div className="form-field2">
                        <input
                          type="button"
                          value="Search"
                          className="form-control btn btn-primary"
                          onClick={(e) => {
                            filterData();
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
