// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления
const minWeightInput = document.querySelector('.minweight__input'); // поле для ввода минимального веса
const maxWeightInput = document.querySelector('.maxweight__input'); // поле для ввода максимального веса
let minWeight;
let maxWeight;
 
// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;
 
// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);
 
/*** ОТОБРАЖЕНИЕ ***/
 
// отрисовка карточек
const display = () => {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
 
 fruitsList.innerHTML="";
   
  for (let i = 0; i < fruits.length; i++) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild
    
    let cardText = document.createElement('li');
    cardText.innerHTML = `Фрукт №${i+1}`+ `<br>` + fruits[i].kind +`<br>`+ fruits[i].color +`<br>`+ `Вес: ${fruits[i].weight}кг`;
    function colorOutput(color, typeColor){
      if (fruits[i].color == color) {
      cardText.className = typeColor;
      }
    };
    colorOutput("фиолетовый", "fruit__item fruit_violet");
    colorOutput("зеленый", "fruit__item fruit_green");
    colorOutput("розово-красный", "fruit__item fruit_carmazin");
    colorOutput("желтый", "fruit__item fruit_yellow");
    colorOutput("светло-коричневый", "fruit__item fruit_lightbrown");    
    fruitsList.appendChild(cardText);
  
  }
};
 
// первая отрисовка карточек
display();
 
/*** ПЕРЕМЕШИВАНИЕ ***/
 
// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
 
// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  const  fruits_old  = [...fruits];
  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  while (fruits.length > 0) {
    // TODO: допишите функцию перемешивания массива
    //
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)
    
    let j = getRandomInt(0, fruits.length-1); //случайный индекс от 0 до i
    result.push(fruits[j]); // вставляем элемент в массив result
    fruits.splice(j,1); // удаляем этот элемент из массива fruits
  }
 
  fruits = result;
   const not_shuffled = fruits.every((element, index) =>  element == fruits_old[index]);
  if (not_shuffled) {
    alert("Порядок не изменился!")
  };
};
 
shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});
 
/*** ФИЛЬТРАЦИЯ ***/
 
// фильтрация массива
const filterFruits = function(){        
  return  fruits.filter(function (item){
    return (item.weight >= minWeight) && (item.weight <= maxWeight)
  });
};
 
filterButton.addEventListener('click', () => {
  if ((minWeightInput.value != "") && (maxWeightInput.value !="")) {
  minWeight = parseInt(minWeightInput.value); // знаение поле ввода мин 
  maxWeight = parseInt(maxWeightInput.value); // значение поле ввода макс
  fruits = filterFruits();
  display();
}else {
    alert ('Введите min и max weight')
  };
});
 
/*** СОРТИРОВКА ***/
let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки
 
const priorityColor = {
  "фиолетовый": 4,
  "зеленый": 3,
  "розово-красный": 0,
  "желтый": 2,
  "светло-коричневый": 1
};
 
const comparationColor = (fruit1, fruit2) => {
  return priorityColor[fruit1.color] > priorityColor[fruit2.color];  
};
 
function quickSort_main(arr, comparation, left, right){
  // функция обмена элементов
    function swap(arr, firstIndex, secondIndex){
       const temp = arr[firstIndex];
       arr[firstIndex] = arr[secondIndex];
       arr[secondIndex] = temp;
    };
 
    // функция разделитель
    function partition(arr, left, right) {
       var pivot = arr[Math.floor((right + left) / 2)],
           i = left,
           j = right;
       while (i <= j) {
           while (comparation(pivot, arr[i])) {
               i++;
           }
           while (comparation(arr[j], pivot)) {
               j--;
           }
           if (i <= j) {
               swap(arr, i, j);
               i++;
               j--;
           }
       }
       return i;
    };
 
    var index;
    if (arr.length > 1) {
        left = typeof left != "number" ? 0 : left;
        right = typeof right != "number" ? arr.length - 1 : right;
        index = partition(arr, left, right);
        if (left < index - 1) {
          quickSort_main(arr, comparation, left, index - 1);
        }
        if (index < right) {
          quickSort_main(arr, comparation, index, right);
        }
    }
       return arr;
};
 
const sortAPI = {
  bubbleSort(arr, comparation) {
    const n = arr.length;
    for (let i = 0; i < n-1; i++) { 
       for (let j = 0; j < n-1-i; j++) { 
           if (comparation(arr[j], arr[j+1])) { 
               let temp = arr[j+1]; 
               arr[j+1] = arr[j]; 
               arr[j] = temp; 
           }
       }                    
    }
  },
 
  quickSort(items, comparation, right, left) {
 
    quickSort_main(items,  comparation, left, right);
  
  },
 
  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation, right, left) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};
 
// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;
 
sortChangeButton.addEventListener('click', () => {
  if(sortKind == 'bubbleSort'){
    sortKind = 'quickSort';
  }else {
    sortKind = 'bubbleSort';
  };
  sortKindLabel.textContent = sortKind;
  sortTime = '-';
  sortTimeLabel.textContent = sortTime;
});
 
sortActionButton.addEventListener('click', () => {
  sortTimeLabel.textContent = 'sorting...';
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  sortTimeLabel.textContent = sortTime;
});
 
/*** ДОБАВИТЬ ФРУКТ ***/
 
addActionButton.addEventListener('click', () => {
  let weightInputNumber = parseFloat(weightInput.value);
  let result = {"kind": kindInput.value, "color": colorInput.value, "weight": weightInputNumber};
  if((kindInput.value == "") || (colorInput.value == "") || (weightInput.value == "")){
    alert("Введите все данные!!!");
  }else if((isNaN(weightInputNumber))){
    alert("Введите в поле weight число!!!");
  }else {
    fruits.push(result);  
  };  
  display();
});