// selecciono los elementos donde se van a mostrar los datos
const nameEl = document.querySelector('.name');
const blogEl = document.querySelector('.blog');
const locationEl = document.querySelector('.location');

// muestro mensajes mientras se cargan los datos
nameEl.textContent = 'Cargando nombre...';
blogEl.textContent = 'Cargando blog...';
locationEl.textContent = 'Cargando ubicación...';

// pido los datos desde la API de GitHub
fetch('https://api.github.com/users/octocat')
  .then(response => {
    // si algo sale mal con la respuesta, lanzo un error
    if (!response.ok) throw new Error('Error al obtener los datos');
    return response.json();
  })
  .then(data => {
    // si hay nombre lo muestro, si no, digo que no hay
    nameEl.textContent = data.name || 'Sin nombre';

    // si hay blog, lo muestro como link, si no, digo que no hay
    if (data.blog) {
      blogEl.innerHTML = `<a href="${data.blog}" target="_blank">${data.blog}</a>`;
    } else {
      blogEl.textContent = 'Sin blog';
    }

    // si hay ubicación, la muestro, si no, digo que no hay
    locationEl.textContent = data.location || 'Sin ubicación';
  })
  .catch(error => {
    // si algo falla, muestro mensaje de error
    nameEl.textContent = 'Error';
    blogEl.textContent = error.message;
    locationEl.textContent = '';
  });
