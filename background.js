chrome.runtime.onInstalled.addListener(() => {
    console.log('Extensión instalada');
  });

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Mensaje recibido del popup:', request.message);
    console.log('Datos:', request.data); // Aquí tienes los datos enviados

    // Puedes hacer algo con los datos, y luego enviar una respuesta
    sendResponse({ response: 'Datos recibidos: ' + request.data });
});