document.addEventListener("DOMContentLoaded", function() {
    function fetchWeather(city) {
        const apiKey = "a5f7ff1195a9c744bbb2565cffbc6708";
        const link = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}`;
        fetch(link)
            .then(response => {
                if (!response.ok) throw new Error("City not found");
                return response.json();
            })
            .then(data => {
                document.getElementById("location").innerHTML = data.name + ", " + data.sys.country;
                document.getElementById("temp").innerHTML = Math.round(data.main.temp - 273.15);
                document.getElementById("weather").innerHTML = data.weather[0].description;
                document.getElementById("icon").src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
            })
            .catch(() => {
                document.getElementById("location").innerHTML = "City not found";
                document.getElementById("temp").innerHTML = "";
                document.getElementById("weather").innerHTML = "";
                document.getElementById("icon").src = "";
            });
    }

    document.getElementById("locationForm").addEventListener("submit", function(e) {
        e.preventDefault();
        const city = document.getElementById("cityInput").value.trim();
        if (city) fetchWeather(city);
    });

    // Fetch default city on load
    fetchWeather("palghar");
});