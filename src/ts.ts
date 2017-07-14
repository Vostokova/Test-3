let vehicles[];
let byID = (id:string):HTMLElement => document.getElementById(id);
let button:HTMLElement = byID('button');
let list:HTMLElement = byID('vehicle-list');
let options:NodeListOf<HTMLElement> = list.options;

class Vehicle {
    name:string;
    type:string;
    description?:string;
    constructor (name:string, type:string, description?:string) {
        this.name = name;
        this.type = type;
        this.description = description;
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
    constructor (name:string, type:string, carrying:number, description?:string) {
        super (name, type, description);
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
    constructor (name:string, type:string, velocity:number, description?:string) {
        super (name, type, description);
        this.velocity = velocity;
    }
    customLabel():string {
        return `${this.velocity} км/ч`;
    }
    customInfo():string {
        return `Скорость: ${this.velocity} км/ч`;
    }
}

button.onclick = () => {
    let vehicle:Vehicle;
    let nameField:HTMLElement = byID('name');
    let performance:HTMLElement = byID('performance');
    let description:HTMLElement = byID('description');
    let radios:NodeListOf<HTMLElement> = document.getElementsByName('type');
    let type:string;

    function checkType():void {
        for (let i=0; i<radios.length; i++)
            if (radios[i].checked) type = radios[i].value;
    }

    function validateFields():string {
        let errorMessage = '';
        if (!type) errorMessage += 'Выберите тип! ';
        if (!nameField.value) errorMessage += 'Введите название! ';
        if (!performance.value) errorMessage += 'Введите характеристику автомобиля!';
        return errorMessage;
    }

    function clearForm():void {
        type = null;
        nameField.value = null;
        performance.value = null;
        description.value = null;
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) radios[i].checked = false;
        }
        byID('perf-label').innerHTML = 'Macca/скорость*';
    }

    checkType();
    let errorMessage:string = validateFields();
    if (errorMessage) {
        alert(errorMessage);
        return;
    }
    switch (type) {
        case 'truck':
            vehicle = new Truck(nameField.value, 'грузовая', performance.value, description.value);
            break;
        case 'car':
            vehicle = new Car(nameField.value, 'легковая', performance.value, description.value);
            break;
    }
    vehicles.push({
        vehicle: vehicle,
        onClick: vehicle.showInfo.bind(vehicle)
    });
    options[options.length] = new Option (vehicle.showLabel());
    clearForm();
};


list.onclick = function():void {
    if (list.selectedIndex != -1) {
        document.getElementById('show-info').innerHTML = vehicles[list.selectedIndex].onClick();
    }
};

byID('truck').onclick = function ():void {
    byID('perf-label').innerHTML = 'Масса*';
};
byID('car').onclick = function ():void {
    byID('perf-label').innerHTML = 'Скорость*';
};