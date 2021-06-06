import React, { useEffect, useState } from "react";
import { arrayOfWeekdays } from "../../constants";
export default function Heatmap({ activity }) {
  const [activityMap, setActivityMap] = useState(null);
  const [dailyBucketSize, setDailyBucketSize] = useState(24);

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

  function getColorByCount(count) {
    return count;
  }
  function renderDayLine(day) {
    return (
      <div key={day}>
        <span>{arrayOfWeekdays[day]} </span>
        {Array.from({ length: dailyBucketSize }, (x, i) => (
          <span>
            {activityMap[day][i] ? getColorByCount(activityMap[day][i]) : 0}
          </span>
        ))}
      </div>
    );
  }
  return (
    <div>
      {activityMap ? Object.keys(activityMap).map(renderDayLine) : "Loading..."}
    </div>
  );
}
