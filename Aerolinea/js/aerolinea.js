const salida = document.querySelector('#fecha-salida')
const regreso = document.querySelector('#fecha-regreso')
const destino = document.querySelector('#destino')
const pasajeros = document.querySelector('#pasajeros')
const email = document.querySelector('#email')
const telefono = document.querySelector('#telefono')
const Boleto = document.querySelector('#resultado')
const formVuelo = document.querySelector('#form-vuelo')
const notificacion = document.querySelector('#notificacion')

regreso.setAttribute('min', new Date().toISOString().split('T')[0])

salida.addEventListener('change', () => {
    const fechaSeleccionada = new Date(salida.value)
    const fechaHoy = new Date()
    fechaHoy.setHours(0, 0, 0, 0)

    if (fechaSeleccionada < fechaHoy) {
        mostrarNotificacion('La fecha de salida no puede ser anterior a hoy.', 'error')
        salida.value = ''
        regreso.value = ''
        regreso.setAttribute('min', fechaHoy.toISOString().split('T')[0])
        return;
    }

    const RegresoMin = new Date(fechaSeleccionada)
    RegresoMin.setDate(RegresoMin.getDate() + 1) 
    regreso.setAttribute('min', RegresoMin.toISOString().split('T')[0])

    if (new Date(regreso.value) < RegresoMin) {
        regreso.value = ''
        mostrarNotificacion('La fecha de regreso debe ser posterior a la fecha de salida.', 'error')
    }
})

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
    return regex.test(email)
}

telefono.addEventListener('input', (event) => {
    let valor = telefono.value.replace(/\D/g, '') 
    
    if (valor.length > 4) {
        valor = valor.slice(0, 4) + '-' + valor.slice(4) 
    }
    
    if (valor.length > 12) {
        valor = valor.slice(0, 12) 
    }
    
    telefono.value = valor
})

function validarTelefono(telefono) {
   const regex = /^\d{4}-\d{7}$/ 

   return regex.test(telefono)
}

function mostrarNotificacion(mensaje, tipo) {
    notificacion.textContent = mensaje;
    notificacion.style.display = 'block';
    notificacion.setAttribute('role', 'alert'); 

    if (tipo === 'error') {
        notificacion.style.color = 'red';
        notificacion.style.borderColor = 'red';
        if (mensaje.includes('correo electrónico')) {
            email.classList.add('error');
        } else {
            email.classList.remove('error');
        }
        if (mensaje.includes('número de teléfono')) {
            telefono.classList.add('error');
        } else {
            telefono.classList.remove('error');
        }
    } else if (tipo === 'success') {
        notificacion.style.color = 'green';
        notificacion.style.borderColor = 'green';
    }

    setTimeout(() => {
        notificacion.style.display = 'none';
    }, 3000);
}

function actualizarBoleto() {
    Boleto.style.display = 'block';

    const fechaSalida = salida.value || 'No especificada';
    const fechaRegreso = regreso.value || 'No especificada';

    Boleto.innerHTML = `
        <h2>Información de la Reserva:</h2>
        <p><strong>Fecha de Salida:</strong> ${fechaSalida}</p>
        <p><strong>Fecha de Regreso:</strong> ${fechaRegreso}</p>
        <p><strong>Destino:</strong> ${destino.value}</p>
        <p><strong>Cantidad de Pasajeros:</strong> ${pasajeros.value}</p>
        <p><strong>Correo Electrónico:</strong> ${email.value}</p>
        <p><strong>Teléfono:</strong> ${telefono.value}</p>
    `;

    mostrarNotificacion('Vuelo reservado con éxito', 'success'); 
}

formVuelo.addEventListener('submit', (e) => {
   e.preventDefault() 

   if (!validarEmail(email.value)) {
       mostrarNotificacion('Por favor, ingresa un correo electrónico válido.', 'error')
       return 
   }

   // Validar número de teléfono
   if (!validarTelefono(telefono.value)) {
       mostrarNotificacion('Por favor, ingresa un número de teléfono válido en el formato xxxx-xxxxxxx.', 'error')
       return 
   }

   actualizarBoleto() 
})

// agregar boton de ediatar reserva