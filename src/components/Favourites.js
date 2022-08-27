import React, { useState, useEffect } from "react";
import axios from "axios";
import { RiDeleteBinLine } from "react-icons/ri";
import Home_img from "../assets/images/home1.webp";

function Favourites(props) {
  const [db, setDb] = useState([]);
  const [favFlag, setFavFlag] = useState(false);

  const removeFromFav = (id) => {
    axios
      .patch("/houses" + id, { favourite: false })
      .then((res) => {
        setFavFlag(!favFlag);
      });
  };

  const fetchData = () => {
    axios.get("/houses").then((res) => {
      setDb(res.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, [favFlag]);

  return (
    <>
      <div className="property-serchbox">
        <div className="custom-container">
          <div className="top-bar2">
            <h2>My Favorite</h2>
          </div>
          <div className="custom-row">
            <div className="custom-12">
              <table className="bg-transparent">
                <thead>
                  <tr className="bg-white">
                    <th>Properties</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {db?.map((data, i) =>
                    data.favourite === true ? (
                      <tr>
                        <td>
                          <img className="rounded" src={Home_img} alt="" />
                          <div className="property-info">
                            <h5 className="text-secondary">{data.name}</h5>
                            <span>
                              <i className="fa fa-map-marker"></i>
                              {`${data.address}, ${data.location}`}
                            </span>
                            <div className="price">
                              <span className="text-primary">
                                ${data.rent_price}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <a
                            onClick={(e) => {
                              removeFromFav(data.id);
                            }}
                            className="text-primary">
                            <RiDeleteBinLine />
                          </a>
                        </td>
                      </tr>
                    ) : null
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Favourites;
