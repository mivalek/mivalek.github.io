
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

function copyCode(text) {
    var dummy = document.createElement("textarea");
    // to avoid breaking orgain page when copying more words
    // cant copy when adding below this code
    // dummy.style.display = 'none'
    document.body.appendChild(dummy);
    //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
    dummy.value = $(text).text();
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

</script>
