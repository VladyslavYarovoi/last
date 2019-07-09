'use strict';





// Есть массив logins с логинами пользователей. Напиши скрипт добавления логина в массив logins. Добавляемый логин должен:

// проходить проверку на длину от 4 до 16-ти символов включительно
// быть уникален, то есть отсутствовать в массиве logins
// Разбей задачу на подзадачи с помощью функций.

// Напиши функцию isLoginValid(login), в которой проверь количество символов параметра login и верни true или false в зависимости от того, попадает ли длина параметра в заданный диапазон от 4-х до 16-ти символов включительно.

// Напиши функцию isLoginUnique(allLogins, login), которая принимает список всех логинов и добавляемый логин как параметры и проверяет наличие login в массиве allLogins, возвращая true если такого логина еще нет и false если логин уже используется.

// Напиши функцию addLogin(allLogins, login) которая:

// Принимает новый логин и массив всех логинов как параметры
// Проверяет валидность логина используя вспомогательную функцию isLoginValid
// Если логин не валиден, прекратить исполнение функции addLogin и вернуть строку 'Ошибка! Логин должен быть от 4 до 16 символов'
// Если логин валиден, функция addLogin проверяеть уникальность логина с помощью функции isLoginUnique
// Если isLoginUnique вернет false, тогда addLogin не добавляет логин в массив и возвращает строку 'Такой логин уже используется!'
// Если isLoginUnique вернет true, addLogin добавляет новый логин в logins и возвращает строку 'Логин успешно добавлен!'


const logins = ['Mango', 'robotGoogles', 'Poly', 'Aj4x1sBozz', 'qwerty123'];
let login;
let message;
let message1;

// let question = prompt("Введите логин!");

const isLoginValid = function(login) {
if(login.length >= 4 && login.length <= 16) {
    message = true;
    } else {
        message = false; }
        return message
};

const isLoginUnique = function(logins, login) {
  message1 = logins.includes(login);
  return message1
};


const addLogin = function(logins, login) {
    isLoginValid(login)
    if(message !== true) {
      console.log('Ошибка! Логин должен быть от 4 до 16 символов')
  }
  isLoginUnique(logins, login)
  if(message1 === true) {
    console.log('Такой логин уже используется!');
  } else if(message1 === false && message === true) {
      logins.push(login)
      console.log('Логин успешно добавлен!');
      console.log(logins);
  }
};


addLogin(logins, 'Ajax'); // 'Логин успешно добавлен!'
addLogin(logins, 'robotGoogles'); // 'Такой логин уже используется!'
addLogin(logins, 'Zod'); // 'Ошибка! Логин должен быть от 4 до 16 символов'
addLogin(logins, 'jqueryisextremelyfast'); // 'Ошибка! Логин должен быть от 4 до 16 символов'


<<<<<<< HEAD
// addLogin(logins, question)
=======
// addLogin(logins, question)
>>>>>>> 6f2189a514e69755227cbdc52edc1506c15e023c
