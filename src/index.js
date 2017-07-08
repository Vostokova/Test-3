/**
 * Created by Swarm1992 on 01.07.2017.
 */
'use strict';
console.log( "Hello ES 6" );
// Поехали !

// var apples = 5;
//
// if (true) {
//     var apples = 10;
//
//     alert(apples); // 10 (внутри блока)
// }
//
// alert(apples); // 10 (снаружи блока то же самое)
//====================================================
// let apples = 5;
//
// if (true) {
//     let apples = 10;
//
//     alert(apples); // 10 (внутри блока)
// }
//
// alert(apples); // 5 (снаружи блока значение не изменилось)
//====================================================
// var a = [];
// for (var i = 0; i < 3; i++) {
//     a[i] = function() {
//         alert(i);
//     };
// }
// a[0]();
// a[1]();
// a[2]();
//====================================================
//
// ====================================================
// var a = [];
// for (var i = 0; i < 3; i++) {
//     a[i] = (function (ii){
//         return function() {alert(ii)};
//     })(i);
// }
// a[0]();
//====================================================
// Деструктуризация.
//====================================================
// let options = {
//     title: "Menu",
//     width: 100,
//     height: 200
// };
//
// let {width: w, height: h, title} = options;
//
// alert(title);  // Меню
// alert(w);      // 100
// alert(h);      // 200
//====================================================
// Деструктуризация сложных объектов
//====================================================
// let options = {
//     user: ['ilia', 'prakht'],
//     params:{
//       age:23,
//          height:145
//     }
// };
// let {user: [ firstName, lastName], params: {age: userAge, height: userHeight}} = options;
// alert(firstName);
// alert(lastName);
// alert(userAge);
// alert(userHeight);
//====================================================
//      Стрелочные функции () => {}
//====================================================
// function Figure(size){
//     this.size = size;
//     function showSize(){
//         console.log(this.size);
//     }
//     showSize();
// }
// let circle = new Figure(91);
//====================================================
//
//====================================================
// class User {
//     constructor(name) {
//         this.name = name;
//     }
//
//     sayHi() {
//         alert(this.name);
//     }
// }
//
// let user = new User("Denchik");
// user.sayHi(); // Вася
//
// setTimeout(user.sayHi.bind(user), 1100);

var array = [];

for(let i = 0; i < 3; i++){
    array[i] =  function () {console.log(i)}

};
array[1]();

//=========================================
//             3.5.ООП
//=========================================
// Позволяет группировать функции и данные в единой сущности – «объекте».
// В JavaScript объекты часто используются просто как коллекции.
//     В ООП каждый объект должен представлять собой единую, интуитивно понятную сущность, у которой есть методы и данные.
//
//     class Vehicle {
// static componentName = 'Transport.Vehicle';
//
// public name: string;
// private comment: any;
//
//     constructor(name: string, protected type: string){
//         this.name = `some ${name}`;
//         this.type = 'vehicle';
//         this.comment = 'Комментарий';
//     }
//
//     drive(): void {
//         console.log(`я еду на - ${this.name}`);
// }
// };
//
// class Car extends Vehicle {
//     static componentName = 'Transport.Vehicle.Car';
//
//     constructor(name: string, public wheelCount: number, protected type: string){
//         super(name, type);
//         this.name = `car ${name}`;
//         this.wheelCount = wheelCount;
//         this.type = type;
//     };
//
//     driveCar(): string {
//         super.drive();
//         return 'i can drive!'
//     };
// };
//
// let taxi = new Car('yellow_car', 4, 'light');
// Функция constructor запускается при создании через new, остальные методы записываются в .prototype.
//
// Статическое свойство - доступно без создания экземпляра класса.
// console.log(Car.componentName);
//
//=========================================
//             3.6.Промисы
//=========================================
// Promise – это специальный объект, который хранит своё состояние, текущий результат (если есть) и коллбэки
// Вначале pending («ожидание»), затем – одно из: fulfilled («выполнено успешно») или rejected («выполнено с ошибкой»).
// После вызова resolve/reject промис уже не может изменить состояние.
//
//     let promise = new Promise(function(ok, fail) { });
// promise.then(onSuccess, onFail);
//
// let promise = new Promise((okFunc, failFunc) => {
//     setTimeout( () => {okFunc('работает');}, 1000 );
//     setTimeout( () => {failFunc('тут поломалось, но мы об этом не узнаем');}, 2000 );
// });
//
// promise.then(
//     result => {
//         alert("ок: " + result);
//     },
//     error => {
//         alert("fail: " + error);
//     }
// );
//
// /* Цепочки промисов */
// let pr = new Promise((okFunc, failFunc) => {
//     setTimeout( () => {okFunc(125);}, 1000 );
// });
//
// pr.then(
//     num => {
//         return num;
//     }
// ).then(
//     someNum => {
//         return someNum * 2;
//     }
// ).then(
//     resNum => {
//         alert('Итого - ' + resNum);
//     }
// );
//
//=========================================
//             3.7.Строки шаблоны
//=========================================
// const str = `Перевод
// строки`;
//
// const fio = 'Имя Фамилия';
// const age = 20;
// const string = `Имя: ${fio}, дата рождения: ${2017 - age}`;