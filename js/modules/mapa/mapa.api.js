/**
 * Retorna una lista de spots simulados con datos de lluvia (mock).
 * Cada spot tiene: latitud, longitud, nombre y milímetros registrados.
 */
export async function getMockSpots() {
    return [
      {
        nombre: 'La Para',
        lat: -30.8922,
        lon: -62.9994,
        mm: 37
      },
      {
        nombre: 'El Tostado',
        lat: -30.9969,
        lon: -63.0506,
        mm: 45
      },
      {
        nombre: 'La Refalada',
        lat: -30.9847,
        lon: -63.0161,
        mm: 42
      },
      {
        nombre: 'Toro Pujio',
        lat: -31.1036,
        lon: -62.9864,
        mm: 40
      },
      {
        nombre: 'Fontana',
        lat: -30.8944,
        lon: -63.1181,
        mm: 29
      },
      {
        nombre: 'Campo El Tolo',
        lat: -30.8208,
        lon: -62.8839,
        mm: 47
      },
      {
        nombre: 'Lomas del Trozo',
        lat: -30.7764,
        lon: -63.0144,
        mm: 58
      }
    ];
  }