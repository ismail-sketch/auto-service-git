
// События windows для всех=======================================
window.addEventListener('resize', () => {
    moveMainBtns(mainMenu, headerContWrp, mainTopBtn, 420, 'beforeend', 'beforeend');
    moveMainBtns(mainScreenItemsWrp, mainScreenTitle, mainBtn, 865, 'afterend', 'afterend');
})
window.addEventListener('scroll', () => {
    headerColor();
})

// Меню=============================
const burgerWrp = document.querySelector('.burger__wrp');
const burger = document.querySelectorAll('.burger');
const mainMenu = document.querySelector('.mainMenu');
burgerWrp.addEventListener('click', () => {
    burger.forEach(item => {
        item.classList.toggle('active');
    })
    mainMenu.classList.toggle('active');
})

window.addEventListener('click', (e) => {
    if(!e.target.closest('.mainMenu') && !e.target.closest('.burger')) {
        burger.forEach(item => {
            item.classList.remove('active');
        })
        mainMenu.classList.remove('active');
    }
})

// Изменение цвета хедера при скролле
const header = document.querySelector('.header');
function headerColor() {
    if(window.scrollY > 100) {
        header.classList.add('active');
    } else {
        header.classList.remove('active');
    }
}
headerColor();

// Перемещение кнопок главного экрана при адаптиве
const headerContWrp = document.querySelector('.header__cont-wrp');
const mainTopBtn = document.querySelector('.main-top-btn');
const mainBtn = document.querySelector('.main-btn');
const mainScreenItemsWrp = document.querySelector('.mainScreen__items-wrp');
const mainScreenTitle = document.querySelector('.mainScreen__title');

function moveMainBtns(parentEl1, parentEl2, movedEl, windowWith, position1, position2) {
    if(window.innerWidth <= windowWith) {
        parentEl1.insertAdjacentElement(position1, movedEl)
    } else {
        parentEl2.insertAdjacentElement(position2, movedEl)
    }
}
moveMainBtns(mainMenu, headerContWrp, mainTopBtn, 420, 'beforeend', 'beforeend');
moveMainBtns(mainScreenItemsWrp, mainScreenTitle, mainBtn, 865, 'afterend', 'afterend');


// PopUp с формой
const overlay = document.querySelector('.overlay');
const cross = document.querySelector('.cross');
const popupBtns = document.querySelectorAll('.popup-btn');

popupBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    })
})
if(cross !== null && cross !== undefined) {
    cross.addEventListener('click', (e) => {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    })
}


overlay.addEventListener('click', (e) => {
    if(!e.target.closest('.form')) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
})

// Скрытие-показ инпута email в форме===============================
const inputEmail = document.getElementById('input__email')
window.addEventListener('click', (e) => {
    if(e.target.closest('.mainMenu__btn')) {
        if(e.target.textContent === 'ЗАПРОСИТЬ ПРАЙС') {
            inputEmail.classList.add('active');
        } else {
            inputEmail.classList.remove('active');
        }
    }
})

// Маска телефона
let maskCode = '+7 (___) ___-__-__'
let maskCode2 = '+38(___) ___ __ __'
function maskPhone(selector, masked = maskCode) {
	const elems = document.querySelectorAll(selector);

	function mask(event) {
		const keyCode = event.keyCode;
		const template = masked,
			def = template.replace(/\D/g, ""),
			val = this.value.replace(/\D/g, "");
		//console.log(template);
		let i = 0,
			newValue = template.replace(/[_\d]/g, function (a) {
				return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
			});
		i = newValue.indexOf("_");
		if (i !== -1) {
			newValue = newValue.slice(0, i);
		}
		let reg = template.substr(0, this.value.length).replace(/_+/g,
			function (a) {
				return "\\d{1," + a.length + "}";
			}).replace(/[+()]/g, "\\$&");
		reg = new RegExp("^" + reg + "$");
		if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
			this.value = newValue;
		}
		if (event.type === "blur" && this.value.length < 5) {
			this.value = "";
		}

	}

	for (const elem of elems) {
		elem.addEventListener("input", mask);
		elem.addEventListener("focus", mask);
		elem.addEventListener("blur", mask);
	}

}
// use
maskPhone('.input-tel');