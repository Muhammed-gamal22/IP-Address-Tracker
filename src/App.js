import "./App.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { Icon } from "leaflet";
import marker from "./icon-location.svg";
import CountryInfoList from "./CountryInfoList";
function App() {
  const [countryInfo, setCountryInfo] = useState({});
  const [ip, setIp] = useState("");
  const [latlng, setLatLng] = useState([51.505, -0.09]);
  const myIcon = new Icon({
    iconUrl: marker,
    iconSize: [32, 32],
  });
  const details = [
    {
      title: "ip address",
      desc: countryInfo?.ip || "None",
    },
    {
      title: "location",
      desc: countryInfo?.location?.city || "None",
    },
    {
      title: "timezone",
      desc: countryInfo?.location?.timezone || "None",
    },
    {
      title: "isp",
      desc: countryInfo?.isp || "None",
    },
  ];
  const changeHandler = (e) => {
    setIp(e.target.value);
  };

  console.log(countryInfo);
  const fetchIP = async () => {
    if (ip) {
      const response = await fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=at_mM7SLhliUS6pIYcjcMvewlW2FeXSM&ipAddress=${ip}`
      );
      const data = await response.json();
      setLatLng([data?.location?.lat, data?.location?.lng]);
      setCountryInfo(data);
    }
  };

  const searchHandler = () => {
    fetchIP();
  };

  return (
    <div className="app">
      <div>
        <h1>Ip Address Tracker</h1>
        <div className="inputWrapper">
          <input type="text" onChange={changeHandler} value={ip} />
          <div onClick={searchHandler} color="black" className="searchIcon">
            <img src="images/icon-arrow.svg" alt="" />
          </div>
        </div>
        <div className="countryInfoWrapper">
          {details.map((d) => (
            <CountryInfoList title={d.title} desc={d.desc} />
          ))}
        </div>
      </div>
      <MapContainer
        center={latlng}
        zoom={4}
        scrollWheelZoom={true}
        className="map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        {countryInfo?.ip && (
          <Marker position={latlng} icon={myIcon}>
            <Popup>{countryInfo?.location?.city || "None"} </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

export default App;
