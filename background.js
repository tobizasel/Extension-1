chrome.runtime.onInstalled.addListener(async () => {
  console.log('Extensión instalada');
});

chrome.runtime.onConnect.addListener((port) => {
  console.assert(port.name === "search");
  
  port.onMessage.addListener(async (request) => {
    if (!request.tweet) {
      console.error("Los datos recibidos no son válidos:", request);
      port.postMessage({ error: 'Datos no válidos' });
      return;
    }

    console.log('Mensaje recibido del content-script:', request);

    try {
      const resultado = await busqueda(request.tweet, request.id, request.autor);
      console.log('20BG: Resultado de la búsqueda:', resultado);

      if (resultado && resultado.resultado) {
        console.log("RESULTADO",resultado);
        port.postMessage({ resultado: resultado });
      } else {
        port.postMessage({ error: 'No se encontró un resultado' });
      }
    } catch (error) {
      console.error('Error en la búsqueda:', error);
      port.postMessage({ error: 'Error en la búsqueda' });
    }
  });
});

const busqueda = async (tweet,id, autor) => {

  const query = new URLSearchParams({
    tweet: tweet,
    id: id,
    autor: autor
  }).toString();

  try {
      const response = await fetch(`http://localhost:5000/api?${query}`);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json(); // Asumiendo que la respuesta es JSON
      return data;
  } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Lanzar el error para que se maneje en onInstalled
  }
}
