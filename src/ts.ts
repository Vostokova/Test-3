const vehicles = [];
const button = document.getElementById('button');
const list = document.getElementById('vehicle-list');

button.onclick = function() {
    let vehicle;
    let type;
    let name = document.getElementById('name');
    let perf = document.getElementById('performance');
    let description = document.getElementById('description');
    let radios = document.getElementsByName('type');
    let checkType = () => { //TODO: assign to type, add let 'value', return value
        for (let i=0; i<radios.length; i++) {
            if (radios[i].checked) type = (radios[i].value);
        }
    };
    checkType();
    let validateFields = () => {
        errorMessage = '';
        if (!type) errorMessage += 'Выберите тип! ';
        if (!name.value) errorMessage += 'Введите название! ';
        if (!perf.value) errorMessage += 'Введите характеристику автомобиля!';
        return errorMessage;
    };
    let errorMessage = validateFields();
    if (errorMessage) alert (errorMessage);
    else {
        switch (type) {
            case 'truck':
                vehicle = new Truck(name.value, description.value, perf.value);
                break;
            case 'car':
                vehicle = new Car(name.value, description.value, perf.value);
                break;
        }
        vehicles.push({
            vehicle: vehicle,
            onClick: vehicle.showInfo.bind(vehicle)
        });
        list.options[list.options.length] = new Option(vehicle.showLabel());
        let clearForm = () => {
            type = null;
            name.value = null;
            perf.value = null;
            description.value = null;
            for (let i=0; i<radios.length; i++) {
                if (radios[i].checked) radios[i].checked = false;
            }
            document.getElementById('perf-label').innerHTML = 'Macca/скорость*';
        };
        clearForm();
    }
};

function Vehicle (name, description) {
    // сохранение параметров name, description
    this.name = name;
    this.description = description;
}

function Truck (name, description, perf) {
    Vehicle.apply(this, arguments);
    this.type = "грузовая";
    this.carrying = perf;

    // информация для отображения в списке машин
    this.showLabel = function () {return this.name + ": " + this.carrying + " т"};
    // информация для отображения под списком машин, при выборе строки в списке
    this.showInfo = function () {
        return "Тип: " + this.type + "<br>" +
            "Модель: " + this.name + "<br>" +
            "Масса: " + this.carrying + "<br>" +
            "Примечание: " + this.description;
    }
}

function Car (name, description, perf) {
    Vehicle.apply(this, arguments);
    this.type = "легковая";
    this.velocity = perf;

    // информация для отображения в списке машин
    this.showLabel = function () {return this.name + ": " + this.velocity + " км/ч"};
    // информация для отображения под списком машин, при выборе строки в списке
    this.showInfo = function () {
        return "Тип: " + this.type + "<br>" +
            "Модель: " + this.name + "<br>" +
            "Масса: " + this.velocity + "<br>" +
            "Примечание: " + this.description;
    }
}

list.onclick = function () {
    if (list.selectedIndex != -1) {
        document.getElementById('show-info').innerHTML = vehicles[list.selectedIndex].onClick();
    }
};

document.getElementById('truck').onclick = function() {
    document.getElementById('perf-label').innerHTML = 'Масса*';
};
document.getElementById('car').onclick = function() {
    document.getElementById('perf-label').innerHTML = 'Скорость*';
};