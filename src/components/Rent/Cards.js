import React, { useState, useEffect } from "react";
import Square_img from "../../assets/images/square.svg";
import Bed_img from "../../assets/images/bed.svg";
import Bath_img from "../../assets/images/bath.svg";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import Home_img from "../../assets/images/home1.webp";
import axios from "axios";

function Cards(props) {
  const [db, setDb] = useState([]);
  const [dbFiltered, setDbFiltered] = useState([]);
  const [favFlag, setFavFlag] = useState(false);

  const fetchData = () => {
    axios.get("/houses").then((res) => {
      setDb(res.data);
      setDbFiltered(res.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, [favFlag]);

  useEffect(() => {
    handleChangeSearch();
  }, [props.flag]);

  const addToFav = (id) => {
    axios
      .patch("/houses" + id, { favourite: true })
      .then((res) => {
        setFavFlag(!favFlag);
      });
  };

  const removeFromFav = (id) => {
    axios
      .patch("/houses" + id, { favourite: false })
      .then((res) => {
        setFavFlag(!favFlag);
      });
  };

  const handleChangeSearch = () => {
    var filteredRows = db;
    let filteredData = props.filteredData;
    if (filteredData?.location !== "") {
      filteredRows = db.filter((row) => {
        return row.location
          .toString()
          .toLowerCase()
          .includes(filteredData?.location?.toString().toLowerCase());
      });
    }
    if (filteredData?.when !== "") {
      filteredRows = filteredRows.filter((row) => {
        console.log(filteredData.when);
        return new Date(filteredData.when) >= new Date(row.date);
      });
    }
    if (filteredData?.price !== "") {
      filteredRows = filteredRows.filter((row) => {
        const temp = filteredData.price.split("-");
        if (
          parseInt(temp[0]) <= parseInt(row.rent_price) &&
          parseInt(row.rent_price) <= parseInt(temp[1])
        ) {
          return true;
        } else {
          return false;
        }
      });
    }
    if (filteredData?.property_type !== "") {
      filteredRows = filteredRows.filter((row) => {
        return row.property_type
          .toString()
          .toLowerCase()
          .includes(filteredData.property_type.toString().toLowerCase());
      });
    }
    if (
      filteredData.property_type !== "" &&
      filteredData.price !== "" &&
      filteredData.when !== "" &&
      filteredData.location !== ""
    ) {
      setDbFiltered(db);
    } else {
      setDbFiltered(filteredRows);
    }
  };

  return (
    <>
      <div className="popular_property">
        <div className="custom-container">
          <div className="custom-row">
            {dbFiltered?.map((data) => (
              <div className="custom-4" key={data.id}>
                <div className="single_property">
                  <div className="property_thumb">
                    <div className="property_tag">
                      {" "}
                      {data.favourite ? (
                        <FaHeart
                          onClick={(e) => removeFromFav(data.id)}
                          className="fa fa-heart-o"
                          aria-hidden="true"
                        />
                      ) : (
                        <FiHeart
                          onClick={(e) => addToFav(data.id)}
                          className="fa fa-heart-o"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <img src={Home_img} alt="" />
                  </div>
                  <div className="property_content">
                    <div className="main_pro">
                      <h3>
                        <a>{data.name}</a>
                      </h3>
                      <div className="mark_pro">
                        <span className="fa fa-map-marker"></span>
                        <span>{`${data.address}, ${data.location}`}</span>
                      </div>
                      <span className="amount">${data.rent_price}/month</span>
                    </div>
                  </div>
                  <div className="footer_pro">
                    <ul>
                      <li key={`${data.id}-${data.size}`}>
                        <div className="single_info_doc">
                          <img src={Square_img} alt="" />
                          <span>{data.size} Sqft</span>
                        </div>
                      </li>
                      <li key={`${data.id}-${data.beds}`}>
                        <div className="single_info_doc">
                          <img src={Bed_img} alt="" />
                          <span>{data.beds} Beds</span>
                        </div>
                      </li>
                      <li key={`${data.id}-${data.bathrooms}`}>
                        <div className="single_info_doc">
                          <img src={Bath_img} alt="" />
                          <span>{data.bathrooms} Baths</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
