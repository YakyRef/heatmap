const arrayOfWeekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
onmessage = (e) => {
  const inputData = e.data;
  if (!inputData) {
    postMessage("error");
  } else {
    let i = 0;
    let day = null;
    let hour = null;
    let current = null;
    const res = {};
    let arrayLength = inputData.length;
    while (i < arrayLength) {
      day = new Date(inputData[i]).getDay();
      hour = new Date(inputData[i]).getHours();
      current = res[arrayOfWeekdays[day]] || null;
      if (!current) {
        //
        res[arrayOfWeekdays[day]] = { [hour]: 1 };
      } else {
        if (!current[hour]) {
          current[hour] = 1;
        } else {
          current[hour] = current[hour] + 1;
        }
      }

      i++;
    }
    postMessage(res);
  }
};
