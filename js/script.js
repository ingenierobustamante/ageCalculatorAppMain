let tituloMsg = document.querySelectorAll('.caja__day__h2');
let inputDato = document.querySelectorAll('.caja__day__input');
let requerido = document.querySelectorAll('.required');
let resultado = document.querySelectorAll('span');

let fechaHoy = new Date();
let fechaNac;
let totalDiasMes = new Date(fechaHoy.getFullYear(),fechaHoy.getMonth()+1,0).getDate();
let contador, index;
let mesValido, agnoValido;

for ( index = 0 ; index < 3 ; index++)
    resultado[index].innerText = '--';

document.getElementById('contactForm').addEventListener('submit', (evt) =>{
    evt.preventDefault();
    contador = 0;
    fechaNac  = new Date(inputDato[2].value, inputDato[1].value,0);
    console.log(fechaNac.getMonth()+' - '+fechaNac.getDate());
    valCamposVacios();
    inputDato[2].value != '' ? valYear() : '';
    inputDato[1].value != '' ? valMonth() : '';
    inputDato[0].value != '' ? valDay() : '';
    contador === 0 ? calculaEdad() : '';

});

function datosError(pos, mensaje){
    tituloMsg[pos].style.color = 'hsl(0, 100%, 67%)';
    inputDato[pos].style.outlineColor = 'hsl(0, 100%, 67%)';
    requerido[pos].style.display = 'block';
    requerido[pos].innerText = mensaje;
}

function datosOK(pos){
    tituloMsg[pos].style.color = 'hsl(0, 1%, 44%)';
    inputDato[pos].style.outlineColor = 'hsl(0, 0%, 94%)';
    requerido[pos].style.display = 'none';
}

function valCamposVacios(){
    for ( index = 0 ; index < 3 ; index++){
        if ( inputDato[index].value == '' ){
            datosError(index, 'this field is required');
            contador++;
        }else{
            datosOK(index);
        }
    }
}

function valYear(){
    if ( parseInt(inputDato[2].value) > fechaHoy.getFullYear() ){
        datosError(2, 'Must be in the past');
        agnoValido = false;
        contador++;
    }else{
        datosOK(2);
        agnoValido = true;
    }
}

function valMonth(){
    if ( ( parseInt(inputDato[1].value) < 1 ) || ( parseInt(inputDato[1].value) > 12 ) ){
        datosError(1,'Must be a valid month');
        mesValido = false;
        contador++;
    }else{
        datosOK(1);
        mesValido = true;
    }
}

function valDay(){
    if ( mesValido && agnoValido ){
        if ( parseInt(inputDato[0].value) > fechaNac.getDate() ){
            datosError(0,'Must be a valid date');
            tituloMsg[1].style.color = 'hsl(0, 100%, 67%)';
            inputDato[1].style.outlineColor = 'hsl(0, 100%, 67%)';
            tituloMsg[2].style.color = 'hsl(0, 100%, 67%)';
            inputDato[2].style.outlineColor = 'hsl(0, 100%, 67%)';
            contador++;
        }else{
            datosOK(0);
        }
    }else{
        if ( parseInt(inputDato[0].value) > 31 ){
            datosError(0,'Must be a valid day');
            contador++;
        }else{
            datosOK(0);
        }
    }
}

function calculaEdad(){
    let agno = fechaHoy.getFullYear() - inputDato[2].value;
    let mes = fechaHoy.getMonth() + 1 - inputDato[1].value;
    let dias = fechaHoy.getDate() - inputDato[0].value;
    for ( index = 0 ; index < 3 ; index++)
        resultado[index].innerText = '';

    if ( dias < 0 ){
        dias = totalDiasMes - inputDato[0].value + fechaHoy.getDate();
        mes--;
    }
    inputDato[1].value > fechaHoy.getMonth() ? agno-- : '';
    mes < 1 ? mes += 12 : '';
    mes === 12 ? mes = 0 : '';
    dias < 10 ? resultado[2].innerText = 0 : '';
    mes < 10 ? resultado[1].innerText = 0 : '';
    agno < 10 ? resultado[0].innerText = 0 : '';
    resultado[0].innerText += agno;
    resultado[1].innerText += mes;
    resultado[2].innerText += dias;
}
