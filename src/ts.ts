let vehicles[];
let byID = (id:string):HTMLElement => document.getElementById(id);
let button:HTMLElement = byID('button');
let list:HTMLElement = byID('list');
let options:NodeListOf<HTMLElement> = list.options;

/**
 * Общий для всех добавляемых автомобилей.
 * Реализует методы для отображения в списке
 * и для отображения подробной инфы о выбранном авто.
 */
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

/**
 * Класс для грузовых авто.
 * Специфическое свойство - грузоподъемность.
 * Методы для отображения специфической инфы в списке и развернутом описании.
 */
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

/**
 * Класс для легковых авто.
 * Специфическое свойство - скорость.
 * Методы для отображения специфической инфы в списке и развернутом описании.
 */
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

/**
 * Действия при нажатии кнопки - проверка полей,
 * создание экземпляра Truck или Car,
 * обновление массива и списка автомобилей,
 * очистка формы.
 */
button.onclick = ():void => {
    let vehicle:Vehicle;
    let nameField:HTMLElement = byID('name');
    let performance:HTMLElement = byID('performance');
    let description:HTMLElement = byID('description');
    let radios:NodeListOf<HTMLElement> = document.getElementsByName('type');
    let type:string;

    /**
     * Получает значение выбранной радио-кнопки
     */
    let checkType = ():void => {
        for (let i=0; i<radios.length; i++)
            if (radios[i].checked) type = radios[i].value;
    };

    /**
     * Проверяет, все ли обязательные поля заполнены.
     * Если нет, возвращает errorMessage, в котором
     * перечислены просьбы заполнить все недостающие поля.
     * @returns {string}
     */
    let validateFields = ():string => {
        let errorMessage = '';
        if (!type) errorMessage += 'Выберите тип! ';
        if (!nameField.value) errorMessage += 'Введите название! ';
        if (!performance.value) errorMessage += 'Введите характеристику автомобиля!';
        return errorMessage;
    };

    /**
     * Возвращает все поля формы к первоначальному состоянию.
     */
    let clearForm = ():void => {
        type = null;
        nameField.value = null;
        performance.value = null;
        description.value = null;
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) radios[i].checked = false;
        }
        byID('perf-label').innerHTML = 'Macca/скорость*'; //пока не выбран тип, лейбл тоже не определён
    };

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


/**
 * По клику на определённый элемент списка выдаёт
 * развернутую информацию, связанную с этим элементом.
 */
list.onclick = ():void => {
    if (list.selectedIndex != -1) {
        document.getElementById('show-info').innerHTML = vehicles[list.selectedIndex].onClick();
    }
};

/**
 * При выборе типа "грузовой", сразу меняет лейбл производительности на "Масса"
 */
byID('truck').onclick = ():void => {
    byID('perf-label').innerHTML = 'Масса*';
};
/**
 * При выборе типа "легковой", сразу меняет лейбл производительности на "Скорость"
 */
byID('car').onclick = ():void => {
    byID('perf-label').innerHTML = 'Скорость*';
};