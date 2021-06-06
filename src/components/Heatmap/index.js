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

  function renderPoint(day, hour) {
    let color = heatMapColorforValue(activityMap[day][hour] || 0);
    return (
      <span
        key={`${day}_${hour}`}
        className="heatmap__point"
        style={{ color: color }}
      />
    );
  }

  function renderDayLine(day) {
    return (
      <div key={`line_${day}`} className="heatmap__line">
        <span className="heatmap__line__day-title">{arrayOfWeekdays[day]}</span>
        <div className="heatmap__line__points">
          {Array.from({ length: dailyBucketSize }, (x, i) =>
            renderPoint(day, i)
          )}
        </div>
      </div>
    );
  }

  function renderHoursLine() {
    return (
      <div className="heatmap__line heatmap__line__hours">
        <span className="heatmap__line__day-title">{""}</span>
        {Array.from({ length: dailyBucketSize }, (x, i) => (
          <div key={`hour_line_${i}`} className="heatmap__line__points">
            {i}
          </div>
        ))}
      </div>
    );
  }
  function renderHeatMap() {
    return (
      <>
        {Object.keys(activityMap).map(renderDayLine)}
        {renderHoursLine()}
      </>
    );
  }
  return (
    <div className="heatmap">
      {activityMap ? renderHeatMap() : "Loading..."}
    </div>
  );
}
