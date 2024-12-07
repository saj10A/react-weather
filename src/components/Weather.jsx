import React, { useEffect, useState } from "react";
import PersianDate from "./PersianDate";
import { useDispatch, useSelector } from "react-redux";
import { getWeatherInfo } from "../redux/weather/weatherSlice";

const Weather = () => {
  const { loading, data, error } = useSelector((state) => state.weather);
  const dispatch = useDispatch();  

  const [backMode, setBackMode] = useState("usual");
  const [query, setQuery] = useState("");

  const handleGetWeather = (e) => {
    e.preventDefault();
    dispatch(getWeatherInfo(query));    
    setQuery("");
  };

  useEffect(() => {
    if(!data.main) return;

    let temp = data.main.temp;
    if(temp < 12) {
        setBackMode("cold");
    } else if(temp < 23) {
        setBackMode("usual");
    } else {
        setBackMode("warm");
    }
  }, [data]);

  return (
    <div className={`app pt-4 container-fluid back_${backMode}`}>
      <div className="row justify-content-center py-3">
        <div className="col-10 col-md-6 col-lg-4">
          <form onSubmit={handleGetWeather}>
            <input
              type="text"
              className="search_input w-100 text_color placeholder_color"
              placeholder={data.name || "نام شهر یا کشور"}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
        </div>
      </div>

      <div className="row justify-content-center py-3">
        <div className="col-11 col-md-8 col-lg-4">
          <h3 className="text-center text_color">
            <PersianDate />
          </h3>
        </div>
      </div>

      {loading ? (
        <div className="text-center text-secondary mt-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">loading...</span>
          </div>
        </div>
      ) : data.main ? (
        <>
          <div className="row justify-content-center py-3">
            <div className="col-9 col-md-6 col-lg-4">
              <div className="temprature_box pt-3">
                <span>{Math.round(data.main.temp)}</span> °C
              </div>
            </div>
          </div>

          <div className="row justify-content-center py-3">
            <div className="col-11 col-md-8 col-lg-4">
              <h1 className="text-center fa-3x lathin_text text_color">
                {data.weather[0].main}
              </h1>
            </div>
          </div>
        </>
      ) : error ? (
        <h3 className="text-center text_color">
          نام شهر یا کشور را به درستی وارد کنید
        </h3>
      ) : (
        <h3 className="text-center text_color">مکان موردنظر را جستجو کنید</h3>
      )}
    </div>
  );
};

export default Weather;