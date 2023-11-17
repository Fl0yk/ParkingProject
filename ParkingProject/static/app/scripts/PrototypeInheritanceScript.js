function Vehicle(brand, model) {
    this._brand = brand;
    this._model = model;
}

Object.defineProperties(Vehicle.prototype, {
    brand: {
        get: function () {
            //console.log('num doors get');
            return this._brand;
        },

        set: function (value) {
            this._brand = value;
        }
    },

    model: {
        get: function () {
            return this._model;
        },
        set: function (value) {
            this._model = value;
        }
    }
});

function Car(brand, model, numDoors) {
    Vehicle.call(this, brand, model);
    this._numDoors = numDoors;
};

Object.setPrototypeOf(Car.prototype, Vehicle.prototype);

Object.defineProperties(Car.prototype, {
    numDoors: {
        get: function () {
            //console.log('num doors get');
            return this._numDoors;
        },

        set: function (value) {
            this._numDoors = value;
        }
    },
    carInfo: {
        get: function () {
            return 'brand: ' + this.brand + ', model: ' + this.model + ', num doors: ' + this.numDoors;
        }
    }
});

const div = document.getElementById('inheritance');
let p = document.createElement('p');

p.innerText = 'Prototype inheritance';
div.appendChild(p);

let c1 = new Car('b2', 'm2', 4);
console.dir(c1);

p = document.createElement('p');
p.innerText = c1.carInfo;
div.appendChild(p);

c1.model = 'new m2';
p = document.createElement('p');
p.innerText = 'new model: ' + c1.model;
div.appendChild(p);

c1.numDoors = 7;
p = document.createElement('p');
p.innerText = 'edit num doors: ' + c1.numDoors;
div.appendChild(p);

function logInfo(username) {
    return function (car) {
        p = document.createElement('p');
        p.innerText = 'User ' + username + ' see info by car ' + car.carInfo;
        div.appendChild(p);
    }
}

dima = logInfo('Dima');

dima(c1);

p = document.createElement('p');
p.innerText = 'End prototype inheritance';
div.appendChild(p);