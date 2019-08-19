
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script>
$(document).ready(function () {
    $('h2:not(.author)').each(function () {
        $(this).wrapAll('<div class="slide-title" />');
    });	
	$('h1.title').each(function () {
        $(this).wrapAll('<div class="slide-title" />');
    });	
});

var f = (function() {
	// get scale
	var element = document.querySelector('.slides');
	var scaleX = element.getBoundingClientRect().width / element.offsetWidth;
	var bottom = $(".present > .slide-title").offset().top + ($(".present > .slide-title").outerHeight() * scaleX);
	
	$(":root")[0].style.setProperty('--header-height', Math.floor(bottom) + 'px');
});

window.addEventListener( 'load', f);
$(window).resize(f);
Reveal.addEventListener( 'slidechanged', f);
Reveal.addEventListener( 'overviewshown', function() {
	$('.banner').addClass( "overview" );
} );
Reveal.addEventListener( 'overviewhidden', function() {	
	$('.banner').removeClass( "overview" );
});
Reveal.addEventListener( 'overviewhidden', f);


</script>