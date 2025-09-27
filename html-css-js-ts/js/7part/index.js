//aborto http
async function abort(){
    let controller = new AbortController();
    setTimeout(() => controller.abort(), 1000);

    try {
        let response = await fetch('https://api.github.com/repos/javascript-tutorial/es.javascript.info/commits?per_page=100', {
            signal: controller.signal
        });
        console.log(response.status);
    } catch(err) {
    if (err.name == 'AbortError') { // se maneja el abort()
            console.log("Aborted!");
        } else {
            throw err;
        }
    }
}

abort();

//opciones de fetch
async function fecthOptions(url){
    let response=await fetch(
        url,
        {
            referrer:'https://javascript.info/anotherpage',
            referrerPolicy:'strict-origin',
            mode:'cors',
            credentials:'include',
            cache:'no-cache'
        }
    );
}

//websocket *coneccion encriptada
let socket=new WebSocket(
    'ws://127.0.0.1:8000/ws'
);

socket.onopen = function(event) {
    console.log('Conexión establecida');
    socket.send('¡Hola servidor!');
};

socket.onmessage = function(event) {
    console.log('Mensaje recibido: ', event.data);
};

socket.onclose = function(event) {
    if (event.wasClean) {
        console.log('Conexión cerrada limpiamente');
    } else {
        console.error('Conexión cerrada con error');
    }
};

socket.onerror = function(error) {
    console.error('Error en la conexión: ', error);
};

socket.close(1000,'ok');