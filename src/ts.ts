let vehicles: Vehicle[];
let byID = (id:string):HTMLElement => document.getElementById();
let button:HTMLElement = byID('button');
let list:HTMLElement = byID('list');
let options:HTMLElement[]= list.childNodes;

abstract class Vehicle {
    name:string;
    type:string;
    description?:string;
    constructor (name:string, type:string, desc?:string) {
        this.name = name;
        this.type = type;
        this.description = desc;
    }
    showLabel():string {
        return `${this.name} ${this.customLabel()}`;
    }
    showInfo():string {
        return `Тип: ${this.type}<br>
            Модель: ${this.name}<br>
            ${this.customInfo()}<br>
            Примечание: ${this.description}`;
    }
    abstract customLabel():string;
    abstract customInfo():string;
}

class Truck extends Vehicle {
    carrying:number;
    constructor (name:string, type:string, carrying:number, desc?:string) {
        super (name, type, desc);
        this.carrying = carrying;
    }
    customLabel():string {
        return `${this.carrying} т`;
    }
    customInfo():string {
        return `Масса: ${this.carrying} т`;
    }
}

class Car extends Vehicle {
    velocity:number;
    constructor (name:string, type:string, velocity:number, desc?:string) {
        super (name, type, desc);
        this.velocity = velocity;
    }
    showLabel():string {
        return `${this.velocity} км/ч`;
    }
    showInfo():string {
        return `Скорость: ${this.velocity} км/ч`;
    }
}

button.onclick = function():void {
    let vehicle:Vehicle;
    let nameField:HTMLElement = byID('name');
    let perf:HTMLElement = byID('performance');
    let desc:HTMLElement = byID('description');

    let radios = document.getElementsByName('type');

    function checkType():string {
        for (let i=0; i<radios.length; i++)
            if (radios[i].checked) return radios[i].nodeValue;
    }

    function validateFields():string {
        let errorMessage = '';
        if (!type) errorMessage += 'Выберите тип! ';
        if (!nameField.nodeValue) errorMessage += 'Введите название! ';
        if (!perf.nodeValue) errorMessage += 'Введите характеристику автомобиля!';
        return errorMessage;
    }

    function clearForm():void {
        type = null;
        nameField.nodeValue = null;
        perf.nodeValue = null;
        desc.nodeValue = null;
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) radios[i].checked = false;
        }
//        byID('perf-label').innerHTML = 'Macca/скорость*';
    }

    let type:string = checkType();
    let errorMessage:string = validateFields();
    if (errorMessage) {
        alert(errorMessage);
        return;
    }
    switch (type): {
    case 'truck':
        vehicle = new Truck(nameField.nodeValue, type, perf.nodeValue, desc.nodeValue);
        break;
    case 'car':
        vehicle = new Car(nameField.nodeValue, type, perf.nodeValue, desc.nodeValue);
        break;
    }
    vehicles.push({
        vehicle: vehicle;
        onClick: vehicle.showInfo.bind(vehicle)
    });
    options[options.length] = '<option>${vehicle.showLabel()}</option>';
    clearForm();
}


list.onclick = function():void {
    if (list.s != -1) {
        document.getElementById('show-info').innerHTML = vehicles[list.selectedIndex].onClick();
    }
}
/*
list.onclick = function () {
    if (list.selectedIndex != -1) {
        document.getElementById('show-info').innerHTML = vehicles[list.selectedIndex].onClick();
    }
};

document.getElementById('truck').onclick = function () {
    document.getElementById('perf-label').innerHTML = 'Масса*';
};
document.getElementById('car').onclick = function () {
    document.getElementById('perf-label').innerHTML = 'Скорость*';
};*/