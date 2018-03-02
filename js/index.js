// Стартовое значение стиля анимируемого элемента
document.getElementById("circle").style['stroke-dasharray'] = "0,100";

    /**
    * @description ограничивает значения инпута
    */
function valBetween(v, min, max) {
  return (Math.min(max, Math.max(min, v)));
}

    /**
    * @description обрабатывают чекбоксы анимации и сокрытия блока
    */
function cb1handleClick(){
    var checkbox = document.getElementById("cb1");
  if (checkbox.checked == true) {progress.setMod("Animated", "yes");}
  else {progress.setMod("Animated", "");}
}

function cb2handleClick(){
    var checkbox = document.getElementById("cb2");
  if (checkbox.checked == true) {progress.setMod("Hidden");}
  else {progress.setMod("Normal", "");}
}

class progress {
  
    /**
    * @description устанавливает новое значение заполненности прогресс-бара
    */
  static setValue() {
    var deg = valBetween(document.getElementById("input").value,0,100); // Желаемое значение, инпут из текстбокса Value
    var currDeg = parseInt(document.getElementById("circle").style['stroke-dasharray'].split(",")[0]); // Текущее значение
    var dDeg = deg - currDeg; // Дельта
    var point = dDeg/Math.abs(dDeg); // Единица с необходимым знаком

    /**
    * @description рекурсивный цикл анимации, изменяет и перерисовывает заполненность прогресс-бара
    */
    function recursive() {
      setTimeout(function() {
        if (recursCount < Math.abs(dDeg)) {
          recursCount++;
          currDeg+=point; // Изменяем текущее значение на единицу с полученным знаком
          // Изменение значений
          document.getElementById("circle").style['stroke-dasharray'] = currDeg+",100"

          recursive();
        }
      },10);
    }
  
  var recursCount = 0;
  recursive();
  }
  
    /**
    * @description изменяет состояния блока
    * @param {string} type тип изменяемого состояния
    * @param {string} value указание активности состояния (только для type = 'animation')
    */
  static setMod(type, value='', element = document.getElementById("container")) {

    var state;                                                       
      if (type == 'Animated' && value == 'yes') { //
        state="running";
      } else if (type == 'Animated' && value == '') {
        state="paused";
        element.classList.remove("container");                       //*
        void element.offsetWidth;                                    //* Ресет анимации. Если убрать, анимация будет становиться на паузу, а не начинаться заново.
        element.classList.add("container");                          //*
      } else if (type == 'Hidden') {                                 // Сокрытие прогресс-бара
        document.getElementById("circle-all").style.display='none';
      } else if (type == 'Normal') {                                 // Состояние по умолчанию. Влияет только на отмену сокрытия, т.к. анимация является независимым состоянием.
        document.getElementById("circle-all").style.display='';
      }

    document.getElementById("container").style.WebkitAnimationPlayState = state; // Применение состояния анимации
  }

}