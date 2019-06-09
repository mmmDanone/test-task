$('#slider-reviews').flexslider({
	animation: "slide",
	animationLoop: false,
	itemWidth: 300,
	itemMargin: 20,
	minItems: 2,
	maxItems: 4,
	slideshow: false
});

var messages = {
	user: {
		img: 'images/prof-2.png',
		name: 'Наталия Полянская',
		chat: document.getElementById('user-chat'),
		send: document.getElementById('send-user')
	},
	admin: {
		img: 'images/prof-1.png',
		name: 'Администратор',
		chat: document.getElementById('admin-chat'),
		send: document.getElementById('send-admin')
	},
	months: [
		'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
	],
	messages: [
		{
			text: 'Из достопримечательностей могу предложить обратить внимание на вулкан Майон, путешествие запомнится вам надолго хотя бы из-за невероятной сложности подъема на него. Поверьте, это стоит того; также хотелf бы отметить очень важную область исследования.',
			time: 1559843336552,
			destination: 'user'
		},
		{
			text: 'Что из себя представляет вулкан? Просто хочу убедиться, что готова к такому путешествию.',
			time: 1559846931778,
			destination: 'admin'
		},
		{
			text: 'Далеко-далеко за словесными горами в стране, гласных и согласных живут рыбные тексты. Оксмокс пунктуация толку снова рукописи, подзаголовок путь образ которое буквоград решила моей великий, пояс своих, осталось текст правилами по всей. Одна даже строчка парадигматическая осталось предупреждал которое по всей за приставка, продолжил образ рот запятой от всех бросил.',
			time: 1559935405877,
			destination: 'user'
		},
		{
			text: 'Очень интересно.',
			time: 1559935693648,
			destination: 'admin'
		}
	],

	init: function(argument) {
		this.print('user', 0);
		this.print('admin', 0);

		this.user.send.addEventListener('submit', this.userSend.bind(this));
		this.admin.send.addEventListener('submit', this.adminSend.bind(this));
	},

	userSend: function(e) {
		e.preventDefault();
		this.send('admin', e.currentTarget.elements[0]);
	},

	adminSend: function(e) {
		e.preventDefault();
		this.send('user', e.currentTarget.elements[0]);
	},

	send: function(toWhom, text) {
		if(text.value) {
			this.pushM({
				text: text.value,
				time: new Date().getTime(),
				destination: toWhom
			});

			text.value = '';
		}
	},

	pushM: function(message) {
		this.messages.push(message);

		this.print('user', this.user.lastM);
		this.print('admin', this.admin.lastM);
	},

	print: function(whoIs, last) {
		for (var i = last; i < this.messages.length; i++) {
			var message = this.messages[i];

			var timeD = document.createElement('div');
			var time = new Date(message.time);
			time = time.getDate() + ' ' + this.months[time.getMonth()] + ' ' + time.getFullYear() + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
			timeD.appendChild(document.createTextNode(time));
			timeD.className = 'time';

			var textD = document.createElement('div');
			textD.appendChild(document.createTextNode(message.text));
			textD.appendChild(timeD);
			textD.className = 'text';

			var avaI = document.createElement('img');
			avaI.src = this[message.destination].img;

			var avaD = document.createElement('div');
			avaD.appendChild(avaI);
			avaD.className = 'ava';

			var messageD = document.createElement('div');
			messageD.appendChild(avaD);
			messageD.appendChild(textD);

			if(message.destination !== whoIs) {
				messageD.className = 'addresser';
			}

			this[whoIs].chat.appendChild(messageD);
		}

		this[whoIs].lastM = i;
		this[whoIs].chat.scrollTop = this[whoIs].chat.scrollHeight;
	}
}

messages.init();

function popup(element) {
	var popup = document.createElement('div');
	var popupCon = document.createElement('div');
	popup.appendChild(popupCon);
	popup.className = 'popup';
	popup.style.cssText = 'top: ' + window.pageYOffset + 'px';

	popupCon.style.width = document.documentElement.clientWidth + 'px';
	popupCon.style.height = document.documentElement.clientHeight + 'px';

	popupCon.appendChild(element);

	document.body.classList.add('active-popup');
	document.body.appendChild(popup);

	popupCon.addEventListener('click', closedPopup);
}

function closedPopup(e) {
	if(e.currentTarget === e.target) {
		document.body.classList.remove('active-popup');
		var popup = e.currentTarget.parentElement;
		e.currentTarget.removeEventListener('click', closedPopup);
		popup.parentElement.removeChild(popup);
	}
}

function gallery() {
	var photoCollection = document.querySelectorAll('.photo-review-collection');
	for (var i = photoCollection.length - 1; i >= 0; i--) {
		var container = photoCollection[i];
		var parentContainer = container.parentElement;
		var containerWidth = container.offsetWidth;

		$(container).lightGallery({
			mode: 'lg-fade'
		});

		parentContainer.__allImg = container.cloneNode(true);
		parentContainer.__allImg.className = 'photo-all-collection';

		$(parentContainer.__allImg).lightGallery({
			mode: 'lg-fade'
		});

		var photoColl = container.children;
		var childWidth = 0;

		var hiddenPhoto = 0;
		var lastChildWidth;

		for (var z = 0; z < photoColl.length; z++) {
			var photo = photoColl[z];
			childWidth = childWidth + photo.offsetWidth;

			if(childWidth >= containerWidth) {
				photo.parentElement.removeChild(photo);
				--z;
				hiddenPhoto++;
				continue;
			}

			lastChildWidth = {
				offset: childWidth - photo.offsetWidth,
				width: photo.offsetWidth - parseInt(window.getComputedStyle(photo.children[0]).marginRight)
			};
		}

		if(hiddenPhoto > 0) {
			var photoGag = document.createElement('div');
			photoGag.appendChild(document.createTextNode('+' + hiddenPhoto));
			photoGag.className = 'photo-gag';

			photoGag.style.left = lastChildWidth.offset + 'px';
			photoGag.style.width = lastChildWidth.width + 'px';

			photoGag.addEventListener('click', function(e) {
				var AllPhoto = e.currentTarget.parentElement.__allImg;
				popup(AllPhoto);
			});
		}

		parentContainer.appendChild(photoGag);
	}
}

function initGall() {
	setTimeout(gallery, 100);
}

window.addEventListener('load', initGall);