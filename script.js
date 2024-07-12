document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const reporte = document.getElementById('reporte').value;
    const webhookURL = 'https://discord.com/api/webhooks/1261168172350967890/muJUC3keButwdk0kYsrcA12KEP1BYxBCOfNgL6kwzk-ZsxDXMbuB4IJOY-foRV8V7GYR';

    function mostrarError(elemento, mensaje) {
        const mensajeElemento = document.getElementById(elemento);
        mensajeElemento.innerText = mensaje;

        mensajeElemento.classList.add('error-mensaje');
    }

    function ocultarError(elemento, mensaje) {
        const mensajeElemento = document.getElementById(elemento);
        mensajeElemento.innerText = '';

        mensajeElemento.classList.remove('error-mensaje');
    }

    if (nombre.trim() === '') {
        mostrarError('mensaje-nombre', 'Proporciona tu nombre.*');
        return;
    } else {
        ocultarError('mensaje-nombre');
    }

    if (correo.trim() === '') {
        mostrarError('mensaje-correo', 'Proporciona tu correo.*');
        return;
    } else {
        ocultarError('mensaje-correo');
    }

    if (reporte.trim() === '') {
        mostrarError('mensaje-reporte', 'Proporciona tu reporte.*');
        return;
    } else {
        ocultarError('mensaje-reporte');
    }

    const data = {
        embeds: [{
           title: `**Reporte Nene 2.0**`,
           fields: [
            { name: `<:nombre:1258874000994471986> | Nombre:`, value: `${nombre}` },
            { name: `<:correo:1258873856576327690> | Correo:`, value: `${correo}` },
            { name: `<:reported:1258874106015645808> | Asunto:`, value: `${reporte}` },
           ],
           thumbnail: {
            url: `https://cdn.discordapp.com/attachments/1256676366993064026/1258876035164934274/78bf843475bd589a636ee5e5f65c9d35.gif?ex=6689a32b&is=668851ab&hm=86edce64a22d8f942420e4104c5b7ed37405f538ab515df0a2399491840239f1&`,
           },
           footer: {
            text: ` Reporte De ${nombre}`,
            icon_url: `https://cdn.discordapp.com/attachments/1256676366993064026/1258876035512930455/729883918295236649.png?ex=6689a32b&is=668851ab&hm=af235a69a4f3c8585ea9916490d65d4b3282c8b72361f6816233b21edd2a71f0&`,
           },
           timestamp: new Date().toISOString()
        }]
    };

    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al enviar mensaje a Discord');
        }
        document.getElementById('reporte-enviado').style.display = 'block';
        document.getElementById('nombre').value = '';
        document.getElementById('correo').value = '';
        document.getElementById('reporte').value = '';

        document.body.classList.add('enviado-activo');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al enviar el mensaje a Discord');
    });
});
