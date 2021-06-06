import React, { useEffect, useState } from "react";
import { arrayOfWeekdays } from "../../constants";
import "./style.scss";

export default function Heatmap({ activity }) {
  const [activityMap, setActivityMap] = useState(null);
  const [dailyBucketSize, setDailyBucketSize] = useState(24);
  const [colorsMaxRange, setColorsMaxRange] = useState(250);

  useEffect(() => {
    if (window.Worker && activity) {
      const myWorker = new Worker("worker.js");
      myWorker.postMessage(activity);
      myWorker.onmessage = function (e) {
        setActivityMap(e.data);
        console.log(e.data);
      };
    }
  }, []);

  function heatMapColorforValue(heats) {
    let value = heats > colorsMaxRange ? colorsMaxRange : heats;
    value = value / colorsMaxRange;
    var h = (1.0 - value) * 240;
    return "hsl(" + h + ", 100%, 50%)";
  }

  function getColorByCount(day, hour) {
    let color = heatMapColorforValue(activityMap[day][hour] || 0);

    return <span className="heatmap__point" style={{ color: color }} />;
  }

  function renderDayLine(day) {
    return (
      <div key={day} className="heatmap__line">
        <span className="heatmap__day-title">{arrayOfWeekdays[day]} </span>
        {Array.from({ length: dailyBucketSize }, (x, i) =>
          getColorByCount(day, i)
        )}
      </div>
    );
  }
  return (
    <div className="heatmap">
      {activityMap ? Object.keys(activityMap).map(renderDayLine) : "Loading..."}
    </div>
  );
}
