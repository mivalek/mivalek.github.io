
Reveal.addEventListener('slidechanged', function(event) {
	var gifAttr = event.currentSlide.getAttribute('data-gif');
	if (gifAttr && gifAttr === 'repeat') {
		var img = event.currentSlide.querySelector('img');
		var gif = img.getAttribute('src');

		img.setAttribute('src', gif + '?t=' + (new Date().getTime()));
	}
}, false);
