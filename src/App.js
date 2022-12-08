import logo from "./logo.svg";
import "./App.css";
import { Fragment, useEffect, useState } from "react";
import { getDataWeather, getNewLocation } from "./api/apiWeather";
import GoogleMapReact from "google-map-react";

function App() {
  const [location, setLocation] = useState("");
  const [dataWeather, setDataWeather] = useState();
  const [tempDegreeC, setTempDegreeC] = useState();
  const [showMap, setShowMap] = useState(false);
  const [marker, setMarker] = useState({
    text: "my marker",
    lat: 16.4667,
    lng: 107.6,
  });

  useEffect(() => {
    const searchNewLocation = async () => {
      const location = await getNewLocation(marker);
      const { name } = location.data.city;
      const data = await getDataWeather(name);
      setDataWeather(data);
    };
    searchNewLocation();
  }, [marker]);

  const handleSearchLocation = async (e) => {
    if (e.key === "Enter") {
      setDataWeather(await getDataWeather(e.target.value));
    }
  };
  const defaultProps = {
    center: {
      lat: 16.4667,
      lng: 107.6,
    },
    zoom: 11,
  };
  useEffect(() => {
    const handleFirstLoad = async (e) => {
      setDataWeather(await getDataWeather("Hue"));
    };
    handleFirstLoad();
  }, []);

  useEffect(() => {
    if (dataWeather) {
      const { temp } = dataWeather.data.main;
      setTempDegreeC(((temp - 32) * 5) / 9);
    }
  }, [dataWeather]);

  const handleSearchNewLocation = (e) => {
    const { lat, lng } = e;
    setMarker({
      text: "new",
      lat,
      lng,
    });
  };
  return (
    <div id="home">
      <div className="search">
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={handleSearchLocation}
          placeholder="Enter location..."
          type="text"
        />
        <div className="search-by-map" onClick={() => setShowMap(!showMap)}>
          <p>Choose location</p>
        </div>
        {showMap && (
          <div className="map">
            <GoogleMapReact
              bootstrapURLKeys={{ key: "" }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
              onClick={(e) => handleSearchNewLocation(e)}
            >
              {/* { marker.text && <MyMarker marker={marker}/>} */}
            </GoogleMapReact>
          </div>
        )}
      </div>
      <div className="container">
        {dataWeather && (
          <>
            <div className="top">
              <div className="location">
                <p>{dataWeather.data.name}</p>
              </div>
              <div className="temp">
                {dataWeather.data.main ? (
                  <>
                    <h1>{dataWeather.data.main.temp.toFixed()}°F</h1>
                    <h1>{Math.round(tempDegreeC)}°C</h1>
                  </>
                ) : null}
              </div>
              <div className="description">
                {dataWeather.data.weather ? (
                  <p>{dataWeather.data.weather[0].main}</p>
                ) : null}
              </div>
            </div>
            <div className="bottom">
              <div className="feels">
                {dataWeather.data.main ? (
                  <p className="bold">
                    {dataWeather.data.main.feels_like.toFixed()}°F
                  </p>
                ) : null}
                <p>Feels Like</p>
              </div>
              <div className="humidity">
                {dataWeather.data.main ? (
                  <p className="bold">{dataWeather.data.main.humidity}%</p>
                ) : null}
                <p>Humidity</p>
              </div>
              <div className="wind">
                {dataWeather.data.wind ? (
                  <p className="bold">
                    {dataWeather.data.wind.speed.toFixed()} MPH
                  </p>
                ) : null}
                <p>Wind Speed</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
