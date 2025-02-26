(function () {
    // находим форму по селектору, желательно искать по id, но у нас только 1 форма, так что хуй с ним
    const form = document.querySelector('form')
    // если формы нет, то останавливаем функцию. Актуально, если мы на другой странице, где нет формы
    if (!form) return;

    // если форма есть, то выполнение функции продолжается

    // поиск по документу дорогая операция, облегчаем скрипту жизнь и ищем все инпуты внутри формы, мы же её уже нашли
    // внутри этой переменной коллекция всех инпутов
    const inputs = form.querySelectorAll('input')
    
    // Судя по макету, пока поля не заполнены, кнопка "отправить" неактивна,
    // поэтому нам нужно отслеживать каждый инпут
    // и только если все поля корректно заполнены, разблокировать кнопку
     
    // находим кнопку в форме и дизейблим её от греха подальше
    const btn = form.querySelector('button')
    btn.disabled = true

    // вводим флаги для валидных значений инпутов, 
    // почитай про типы данных и флаги
    let isNameValid = false 
    let isPhoneValid = false
    let isEmailValid = false
    
    // пробегаемся по всей коллекции инпутов, после типов данных почитай про массивы и их методы
    inputs.forEach(input => {
        // отслеживаем каждое изменение в инпуте и при этом вызываем вспомогательные функции  
        input.addEventListener('input', ()=> {
            // тут валидируем инпут
            // почитай за функции и параметры функций
            validateInput(input)
            // тут проверяем флаги 
            redisableBtn()
        })
    })

    // тут должна быть отправка на сервак, но мы просто меняем текст у параграфа и удаляем форму
    form.addEventListener('submit', (e)=> {
        // это отменяем дефолтное поведение
        e.preventDefault();
        // текст поменяли
        document.querySelector('.connect').textContent = 'Ваша заявка отправлена.'
        // форму удалили
        form.remove()
    })

    // ============= вспомогательные функции ================
    
    function validateInput(input) {
        // первым делом проверяем, пустое значение сейчас в инпуте или нет.

        // что-то есть, ковыряем дальше
        if (input.value !== '') {
            // если в name что-то написано, убираем класс с ошибкой, меняем флаг isNameValid 
            if (input.name === 'name') {
                input.classList.remove('error')             
                isNameValid = true
                return
            };
            // проверяем телефон регулярным выражением, если все ок, то меняем флаг и убираем класс с ошибкой
            // только числовые значения, от 7 до 10 символов, можно с пробелами и скобочками
            if (input.name === 'phone') {
                const pattern = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
                isPhoneValid = pattern.test(input.value);
                isPhoneValid ? input.classList.remove('error') : input.classList.add('error')
                return
            };
            // то же самое делаем с электропочтой
            // example@example.com
            if (input.name === 'email') {
                const pattern = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
                isEmailValid = pattern.test(input.value);
                isEmailValid ? input.classList.remove('error') : input.classList.add('error')
                return
            }
        // значение инпута пустое, добавляем класс с ошибкой и завершаем функцию 
        } else {
            input.classList.add('error')
            return
        }
    }

    // тут просто проверяем все флаги, если всё ок, то разблокируем кнопку
    function redisableBtn () {
        (isNameValid && isPhoneValid && isEmailValid) ? btn.disabled = false : btn.disabled = true
    }
})();