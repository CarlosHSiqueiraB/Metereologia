const apiKey = "ee3888d88d8e3b8b118943fecc323111"; 

async function buscarClima() {
  const cidade = document.getElementById("cidade").value;
  const resultado = document.getElementById("resultado");

  if (!cidade) {
    alert("Digite uma cidade!");
    return;
  }

  try {
    
    const geoResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${cidade}&limit=1&appid=${apiKey}&lang=pt`
    );
    const geoData = await geoResponse.json();

    if (geoData.length === 0) {
      alert("Cidade não encontrada!");
      return;
    }

    const { lat, lon, name } = geoData[0];

   
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt`
    );
    const weatherData = await weatherResponse.json();

    
    document.getElementById("nome-cidade").textContent = `Tempo ${name}`;
    document.getElementById("temperatura").textContent = `${weatherData.main.temp.toFixed(1)} °C`;
    document.getElementById("descricao").textContent = weatherData.weather[0].description;
    document.getElementById("umidade").textContent = `Umidade: ${weatherData.main.humidity}%`;

    const iconCode = weatherData.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    document.getElementById("icone-clima").innerHTML = `<img src="${iconUrl}" alt="Ícone do tempo" />`;

    resultado.style.display = "block";

  } catch (error) {
    alert("Erro ao buscar clima.");
    console.error(error);
  }
}
