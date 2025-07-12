const views = {
    home: () => import('./modules/home/home.view.js'),
    mapa: () => import('./modules/mapa/mapa.view.js'),
    login: () => import('./modules/login/login.view.js'),
    ciudad: () => import('./modules/ciudad/ciudad.view.js'),
    spot: () => import('./modules/spot/spot.view.js'),
    stats: () => import('./modules/stats/stats.view.js')
  };
  
  export async function loadView(name) {
    const view = views[name];
    if (!view) return;
  
    const module = await view();
    const container = document.getElementById('app');
    container.innerHTML = '';
    module.render(container);
  }