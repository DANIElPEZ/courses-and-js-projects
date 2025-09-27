/*almacenar datos*/
//cookies
console.log(document.cookie);

//document.cookie = "domain=reflex.run; secure; samesite=strict"; para https

document.cookie = "user=xd; path=/; expires=Thu, 15 Aug 2024 06:14:09 GMT";
console.log(document.cookie);

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

console.log(getCookie('user'));

function setCookie(name, value, options={}){
    options={
        path:'/',
        ...options
    };

    if(options.expires instanceof Date){
        options.expires = options.expires.toUTCString();
    }

    let updateCookie = encodeURIComponent(name) + '=' +encodeURIComponent(value);

    for(let optionKey in options){
        updateCookie+="; "+optionKey;
        let optionValue = options[optionKey];
        if(optionValue !== true){
            updateCookie+='='+optionValue;
        }
    }

    document.cookie = updateCookie;
}

setCookie('user', 'dx', {secure:true, 'max-age':3600});

console.log(document.cookie);

//guardar datos clave-valor
localStorage.clear();

localStorage.setItem('test', JSON.stringify(2));
console.log(JSON.parse(localStorage.getItem('test')));
localStorage.removeItem('test');

localStorage.setItem('life', JSON.stringify(2));
localStorage.setItem('die', JSON.stringify(false));

for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = JSON.parse(localStorage.getItem(key));
    console.log(`${key}: ${value}`);
}

/*solicitudes de red*/
//get
async function doRequest(url){
    let response=await fetch(url);
    if (response.ok){
        let json =await response.status;
        console.log(json);
    } else {
        console.log(`Error-HTTP ${response.status}`);
    }
}

doRequest('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');

//post
async function doPost(content) {
    try {
        let postResponse = await fetch(
            'http://127.0.0.1:8000/enviar',  // Asegúrate de que la URL es correcta
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(content)
            }
        );

        if (!postResponse.ok) {
            throw new Error(`HTTP error! status: ${postResponse.status}`);
        }

        let result = await postResponse.status;
        console.log(result);
    } catch (error) {
        console.error('Error during fetch');
    }
}

let user = {
    nombre: 'Pepito',
    clave: '12345'
};

doPost(user);

//Post de formularios
async function RePost(content) {
    try {
        let postResponse = await fetch(
            'http://127.0.0.1:8000/enviar',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(content)
            }
        );

        if (!postResponse.ok) {
            throw new Error(`HTTP error! status: ${postResponse.status}`);
        }

        let result = await postResponse.status; // Leer el cuerpo de la respuesta como JSON
        console.log(result);
    } catch (error) {
        console.error('Error during fetch', error);
    }
}

document.getElementById('form').addEventListener(
    'submit',
    function(event){
        event.preventDefault();

        let user={
            nombre:document.getElementById('nombre').value,
            clave:document.getElementById('clave').value
        };

        RePost(user);
    }
);

//solicitud de descarga
async function Download(){
    let response=await fetch('https://api.github.com/repos/javascript-tutorial/es.javascript.info/commits?per_page=100');
    const reader=response.body.getReader();

    const contentL=+response.headers.get('Content-Lenght');
    let receivedLength=0;

    while(true){
        const {done, value}=await reader.read();

        if(done){
            break;
        }

        receivedLength += value.length;
    }

    console.log(`Recibí ${receivedLength} de ${contentL}`);
}

Download();