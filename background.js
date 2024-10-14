chrome.runtime.onInstalled.addListener(async () => {
  console.log('Extensión instalada');
});

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  console.log('Mensaje recibido del popup:', request.message);
  console.log('Datos:', request.data); // Aquí tienes los datos enviados

  
  try {
    const resultado = await busqueda(request.tweet, request.id);
    console.log('Resultado de la búsqueda:', resultado.resultado);
    sendResponse({ response: resultado });
} catch (error) {
    console.error('Error en la búsqueda:', error);
}

  // Puedes hacer algo con los datos, y luego enviar una respuesta
});

const busqueda = async () => {

  const query = new URLSearchParams({
    tweet: tweet,
    id: id
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
