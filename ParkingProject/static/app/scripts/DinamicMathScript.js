const settingsForm = document.getElementById('settingsForm');

const checkbox = document.getElementById('inputs');
const mathdiv = document.getElementById('math');

const data = +document.getElementById('data').innerText / 2;
const p = document.createElement('p');
console.log(data);
p.innerText = 'Empty palces / 2 = ' + data;
mathdiv.appendChild(p);

checkbox.addEventListener('change', function() {
    if (this.checked) {
        //создание лэйбла и инпута для размера шрифта
        const labelfs = document.createElement('label');
        labelfs.innerText = 'Change font size:';

        const inputfs = document.createElement('input');
        inputfs.type = 'range';
        inputfs.max = 30;
        inputfs.min = 6;
        inputfs.addEventListener('change', (event) => {
            document.body.style.fontSize = event.target.value + 'px';
        });

        labelfs.appendChild(inputfs);
        settingsForm.appendChild(labelfs);

        //создание лэйбла и инпута для цвета текста
        const labelci = document.createElement('label');
        labelci.innerText = 'Change text color:';

        const inputci = document.createElement('input');
        inputci.type = 'color';

        inputci.addEventListener('input', (event) => {
            document.body.style.color = event.target.value;
        });

        labelci.appendChild(inputci);
        labelfs.after(document.createElement('br'), labelci);

        //создание лэйбла и инпута для заднего фона
        const labelbgc = document.createElement('label');
        labelbgc.innerText = 'Change bg color:';

        const inputbgc = document.createElement('input');
        inputbgc.type = 'color';

        inputbgc.addEventListener('input', (event) => {
            document.body.style.backgroundColor = event.target.value;
        });

        labelbgc.appendChild(inputbgc);
        labelci.after(document.createElement('br'), labelbgc);
    }
    else {
        settingsForm.innerHTML = '';
    }
});

