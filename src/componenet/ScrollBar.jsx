import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ScrollBar.css";

const ScrollBar = () => {
  const [data, setData] = useState([]);
  const [pageText, setPageText] = useState(50);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.frontendexpert.io/api/fe/testimonials?limit=9&after=${pageText}`
      );
      // setData((prevData) => [...prevData, ...response.data.testimonials]);
      setData((prevData) => {
        const newData = response.data.testimonials.filter((newItem) => {
          return !prevData.some(
            (existingItem) => existingItem.id === newItem.id
          );
        });
        return [...prevData, ...newData];
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleScroll = () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPageText((prev) => prev + 9);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageText]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <h1>ScrollBar</h1>
      <div className="scroll-bar-text">
        {data &&
          data.map((item) => (
            <div
              key={item.id}
              style={{ backgroundColor: "#28231D", borderRadius: "5px" }}
            >
              <p>
                <strong>{item.id}: </strong>
                {item.message}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ScrollBar;
