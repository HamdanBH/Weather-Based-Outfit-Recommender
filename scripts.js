const apiKey = "52439cd14754e6f3b3bf7d362ad3f5d9"; // Replace with your OpenWeatherMap API key

// Function to fetch weather data
async function fetchWeather(location) {
    document.getElementById('loadingSpinner').style.display = "block"; // Show spinner
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            const temperature = data.main.temp;
            displayWeather(temperature);
        } else {
            document.getElementById('weatherInfo').innerHTML = "Location not found. Please try again.";
            document.getElementById('clothingSuggestion').innerHTML = "";
            document.getElementById('outfitImage').style.display = "none";
        }
    } catch (error) {
        document.getElementById('weatherInfo').innerHTML = "Error fetching weather data. Please try again later.";
        document.getElementById('clothingSuggestion').innerHTML = "";
        document.getElementById('outfitImage').style.display = "none";
    }

    document.getElementById('loadingSpinner').style.display = "none"; // Hide spinner
}

// Function to display the weather and clothing suggestion
function displayWeather(temperature) {
    document.getElementById('weatherInfo').classList.add('visible');
    document.getElementById('weatherInfo').innerHTML = `Current Temperature: ${temperature}°C`;

    // Suggest clothing based on the temperature
    let clothingSuggestion = "";
    let outfitImage = "";
    if (temperature < 10) {
        clothingSuggestion = "It's quite cold! Wear a jacket or coat.";
        outfitImage = "https://i.pinimg.com/736x/f1/0c/21/f10c21306235fe4c0182da74afb9a45d.jpg"; // Online image for cold weather
        document.body.classList.add('cold');
    } else if (temperature >= 10 && temperature <= 20) {
        clothingSuggestion = "It's a bit chilly. A sweater or light jacket would be good.";
        outfitImage = "https://wildcraft.com/media/mageplaza/blog/post/8/_/8_winter_outfits.jpg"; // Online image for chilly weather
        document.body.classList.remove('cold');
    } else if (temperature > 20 && temperature <= 30) {
        clothingSuggestion = "The weather is warm! A t-shirt and shorts would be great.";
        outfitImage = "https://i.pinimg.com/736x/4c/51/7a/4c517a70dc5bbe53b62adc1d8a40aa35.jpg"; // Online image for warm weather
        document.body.classList.remove('cold');
    } else {
        clothingSuggestion = "It's hot! Wear light clothes like a tank top and shorts.";
        outfitImage = "https://img.damensch.com/damensch/cms-media/blog-images/Tips-on-how-to-rock-that-tank-top-this-summer.jpg"; // Online image for hot weather
        document.body.classList.remove('cold');
    }

    // Show clothing suggestion and outfit image
    document.getElementById('clothingSuggestion').classList.add('visible');
    document.getElementById('clothingSuggestion').innerHTML = clothingSuggestion;

    const outfitImg = document.getElementById('outfitImg');
    outfitImg.src = outfitImage;
    outfitImg.style.display = "block";  // Show image
    document.getElementById('outfitImage').classList.add('visible');
}

// Event listener for the 'Get Weather' button
document.getElementById('getWeather').addEventListener('click', () => {
    const location = document.getElementById('location').value;
    if (location) {
        fetchWeather(location);
    } else {
        alert("Please enter a location.");
    }
});
