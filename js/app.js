//constructores

function Seguro (marca, year, tipo){

    this.marca = marca;
    this.year = year;
    this.tipo = tipo; 

}
//Realiza la cotizacion con los datos
Seguro.prototype.cotizarSeguro = function () {

    console.log(`tipo ${this.marca}`);

    let cantidad;
    const base = 2000;
    switch(this.marca){

        case '1': cantidad = base *1.15;
                break;
        case '2': cantidad = base * 1.05;
                break; 
        case '3': cantidad = base *1.32;

        default: 
        break;
    }
    //por cada año mas viejo el seguro le hara un descuento

    //leer año
    const diferencia = new Date().getFullYear() - this.year; 
    //calculo de descuento por año
    cantidad -= (cantidad*(diferencia * 0.03));
 

    /*
    si el seguro es basico se multiplica x 30% mas
    si el seguro es completo se multiplica x 50% mas
    */
    console.log(`tipo ${this.marca} precio: ${cantidad} sin cobro por tipo`);

    console.log(this.tipo);

    if(this.tipo === 'basico'){

        cantidad *=  1.3;

    }else if(this.tipo === 'completo'){

        cantidad *= 1.5;
    }

    return cantidad;

}



function UI (){


}

//llena las opciones del select
UI.prototype.llenarOpciones = () => {

    const max = new Date().getFullYear();
    const min = max - 20;

    const combo = document.querySelector('#year');

    for(let i= max; i > min; i--){

        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.innerText = `${i}`;
        combo.appendChild(opcion);
    }

}

//muestra alertas en pantalla

UI.prototype.mostrarMensaje = (mensaje, tipo) =>{

    const div = document.createElement('div');

    if(tipo === 'error'){

        div.classList.add('error');

    }else{

        div.classList.add('correcto');
    }
        
    div.classList.add('mensaje','mt-10');
    div.textContent = mensaje;

    //insertar en HTML
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div,document.querySelector('#resultado'));

    setTimeout(()=>{

        div.remove();

    },3000);


}

UI.prototype.mostrarResultado = (seguro, total) =>{

    const {marca, year, tipo} = seguro;
    let textoMarca;
    switch(marca){
        case '1': textoMarca = 'Americano';
        break;
        case '2': textoMarca = 'Asiatico';
        break;
        case '3': textoMarca = 'Europeo';
        break;
        default:
            break;
    }

    const div = document.createElement('div');
    div.classList.add('mt-10');
    div.innerHTML=`

    <p class="header"> tu Resumen </p>
    <p class="font-bold">Marca:<span class="font-normal">${textoMarca}</span></p>
    <p class="font-bold">Año:<span class="font-normal">${year}</span></p>
    <p class="font-bold">Tipo Seguro:<span class="font-normal capitalize">${tipo}</span></p>
    <p class="font-bold">Total: $ <span class="font-normal">${total}</span></p>
    `;

    const resultadoDiv = document.querySelector('#resultado');

    //mostrar spinner
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';

    setTimeout (() =>{

        spinner.style.display = 'none';//se borra el spinner 
        resultadoDiv.appendChild(div);//pero se muestra el resultado

    },3000);
}

const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {

    ui.llenarOpciones();

});

//event listener

eventListener();

function eventListener (){

    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);

}

function cotizarSeguro (e){

    e.preventDefault();

    //leer la marca seleccionada 
    const marca = document.querySelector('#marca').value;
    //leer año seleccionado
    const year= document.querySelector('#year').value;

    //leer tipo de covertura
    const tipo = document.querySelector('input[name="tipo"]:checked').value; //'input[name="tipo"]:checked' nos permite seleccionar el valor de un radio cuyo name sea = tipo
    

    if(marca === '' || year === '' || tipo === ''){

        console.log('no paso la validacion');
        ui.mostrarMensaje('todos los campos son obligatorios', 'error');
        return;

    }

        ui.mostrarMensaje('cotizando.....', 'existo');
        //eliminar resultado anterior (limpiar vista)
        const resultado = document.querySelector('#resultado div');
        if(resultado !== null){
            resultado.remove();
        }

        //instanciar el seguro
        const seguro = new Seguro(marca, year, tipo);
        const total = seguro.cotizarSeguro();
        //Utilizar el prototype que va a cotizar

        ui.mostrarResultado(seguro, total);
    
}


