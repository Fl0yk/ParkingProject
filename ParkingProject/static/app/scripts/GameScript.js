const items = document.getElementsByClassName("game-block");
let movePlayer = true;

for (let i = 0; i < items.length; i++) {
	items[i].addEventListener("click", function () {
		const collecion = document.querySelectorAll(".game-block:not(.active)");

		if (!this.classList.contains("active")) {
			//console.log('turn');
			if (movePlayer) {
				firstPlayer(this);
			} else {
				secondPlayer(this);
			}
		}

		var result = checkMap();
		if (result.val) {
			setTimeout(function () {
				exit(result);
			}, 10);
		}
		else if (collecion.length === 1) {
			//console.log('draw');
			setTimeout(function () {
				exit({ val: true, win: "Draw" });
			}, 10);
		}
	});
}


function firstPlayer(that) {
	if (that.innerHTML == "") {
		that.classList.add("active");
		that.classList.add("active_x");
		that.innerHTML = "x"
	}

	movePlayer = !movePlayer;
}

function secondPlayer(that) {
	if (that.innerHTML == "") {
		that.classList.add("active");
		that.classList.add("active_o");
		that.innerHTML = "0"
	}

	movePlayer = !movePlayer;
}



//Проверка поля
function checkMap() {
	var block = document.querySelectorAll(".game-block");
	var items = [];
	for (var i = 0; i < block.length; i++) {
		items.push(block[i].innerHTML);
	}

	if (items[0] == "x" && items[1] == 'x' && items[2] == 'x' ||
		items[3] == "x" && items[4] == 'x' && items[5] == 'x' ||
		items[6] == "x" && items[7] == 'x' && items[8] == 'x' ||
		items[0] == "x" && items[3] == 'x' && items[6] == 'x' ||
		items[1] == "x" && items[4] == 'x' && items[7] == 'x' ||
		items[2] == "x" && items[5] == 'x' && items[8] == 'x' ||
		items[0] == "x" && items[4] == 'x' && items[8] == 'x' ||
		items[6] == "x" && items[4] == 'x' && items[2] == 'x')
		return { val: true, win: "player 1" }
	if (items[0] == "0" && items[1] == '0' && items[2] == '0' ||
		items[3] == "0" && items[4] == '0' && items[5] == '0' ||
		items[6] == "0" && items[7] == '0' && items[8] == '0' ||
		items[0] == "0" && items[3] == '0' && items[6] == '0' ||
		items[1] == "0" && items[4] == '0' && items[7] == '0' ||
		items[2] == "0" && items[5] == '0' && items[8] == '0' ||
		items[0] == "0" && items[4] == '0' && items[8] == '0' ||
		items[6] == "0" && items[4] == '0' && items[2] == '0')
		return { val: true, win: "player 2" }

	return { val: false }
}

function exit(obj) {
	alert(obj.win + " - game over");
	for (let item of items) {
		item.classList.remove('active_o');
		item.classList.remove('active_x');
		item.classList.remove('active');
		item.innerHTML = null;
	}
	movePlayer = true;
};