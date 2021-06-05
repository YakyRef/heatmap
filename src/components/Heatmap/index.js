import React, { useEffect, useState } from "react";
import { arrayOfWeekdays } from "../../constants";

export default function Heatmap({ activity }) {
  const [activityMap, setActivityMap] = useState(null);

  useEffect(() => {
    if (window.Worker) {
      const myWorker = new Worker("./worker.js");
      myWorker.postMessage(activity);
      myWorker.onmessage = function (e) {
        setActivityMap(e.data);
        console.log(e.data);
      };
    }
  }, [activity]);
  return <div>{activityMap ? "[activityMap[205]]" : "Loading..."}</div>;
}
