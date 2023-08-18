/* 

const names = ['math','caique','caurin','bora bill'];

names.forEach((name) => {
    console.log('hi ' + name);
}) */

/* const numbers = [1,2,3,4,5,6,7,8,9,10];

numbers.forEach((number, index) => {
    if (number % 2 == 0){
        console.log(number + ' esta na posição ' + index);
    }
}); */

class Car {
    constructor(marca, modelo){
        this.marca = marca;
        this.modelo = modelo;
    }
};

class ListCar{
    constructor(){
        this.listCars = [];
    }

    getNewCar(car){
        this.listCars.push(car);
    }
}

const listCar = new ListCar();

function getCars() {
    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;

    const car = new Car(marca, modelo);

    listCar.getNewCar(car);

    showHtml();

}

function showHtml(){
    let html = '';
    listCar.listCars.forEach(car => {
        html += `
            <li>marca: ${car.marca}, modelo: ${car.modelo}</li>
        `;
    });
    document.getElementById('lista').innerHTML = html; 
}