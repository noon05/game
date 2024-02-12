$(document).ready(function() {
    var appleSize = 40; // Размер яблока
    var treeWidth = $('#game-container').width();
    var apples = []; // Массив для хранения яблок
    var score = 0; // Счет игрока
    
    // Функция для обновления счета
    function updateScore() {
        $('#score').text('Score: ' + score);
    }
    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    // Функция для добавления яблок
    function spawnApple() {
        var apple = $('<div class="apple"></div>');
        var randomPosX = Math.floor(Math.random() * (treeWidth - appleSize));
        var fallSpeed = random(100, 500); // Случайное ускорение падения

        apple.css({
            top: 10,
            left: randomPosX
        });
        $('#game-container').append(apple);
        apples.push({ element: apple, speed: fallSpeed }); // Добавляем яблоко и его скорость в массив

        // Логика падения яблока
        var fallInterval = setInterval(function() {
            var appleData = apples.find(a => a.element.is(apple));
            var appleTop = appleData.element.position().top;
            appleData.element.css({ top: appleTop + appleData.speed });

            if (appleTop > $('#game-container').height() + 10) {
                clearInterval(fallInterval);
                appleData.element.remove();
                apples.splice(apples.indexOf(appleData), 1); // Удаляем яблоко из массива
                score -= 10; // Уменьшаем счет на 10 при пропущенном яблоке
                updateScore(); // Обновляем счет на странице
            }
        }, 50);

        apple.on('mousedown', function() {
            var audio = new Audio('catch.wav');
            audio.play();
            apple.remove();
            apples.splice(apples.findIndex(a => a.element.is(apple)), 1); // Удаляем яблоко из массива
            score += 1; // Увеличиваем счет на 1 при пойманном яблоке
            updateScore(); // Обновляем счет на странице
        });
    }

    // Функция для добавления указанного количества яблок
    function spawnApples(count) {
        for (var i = 0; i < count; i++) {
            setTimeout(spawnApple, i * 500); // Задержка в 500 миллисекунд между спавном яблок
        }
    }

    spawnApples(4); // Сначала спавним 4 яблока

    // Запуск функции спавна яблок с интервалом в 2 секунды
    setInterval(function() {
        spawnApples(random(1, 4)); // Затем спавним случайное количество яблок от 1 до 4
    }, 2000);

    // Инициализация счетчика на странице
    $('#game-container').prepend('<div id="score">Score: 0</div>');
});