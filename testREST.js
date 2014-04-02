<link rel="stylesheet" href="https://sites.accenture.com/publishing/Mexico/MKTDev/assets/css/main.css">


<!--[if IE]>
 	<link href="/stylesheets/ie.css" media="screen, projection" rel="stylesheet" type="text/css" />
<![endif]-->


<!-- jQuery -->
<script   src="https://sites.accenture.com/publishing/Mexico/MKTDev/assets/js/vendor/json2.js"></script>
<script   src="https://sites.accenture.com/publishing/Mexico/MKTDev/assets/js/vendor/jquery2.js"></script>
<script   src="https://sites.accenture.com/publishing/Mexico/MKTDev/assets/js/vendor/underscore.js"></script>
<script   src="https://sites.accenture.com/publishing/Mexico/MKTDev/assets/js/vendor/backbone.js"></script>
<script   src="https://sites.accenture.com/publishing/Mexico/MKTDev/assets/js/vendor/backbone.sharepoint.soap.js"></script>





<script   src="https://sites.accenture.com/publishing/Mexico/MKTDev/assets/js/app.js"></script> 

<script id="slideTemplate" type="text/template">
	<div style="background-image:url({{imageUrl}})">
		<h2>{{title}}</h2>
		<p>{{caption}}</p>
		<a href="{{linkUrl}}" class="button">Conoce más</a>

	</div>
</script>

<div class="content">
	<div id="sliderContainer" 
		class="cycle-slideshow" 
	    data-cycle-loader=wait
	    data-cycle-auto-height=false
	    data-cycle-fx=scrollHorz
	    data-cycle-timeout=2000
	    data-cycle-pager="#pager1">
		<h1>Slider Container</h1>
	</div>
	<div class="cycle-pager" id="pager1"></div>

	<div id="slides">
		<h1>List of Slides</h1>
	</div>
</div>
