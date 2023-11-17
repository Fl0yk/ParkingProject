const DayOfWeek = {
    0: "Sunday",    //�����������
    1: 'Monday',    //�����������
    2: 'Tuesday',   //�������
    3: 'Wednesday', //�����
    4: 'Thursday',  //�������
    5: 'Friday',    //�������
    6: 'Saturday'   //�������
};

const form = document.getElementById('birthdayForm');
const contentBlock = document.getElementById('content');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    //�������� ���� �� �����
    const date = new Date(form.querySelector('#birthDate').value);
    //������� ����� ��� ��������� ���������
    const p = document.createElement('p');

    const curDate = new Date();
    let age = curDate.getFullYear() - date.getFullYear();

    //���������, ��� �� ���� �������� � ���� ����
    if (date.getMonth() >= curDate.getMonth() && date.getDate() > curDate.getDate()) {
        age--;
    }

    //��������� � ���� ����� � ���������
    p.textContent = 'Your birthday is ' + date + '. And you are ' + age + ' years old.';
    contentBlock.appendChild(p);

    if (age < 18) {
        alert('Parents permission required');
    }
    else {
        alert('You are born in ' + DayOfWeek[date.getDay()]);
    }
});



