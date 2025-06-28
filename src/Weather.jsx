import React, { useEffect, useState } from "react";

const Weather = () => {
  const [input, setInput] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [data, setData] = useState({
    temperature: "",
    humidity: "",
    condition: "",
    windSpeed: "",
  });
  const onChange = (e) => {
    setButtonClicked(false);
    setInput(e.target.value);
  };
  const onClick = (e) => {
    setButtonClicked(true);
  };
  useEffect(()=>{
   
  })
  useEffect(() => {
    const fecthData = async () => {
      try{  
      let response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=b720f0f38ffc42a29af150859252806&q=${input}`
      );
      const data= await response.json()
      if(data.error.code==1006){
        alert("Failed to fetch weatherdata")
      }
    
      else{
      setData({
          temperature: `${data.current.temp_c}°C`,
          humidity: `${data.current.humidity}%`,
          condition: data.current.condition.text,
          windSpeed: `${data.current.wind_kph} kph`,
        })
    }
    }catch(e){
        console.log(e)
    }
    };
    fecthData()
  }, [buttonClicked]);

  return (
    <div>
      <div>
        <input type="text" value={input} onChange={onChange} />
        <button onClick={onClick}>Search</button>
      </div>
      <div>
        <div>
          <h2>Tempearature</h2> <p>{data.temperature}</p>
        </div>
        <div>
          <h2>Humidity</h2> <p>{data.humidity}</p>
        </div>
        <div>
          <h2>Condition</h2> <p>{data.condition}</p>
        </div>
        <div>
          <h2>WindSpeed</h2> <p>{data.windSpeed}</p>
        </div>
      </div>
    </div>
  );
};

export default Weather;
