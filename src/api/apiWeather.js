import axios from "axios";

export const getDataWeather = async (location) => {
  const response = await axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`
    )
    .catch((err) => {
      console.log("Err: ", err);
    });

  return response;
};

export const getNewLocation = async (marker) => {
  const response = await axios
    .get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${marker.lat}&lon=${marker.lng}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`
    )
    .catch((err) => {
      console.log("Err: ", err);
    });
  return response;
};
