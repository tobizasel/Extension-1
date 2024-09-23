document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('input');

    input.addEventListener('change', () => {
        const url = input.value; // Obtén el valor del input

        chrome.runtime.sendMessage({ message: 'URL de un Twit', data: url }, (response) => {
            console.log('Respuesta del service worker:', response.response);
        });
    });
});