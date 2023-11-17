class VehicleCl {
    constructor(brand, model) {
        this._brand = brand;
        this._model = model;
    }

    get brand() {
        return this._brand;
    }

    set brand(value) {
        this._brand = value;
    }

    get model() {
        return this._model;
    }

    set model(value) {
        this._model = value;
    }
}

class CarCl extends VehicleCl {
    constructor(brand, model, numDoors) {
        super(brand, model);
        this._numDoors = numDoors;
    }

    get numDoors() {
        return this._numDoors;
    }

    set numDoors(value) {
        this._numDoors = value;
    }

    info() {
        return 'brand: ' + this.brand + ', model: ' + this.model + ', num doors: ' + this.numDoors;
    }
}

//const divcl = document.getElementById('inheritance');

p = document.createElement('p');
p.innerText = 'Class inheritance';
div.appendChild(p);

let c2 = new CarCl('b1', 'm1', 4);
console.dir(c2);
p = document.createElement('p');
p.innerText = c2.info();
div.appendChild(p);

c2.model = 'new m1';
p = document.createElement('p');
p.innerText = 'new model: ' + c2.model;
div.appendChild(p);

c2.numDoors = 6;
p = document.createElement('p');
p.innerText = 'edit num doors: ' + c2.numDoors;
div.appendChild(p);

function logInfo(username) {
    return function (car) {
        p = document.createElement('p');
        p.innerText = 'User ' + username + ' see info by car ' + car.info();
        div.appendChild(p);
    }
}

dima = logInfo('Dima');

dima(c2);

p = document.createElement('p');
p.innerText = 'End class inheritance';
div.appendChild(p);