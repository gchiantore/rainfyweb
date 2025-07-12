export async function getForecast() {
    const LAT = -31.5833; // La Para, Córdoba
    const LON = -63.3833;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,weathercode,precipitation_probability_mean&timezone=America/Argentina/Cordoba`;

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Error al obtener pronóstico (${res.status})`);

        const data = await res.json();

        return data.daily; // contiene: time[], temperature_2m_max[], etc.
    } catch (error) {
        console.error("Error en getForecast:", error);
        return null;
    }
}

export function parseForecastData(daily) {
    const result = [];

    for (let i = 0; i < daily.time.length; i++) {
      result.push({
        date: daily.time[i],
        maxTemp: daily.temperature_2m_max[i],
        minTemp: daily.temperature_2m_min[i],
        wind: daily.windspeed_10m_max[i],
        rain: daily.precipitation_sum[i],
        humidity: daily.precipitation_probability_mean[i],
        icon: weatherCodeToIcon(daily.weathercode[i])
      });
    }

    return result;
  }

// Mapea el weathercode de Open-Meteo a íconos FontAwesome
function weatherCodeToIcon(code) {
    if ([0].includes(code)) return 'sun';
    if ([1, 2, 3].includes(code)) return 'cloud-sun';
    if ([45, 48].includes(code)) return 'smog';
    if ([51, 53, 55, 61, 63, 65].includes(code)) return 'cloud-rain';
    if ([66, 67, 80, 81, 82].includes(code)) return 'cloud-showers-heavy';
    if ([71, 73, 75, 77, 85, 86].includes(code)) return 'snowflake';
    if ([95, 96, 99].includes(code)) return 'bolt';
    return 'cloud'; // default
}