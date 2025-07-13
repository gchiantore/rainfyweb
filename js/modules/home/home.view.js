
import { loadCss } from '../../utils/loadcss.util.js';
import { getForecast, parseForecastData } from './home.api.js';

export async function render(container) {
  loadCss('css/modules/home.css');
  container.innerHTML = `
    <section class="home-view">
      <div class="home-summary">
        <div class="location-name"><i class="fa-regular fa-earth-americas"></i> La Para </div>
        <div class="temp-actual">--°C</div>
        <div class="estado rain-sumary">Cargando...</div>
        <div class="rango">Máx: --°C · Mín: --°C</div>
      </div>

      <h2 class="forecast-title">Próximos días</h2>

      <div class="forecast-list">
      </div>
  `;
  const rawForecast = await getForecast();
  if (rawForecast && Array.isArray(rawForecast.time)) {
    const dias = parseForecastData(rawForecast);
    renderResumenActual(dias[0]); // 👈 esto es nuevo
    renderPronostico(dias);
  }
}

function renderPronostico(dias) {
  const list = document.querySelector('.forecast-list');
  list.innerHTML = '';

  dias.forEach(dia => {
    const row = document.createElement('div');
    row.className = 'forecast-row';

    row.innerHTML = `
      <span class="day">${getDiaCorto(dia.date)}</span>
      <i class="fas fa-${dia.icon}"></i>
      <span class="temps">${dia.maxTemp}°/${dia.minTemp}°</span>
      <span class="wind"><i class="fas fa-wind"></i> ${dia.wind} km/h</span>
      <span class="humidity"><i class="fas fa-tint"></i> ${dia.humidity}%</span>
      <span class="rain"><i class="fas fa-cloud-rain"></i> ${dia.rain} mm</span>
    `;

    list.appendChild(row);
  });
}

function getDiaCorto(fechaStr) {
  const fecha = new Date(fechaStr + 'T00:00:00');
return fecha.toLocaleDateString('es-AR', { 
  weekday: 'short', 
  timeZone: 'America/Argentina/Cordoba' 
}).replace('.', '');
}

function renderResumenActual(dia) {
  const resumen = document.querySelector('.home-summary');
  if (!resumen || !dia) return;

  resumen.innerHTML = `
    <div class="location-name"><i class="fa-regular fa-earth-americas"></i> La Para</div>
    <div class="temp-actual">${dia.maxTemp}°</div>
    <div class="estado rain-sumary">
      <i class="fas fa-${dia.icon}"></i> ${descripcionClima(dia.icon)}
    </div>
    <div class="rango">Máx: ${dia.maxTemp}° · Mín: ${dia.minTemp}°</div>
  `;
}

// Traduce el ícono a una descripción legible
function descripcionClima(icon) {
  switch (icon) {
    case 'sun': return 'Despejado';
    case 'cloud-sun': return 'Parcialmente nublado';
    case 'cloud': return 'Nublado';
    case 'cloud-rain': return 'Lluvia ligera';
    case 'cloud-showers-heavy': return 'Lluvia fuerte';
    case 'bolt': return 'Tormenta';
    case 'snowflake': return 'Nieve';
    case 'smog': return 'Neblina';
    default: return 'Condición desconocida';
  }
}
