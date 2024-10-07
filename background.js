chrome.runtime.onInstalled.addListener(async () => {
  console.log('Extensión instalada');
  try {
      const resultado = await busqueda();
      console.log('Resultado de la búsqueda:', resultado.resultado);
  } catch (error) {
      console.error('Error en la búsqueda:', error);
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Mensaje recibido del popup:', request.message);
  console.log('Datos:', request.data); // Aquí tienes los datos enviados

  // Puedes hacer algo con los datos, y luego enviar una respuesta
  sendResponse({ response: 'Datos recibidos: ' + request.data });
});

const busqueda = async () => {
  try {
      const response = await fetch("http://localhost:5000/api");
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
