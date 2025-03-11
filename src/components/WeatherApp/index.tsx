import React, { useState, useEffect, memo } from 'react';
import axios from 'axios';
import styles from './index.less';
import { translateWeatherDescription } from './config';

const YOU_API_KEY = 'f4efab1249b3ea1c3c089c51595d9608';
const YOU_LOCATION = 'Xian';

const WeatherApp: React.FC<any> = (props: any) => {
    const { style, ...rest } = props;
    const [weatherData, setWeatherData] = useState<any>(null);
    const [error, setError] = useState<any>(null);

    const fetchWeather = async () => {
        try {
            const response = await axios.get(`/weather?q=${YOU_LOCATION}&appid=${YOU_API_KEY}&units=metric`);
            setWeatherData(response.data);
        } catch (err) {
            setError(err);
        }
    };
    // 初始化天气
    useEffect(() => {
        fetchWeather();
    }, []);
    // 如果接口报错返回
    if (error) {
        return null;
    };
    // 接口pendding
    if (!weatherData) {
        return null;
    };

    return <div className={`flex-box ${styles.weatherBox}`} style={{ ...style }} {...rest}>
        {/* <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="" /> */}
        {translateWeatherDescription(weatherData.weather[0].description)}
        <div className="weather-speed">风速: {weatherData.wind.speed} m/s</div>
    </div>
}

export default memo(WeatherApp);