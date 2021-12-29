
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
            <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-6">
                <a className="navbar-brand" href="#search">
                    Previsão do Tempo
                </a>
            </nav>

            <main className="container" id="search">

                <div className="jumbotron mt-2">
                    <h1>Verifique agora a previsão do tempo na sua cidade!</h1>
                    <p className="lead">Digite a sua cidade e clique no botão pesquisar.</p>

                    <div className="row md-4">
                        <div className="col mb-6">
                            <div class="input-group mb-3">
                                <input type="text" class="form-control " aria-describedby="button" value={city} onChange={hundleCityChange}/>
                                <button class="bbtn btn btn-dark" onClick={searchWeather}> {isLoading ? 'Pesquisando..' : 'Pesquisar'}</button>
                            </div>
                            {
                                weatherForecast ? (
                                    <div className="mt-4 d-flex">
                                        <div className="col-sm-1">
                                            <img className="rounded float-left" src={weatherForecast.current.condition.icon} alt="Weather Icon" />
                                        </div>
                                        <div>
                                            <h3 className="mb-4">Hoje o dia está: {weatherForecast.current.condition.text} </h3>
                                            <p className="lead">Tempo: {weatherForecast.current.temp_c} Cº</p>
                                            <p className="lead">Valocidade: {weatherForecast.current.wind_kph} Km/h - {weatherForecast.current.wind_mph} Mi/h</p>
                                            <p className="lead">{weatherForecast.location.name} - {weatherForecast.location.region} - {weatherForecast.location.country}</p>
                                            <p className="lead">{weatherForecast.location.localtime}</p>
                                        </div>
                                    </div>
                                ) : null                                
                            }
                        </div>
                    </div>
                </div>
            </main>
            <footer className="footer-copyright text-center py-3">
                Desenvolvido por <strong>Erika Dias</strong> - Workshop EBAC
            </footer>
        </div>
    );
}

export default App;
