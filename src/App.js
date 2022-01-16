
import { useState } from "react";

function App() {

    const [city, setCity] = useState("");

    const [weatherForecast, setWeatherForecast] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    const searchWeather = () => {

        setIsLoading(true); 

        fetch(`https://api.weatherapi.com/v1/current.json?key=40970cb891974c189ce231903212610&q=${city}&lang=pt`)
        .then((response) => {
            if(response.status === 200){
                return response.json();
            }
        }).then((data) => {
            setWeatherForecast(data);
            setCity('') // Resetar o campo
            setIsLoading(false)
        })
    }

    const hundleCityChange = (event) => {
        setCity(event.target.value);
    }
    
    return (
        <div>
            <main>
                <nav class="navbar">
                    <h1>Verifique agora a previsão do tempo na sua cidade!</h1>
                </nav>     
                <div class="container">
                    <div class="container-fluid">
                        <div class="search">
                            <input type="text" value={city} onChange={hundleCityChange} placeholder="Digite o nome da cidade"/>
                            <button onClick={searchWeather}>{isLoading ? 'Pesquisando..' : 'Pesquisar'}</button>
                        </div>
                        <div>
                            {
                                weatherForecast ? (
                                    <div class="result">
                                        <div class="item1">
                                            <p>Tempo agora em {weatherForecast.location.name}</p>
                                        </div>
                                        <div class="item2">
                                            <img src={weatherForecast.current.condition.icon} alt="Weather Icon"/>
                                        </div>
                                        <div class="item3">
                                            <p>{weatherForecast.current.temp_c} Cº</p>
                                        </div>
                                        <div class="item4">
                                            <p>{weatherForecast.current.condition.text}</p>
                                            <p>Vento: {weatherForecast.current.wind_kph} Km/h - {weatherForecast.current.wind_mph} Mi/h</p>
                                            <p>Data/Hora: {weatherForecast.location.localtime}</p>
                                        </div>
                                    </div>
                                ) : null
                            }
                        </div>
                    </div>
                </div>
            </main>
            <footer class="footer">
                Desenvolvido por Erika Dias - Workshop EBAC
            </footer>
        </div>
    );
}

export default App;
