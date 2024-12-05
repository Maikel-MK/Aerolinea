//selectores 

const salidaInput = document.querySelector('#fecha-salida')
const regresoInput = document.querySelector('#fecha-regreso')
const destinoInput = document.querySelector('#destino')
const telefonoInput = document.querySelector('#telefono')
const correoInput = document.querySelector('#correo')
const pasajerosInput = document.querySelector('#pasajeros')
const formulario = document.querySelector('#nueva-cita')
const contenedorCitas = document.querySelector('#citas')
let editar


//evento
 document.addEventListener('DOMContentLoaded', function(){
    const hoy = new Date()
    const año = hoy.getFullYear()
    const mes = String(hoy.getMonth()+1).padStart(2, '0')
    const dia = String(hoy.getDate()).padStart(2, '0')

    const fechaActual = `${año}-${mes}-${dia}`

    salidaInput.setAttribute('min', fechaActual)

    salidaInput.addEventListener('change', function() {
        
        regresoInput.setAttribute('min', salidaInput.value)

        if (regresoInput.value < salidaInput.value) {
            regresoInput.value = ''
        }
    })

 })

 function validarEmail(correoInput) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
    return regex.test(correoInput)
}

telefono.addEventListener('input', (event) => {
    let valor = telefonoInput.value.replace(/\D/g, '') 
    
    if (valor.length > 4) {
        valor = valor.slice(0, 4) + '-' + valor.slice(4) 
    }
    
    if (valor.length > 12) {
        valor = valor.slice(0, 12) 
    }
    
    telefonoInput.value = valor
})

function validarTelefono(telefonoInput) {
   const regex = /^\d{4}-\d{7}$/ 

   return regex.test(telefonoInput)
}


//Clases

class citas{
    constructor(){
        this.citas = []// this apunta sin necesidad de crearlo otravez, llamando con .this
    }

    agregarCita(cita){//aqui en  las clases no hace falta poner funtion
        //this.citas.push(cita)
        this.citas = [...this.citas,cita]// ... es hacer la copia
        console.log(this.citas)
    } 

    eliminarCita(id){
        this.citas = this.citas.filter(citas=>citas.id !== id)
    }

    editarCita(cita){
        this.citas = this.citas.map(citas=>citas.id === cita.id ? cita : citas)
    }


}

class ui{   //ui = user interface

    imprimirAlerta(mensaje, tipo){
        const divMensaje = document.createElement('div')
        divMensaje.classList.add('text-center','alert','d-block','col-12')

        if(tipo==='error'){
            divMensaje.classList.add('alert-danger')
        }else{
            divMensaje.classList.add('alert-success')
        }

        //mostrar el mensaje de error en la interfaz

        divMensaje.textContent = mensaje

        //agregar el mensaje 
        document.querySelector('#contenido').insertBefore(divMensaje,document.querySelector('.agregar-cita'))

        setTimeout(()=>{
                divMensaje.remove()
        },3000)
    }


    imprimirCitas({citas}){
    //console.log('imprimircitas')
       this.limpiarHTML()

        citas.forEach(i=>{
            const {salida, regreso, telefono, destino, correo, pasajeros, id} = i

            const divCita = document.createElement('div')
            divCita.classList.add('cita','p-3')
                //estamos creando un atributo personalizado
                divCita.dataset.id = id

                //generar textos para las fichas de las citas

                const salidaParrafo = document.createElement('p')
                salidaParrafo.innerHTML =
                `<spand class="font-weight-bolder">Fecha de Salida: </span>${salida}`

                const regresoParrafo = document.createElement('p')
                regresoParrafo.innerHTML =
                `<spand class="font-weight-bolder">Fecha de Regreso :</span>${regreso}`


                const destinoParrafo = document.createElement('h2')
                destinoParrafo.classList.add('card-title','font-weight-bolder')
                destinoParrafo.textContent = destino


                const pasajerosParrafo = document.createElement('p')
                pasajerosParrafo.innerHTML =
                `<spand class="font-weight-bolder">Numero de Pasajeros: </span>${pasajeros}`

                const telefonoParrafo = document.createElement('p')
                telefonoParrafo.innerHTML =
                `<spand class="font-weight-bolder">Telefono: </span>${telefono}`

                const correoParrafo = document.createElement('p')
                correoParrafo.innerHTML =
                `<spand class="font-weight-bolder">Correo: </span>${correo}`

                const btnEliminar = document.createElement('button')
                btnEliminar.classList.add('btn','btn-danger','mr-2')
                btnEliminar.innerHTML ='Eliminar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
                btnEliminar.onclick = ()=> eliminarCita(id)

                const btnEditar = document.createElement('button')
                btnEditar.classList.add('btn','btn-info')
                btnEditar.innerHTML = 'Editar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'
                btnEditar.onclick = ()=> cargarEdicion(i)

                divCita.appendChild(destinoParrafo)
                divCita.appendChild(salidaParrafo)
                divCita.appendChild(regresoParrafo)
                divCita.appendChild(telefonoParrafo)
                divCita.appendChild(correoParrafo)
                divCita.appendChild(pasajerosParrafo)
                divCita.appendChild(btnEliminar)
                divCita.appendChild(btnEditar)

                contenedorCitas.appendChild(divCita)               

        })
    }

limpiarHTML(){
    while(contenedorCitas.firstChild){
        contenedorCitas.removeChild(contenedorCitas.firstChild)
        }
    }
}


const objCitas ={
        salida:'',
        regreso:'',
        telefono:'',
        destino:'',
        pasajeros:'',
        correo:'',
}


//instancio las clases

const useri = new ui()
//para mostrar, limpiar, borrar


const administrarCitas = new citas()
//administrarCitas


//eventos
eventos()
function eventos(){

    formulario.addEventListener('submit',nuevaCita)
    salidaInput.addEventListener('change', datosCita) //este toma entero
    regresoInput.addEventListener('change', datosCita)
    telefonoInput.addEventListener('change', datosCita)
    destinoInput.addEventListener('change', datosCita)
    correoInput.addEventListener('change', datosCita)
    pasajerosInput.addEventListener('change', datosCita)
}



function nuevaCita(e){
    e.preventDefault()
  //  console.log('nueva cita')

  const {salida, regreso, telefono, destino, correo, pasajeros} = objCitas

  if(salida==='' || regreso==='' || telefono==='' || destino===''|| correo===''|| pasajeros===''){
    //console.log('Todos los Campos son Obligatorios')
        useri.imprimirAlerta('Todos los campos son Obligatorios','error')
        return
    }else if(editar){
       // console.log('Estoy editando')
       formulario.querySelector('button[type=submit]').textContent = 'Crear Cita'
       editar = false
       administrarCitas.editarCita({...objCitas})
    
       //mensaje de datos correctos
       useri.imprimirAlerta('Se ha modificado la Reserva Correctamente')
    }else{
    //agregar al arreglo o crear nueva cita
   console.log('Estoy creando una vueva cita')

    objCitas.id = Date.now()  // para agregar de forma externa un campo en el objeto
      administrarCitas.agregarCita({...objCitas})//aqui  es para crear el duplicado del objeto que estamos haciendo
      useri.imprimirAlerta('Se ha agregado su Reserva Correctamente')

      //  console.log(objCitas)
    }


      //reset al formulario
      formulario.reset()
      reiniciarObjeto()
    useri.imprimirCitas(administrarCitas)
  
}

function datosCita(e){
    //console.log(e.target.name)//da el nombre del atributo
   objCitas[e.target.name] = e.target.value // aqui lo coloco de forma general con el e.target
   //console.log(objCitas)

}

function reiniciarObjeto(){
    objCitas.salida = ''
    objCitas.regreso = ''
    objCitas.telefono = ''
    objCitas.destino = ''
    objCitas.correo = ''
    objCitas.pasajeros = ''
}

function eliminarCita(id){
   // console.log('eliminar Cita')
    administrarCitas.eliminarCita(id)

    //mostrar mensaje para figback
    useri.imprimirAlerta('El Vuelo se ha eliminado Correctamente')

    //actualizar

    useri.imprimirCitas(administrarCitas)
}

function cargarEdicion(cita){
    console.log('editar citas')
    const {salida, regreso, telefono, destino, correo, pasajeros, id} = cita
console.log(cita)
    //llenar los imputs

    salidaInput.value = salida;
   // console.log(mascotaInput.value)
    regresoInput.value = regreso;
    telefonoInput.value = telefono
    destinoInput.value = destino
    correoInput.value = correo
    pasajerosInput.value = pasajeros

    //vamos a llenar el objeto

    objCitas.salida = salida
    objCitas.regreso = regreso
    objCitas.telefono = telefono
    objCitas.destino = destino
    objCitas.correo = correo
    objCitas.pasajeros = pasajeros
    objCitas.id = id
console.log(objCitas)
    //Cambiamos el texto del boton
    formulario.querySelector('button[type=submit]').textContent = 'Guardar'

    editar = true

}