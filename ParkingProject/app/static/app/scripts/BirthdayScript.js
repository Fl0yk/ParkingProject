const DayOfWeek = {
    0: "Sunday",    //воскресенье
    1: 'Monday',    //понедельник
    2: 'Tuesday',   //вторник
    3: 'Wednesday', //среда
    4: 'Thursday',  //четверг
    5: 'Friday',    //пятница
    6: 'Saturday'   //суббота
};

const form = document.getElementById('birthdayForm');
const contentBlock = document.getElementById('content');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    //Получаем дату из формы
    const date = new Date(form.querySelector('#birthDate').value);
    //создаем абзац для занесения сообщения
    const p = document.createElement('p');

    const curDate = new Date();
    let age = curDate.getFullYear() - date.getFullYear();

    //Проверяем, был ли день рождения в этом году
    if (date.getMonth() >= curDate.getMonth() && date.getDate() > curDate.getDate()) {
        age--;
    }

    //Добавляем в блок абзац с возрастом
    p.textContent = 'Your birthday is ' + date + '. And you are ' + age + ' years old.';
    contentBlock.appendChild(p);

    if (age < 18) {
        alert('Parents permission required');
    }
    else {
        alert('You are born in ' + DayOfWeek[date.getDay()]);
    }
});



