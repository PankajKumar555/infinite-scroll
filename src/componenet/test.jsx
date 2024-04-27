import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

const Test = () => {
  const [response, setResponse] = useState();
  const fetchData = async () => {
    try {
      const data = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      setResponse(data.data);
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log("response--->>", response);

  return (
    <div>
      {response &&
        response.map((item) => <p key={item.id}>{JSON.stringify(item)}</p>)}
    </div>
  );
};
export default Test;
