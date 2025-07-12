import { loadCss } from '../../utils/loadcss.util.js';
import { getMockSpots } from './mapa.api.js';

export async function render(container) {
  loadCss('css/modules/mapa.css');

  container.innerHTML = `
    <section class="mapa-view">
      <h1 class="mapa-title">
        <i class="fa-solid fa-map-location-dot"></i> Registro de lluvias
      </h1>
      <div id="map" class="map-container"></div>
    </section>
  `;

  const map = L.map('map').setView([-30.8922, -62.9994], 11);


  // Solución a posibles problemas de render
  setTimeout(() => {
    map.invalidateSize();
  }, 300);

  // Tile rápido
  L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; Stadia Maps, &copy; OpenMapTiles &copy; OpenStreetMap contributors',
    maxZoom: 20
  }).addTo(map);
  

  const spots = await getMockSpots();

  spots.forEach(spot => {
    const color = getColorByRain(spot.mm);

    L.circleMarker([spot.lat, spot.lon], {
      radius: 10,
      color,
      fillColor: color,
      fillOpacity: 0.7
    })
      .addTo(map)
      .bindPopup(`<strong>${spot.nombre}</strong><br>${spot.mm} mm`);
  });
}

function getColorByRain(mm) {
  if (mm < 10) return '#b1ce57';
  if (mm < 30) return '#e3c13c';
  return '#e41c19';
}