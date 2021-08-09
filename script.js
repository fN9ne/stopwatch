$(document).ready(function() {

	const D = $('.stopwatch__days');
	const H = $('.stopwatch__hours');
	const M = $('.stopwatch__minutes');
	const S = $('.stopwatch__seconds');

	let s = m = h = d = '00';
	let timer;

	const startWatch = () => {
		clearInterval(timer);
		timer = setInterval(() => {
			s++;
			if (s < 10) s = '0' + s;
			if (s == 60) {
				s = '00';
				m++;
				if (m < 10) m = '0' + m;
				if (m == 60) {
					m = '00';
					h++;
					if (h < 10) h = '0' + h;
					if (h == 24) {
						h = '00';
						d++;
						if (d < 10) d = '0' + d;
					}
				}
			}
			S.html(s);
			M.html(m);
			H.html(h);
			D.html(d);
			writeInStorage(d, h, m, s);
		}, 1000);
	};

	let resetAnimation;

	const resetWatch = () => {
		if (!$('.reset').hasClass('animate')) {
			clearInterval(timer);
			D.html('00');
			H.html('00');
			M.html('00');
			S.html('00');
			s = m = h = d = '00';
			$('.radio-button').removeClass('active');
			writeInStorage(d, h, m, s);
			localStorage.clear();
			$('.reset').addClass('animate');
			resetAnimation = setTimeout(() => {
				$('.reset').removeClass('animate');
			}, 2000);
		}
	};

	const pauseWatch = () => {
		clearInterval(timer);
	};

	$('.radio-button').on('click', toggleStatusWatch);
	$(document).on('keydown', function(e) {
		if (e.keyCode == 32) toggleStatusWatch();
		if (e.keyCode == 82) resetWatch();
	})

	function toggleStatusWatch() {
		$('.radio-button').toggleClass('active');
		if ($('.radio-button').hasClass('active')) {
			startWatch();
		} else {
			pauseWatch();
		}
	}

	$('.reset').on('click', resetWatch);

	$('.set').on('click', '.set__button', function() {
		$(this).parent().toggleClass('active');
	});
	$('.set__area').on('click', function() {
		$(this).parent().removeClass('active');
	});

	$('.set').on('click', 'button', function() {
		let parent = $(this).parent();
		let days = parent.find('.set__days input');
		let hours = parent.find('.set__hours input');
		let minutes = parent.find('.set__minutes input');
		let seconds = parent.find('.set__seconds input');
		daysV = days.val();
		hoursV = hours.val();
		minutesV = minutes.val();
		secondsV = seconds.val();
		if (daysV < 10 && daysV !== '00') daysV = '0' + daysV;
		if (hoursV < 10 && hoursV !== '00') hoursV = '0' + hoursV;
		if (minutesV < 10 && minutesV !== '00') minutesV = '0' + minutesV;
		if (secondsV < 10 && secondsV !== '00') secondsV = '0' + secondsV;
		D.html(daysV);
		H.html(hoursV);
		M.html(minutesV);
		S.html(secondsV);
		d = daysV;
		h = hoursV;
		m = minutesV;
		s = secondsV;
		days.val('00');
		hours.val('00');
		minutes.val('00');
		seconds.val('00');
		$('.set').removeClass('active');
		clearInterval(timer);
		$('.radio-button').removeClass('active');
		writeInStorage(d, h, m, s);
	});

	function writeInStorage(d, h, m, s) {
		localStorage.setItem('sec', s);
		localStorage.setItem('min', m);
		localStorage.setItem('hour', h);
		localStorage.setItem('day', d);
	}

	if (localStorage.length > 0) {
		$('.last-time').addClass('active');
		$('.last-time__days').html(localStorage.getItem('day'));
		$('.last-time__hours').html(localStorage.getItem('hour'));
		$('.last-time__minutes').html(localStorage.getItem('min'));
		$('.last-time__seconds').html(localStorage.getItem('sec'));
	}

	$('.last-time__answer').on('click', function() {
		if ($(this).hasClass('last-time__answer--positive')) {
			D.html(localStorage.getItem('day'));
			H.html(localStorage.getItem('hour'));
			M.html(localStorage.getItem('min'));
			S.html(localStorage.getItem('sec'));
			d = localStorage.getItem('day');
			h = localStorage.getItem('hour');
			m = localStorage.getItem('min');
			s = localStorage.getItem('sec');
		}
		$(this).closest('.last-time').removeClass('active');
	});

});