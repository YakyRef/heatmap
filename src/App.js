import { useEffect, useState } from "react";
import Heatmap from "./components/Heatmap";
import "./styles.css";

export default function App() {
  const [activity, setActivity] = useState([]);
  useEffect(() => {
    fetch("data.json")
      .then((response) => response.json())
      .then((data) => {
        setActivity(data);
      });
  }, []);

  return (
    <div className="App">
      <h1>Hello </h1>

      {activity.length ? (
        <Heatmap activity={activity} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
