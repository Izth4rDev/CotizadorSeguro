//constructores

function Seguro (marca, year, tipo){

    this.marca = marca;
    this.year = year;
    this.tipo = tipo; 

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
        console.log(opcion);
        combo.appendChild(opcion);
    }



}

const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {

    ui.llenarOpciones();

});