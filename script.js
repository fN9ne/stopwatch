$(document).ready(function() {

	function getCookie(name) {
		name += "=";
		beg = document.cookie.indexOf(name);
		if (beg === -1) return -1;
		else beg += name.length;
		end = document.cookie.indexOf(";", beg);
		if (end === -1) end = document.cookie.length;
		return document.cookie.substring(beg, end);
	}

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
			writingCookie(d, h, m, s);
		}, 1000);
	};

	const resetWatch = () => {
		clearInterval(timer);
		D.html('00');
		H.html('00');
		M.html('00');
		S.html('00');
		s = m = h = d = '00';
		$('.radio-button').removeClass('active');
		writingCookie(d, h, m, s);
		document.cookie = 'days=-1;max-age=-1;';
		document.cookie = 'minutes=-1;max-age=-1;';
		document.cookie = 'hours=-1;max-age=-1;';
		document.cookie = 'seconds=-1;max-age=-1;';
	};

	const pauseWatch = () => {
		clearInterval(timer);
	};

	$('.radio-button').on('click', function() {
		$(this).toggleClass('active');
	});

	$('.radio-button').on('click', function() {
		if ($(this).hasClass('active')) {
			startWatch();
		} else {
			pauseWatch();
		}
	});
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
		writingCookie(d, h, m, s);
	});

	function writingCookie(d, h, m, s) {
		document.cookie = `days=${d};max-age=48004800;`;
		document.cookie = `hours=${h};max-age=48004800;`;
		document.cookie = `minutes=${m};max-age=48004800;`;
		document.cookie = `seconds=${s};max-age=48004800;`;
	}

	if (getCookie('days') !== -1) {
		$('.last-time').addClass('active');
		$('.last-time__days').html(getCookie('days'));
		$('.last-time__hours').html(getCookie('hours'));
		$('.last-time__minutes').html(getCookie('minutes'));
		$('.last-time__seconds').html(getCookie('seconds'));
	}

	$('.last-time__answer').on('click', function() {
		if ($(this).hasClass('last-time__answer--positive')) {
			D.html(getCookie('days'));
			H.html(getCookie('hours'));
			M.html(getCookie('minutes'));
			S.html(getCookie('seconds'));
			d = getCookie('days');
			h = getCookie('hours');
			m = getCookie('minutes');
			s = getCookie('seconds');
		}
		$(this).closest('.last-time').removeClass('active');
	});

});