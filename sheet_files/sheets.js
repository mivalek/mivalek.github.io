
<script>

var f = (function() {
    var $toc = $("#TOC"),
		$window = $(window);
	
	var  offset = parseInt($toc.css('marginTop'), 10);
	
    $window.scroll(function() {
		if ($window.scrollTop() > offset - 40) {
			$toc.addClass("sticky");
		} else {	
			$toc.removeClass("sticky");
		}
    });

});


var my_offset = (function() {
	var bottom = $("#header").position().top + $("#header").outerHeight(true);
		
	
	$(":root")[0].style.setProperty('--toc-offset', Math.floor(bottom) + 'px');	
	$(":root")[0].style.setProperty('--header-height', Math.floor(bottom - 30) + 'px');	
});

var toc_width = (function() {
	var toc_w = $('#TOC').parent().width();
	
	$("div.tocify").css('width', toc_w + 'px');
});

$(document).ready(my_offset);
$(document).ready(f);
$(document).ready(toc_width);
$(window).resize(my_offset);
$(window).resize(toc_width);
$(window).resize(f);

</script>
