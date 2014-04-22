<style>
	body{
		display: none;
		background-image: url("https://sites.accenture.com/publishing/Mexico/MKTDev/assets/img/ajax-loader.gif");
		background-position: center center;
		background-repeat: no-repeat;
	}

</style>
<link rel="stylesheet" href="https://sites.accenture.com/publishing/Mexico/MKTDev/assets/css/main.css">
<link rel="stylesheet" href="https://sites.accenture.com/publishing/Mexico/MKTDev/assets/css/app.css">

<!--[if IE]>
 	<link href="/stylesheets/ie.css" media="screen, projection" rel="stylesheet" type="text/css" />
<![endif]-->


<!-- jQuery -->
<script id="topNavItemTemplate" type="text/template">
	<a href="{{=linkUrl}}">{{=title}}</a>
</script>


<script id="slideTemplate" type="text/template">
	<div class="slide">
		<div class="wrapper">
			<div class="callToAction">
				<h2>{{=title}}</h2>
				<p>{{=caption}}</p>
				<a href="{{=linkUrl}}" class="button">Conoce m&aacutes</a>
			</div>
			<img src="{{=imageUrl}}" alt="{{=title}}">
		</div>
	</div>
</script>

<script id="newsItemTemplate" type="text/template">
	<div class="newsItem relevance-{{=relevance}} category-{{=category}} {{if(imageUrl){ }}hasImage {{ } }} {{if(videoId){ }}hasVideo {{ } }}" 
		{{if(relevance=== 'High' && videoId === null){ }}
			style="background-image:url( {{=imageUrl}} )"
		{{ } }}
	>

		{{if(videoId){ }}
			<div class="videoMask"><img src="https://img.youtube.com/vi/{{=videoId}}/0.jpg"/></div>
			<a class="videoLink" href="#" data-videoId="{{=videoId}}">Ver Video</a>
		{{ }else{  }}

			{{if(imageUrl){ }}
				<div class="tile-thumb"><img src="{{=imageUrl}}" class="list-image"/>	</div>
			{{ } }}
		{{ } }}

		{{if(imageUrl && relevance==='Low'){ }}
			<div class="imageMask" style="background-image:url({{=imageUrl}})"></div>
		{{ } }}
		<div class="info {{if(imageUrl){ }} hasImage {{ } }}">
			<h4><a href="detail.aspx#{{=id}}">{{=title}}</a></h4>
			<p class="date">{{=date}}</p>
			<div class="tags"><a href="#" class="link-{{=tag}}">{{=tag}}</a></div>
			<a href="detail.aspx#{{=id}}" class="more">Conoce m&aacutes</a>
		</div>
	</div>
</script>
<script id="detailViewTemplate" type="text/template">
	<div class="newsDetail">
		<h1>{{=title}}</h1>
		<p>{{=content}}</p>
	</div>
</script>

<script   src="https://sites.accenture.com/publishing/Mexico/MKTDev/assets/js/vendor/json2.js"></script>
<script   src="https://sites.accenture.com/publishing/Mexico/MKTDev/assets/js/vendor/jquery2.js"></script>

<script   src="https://sites.accenture.com/publishing/Mexico/MKTDev/assets/js/vendor/underscore.js"></script>
<script   src="https://sites.accenture.com/publishing/Mexico/MKTDev/assets/js/vendor/backbone.js"></script>


<script   src="https://sites.accenture.com/publishing/Mexico/MKTDev/assets/js/vendor/backbone.sharepoint.soap.js"></script>
<script   src="https://sites.accenture.com/publishing/Mexico/MKTDev/assets/js/vendor/backbone.filtered.collection.js"></script>
<script   src="https://sites.accenture.com/publishing/Mexico/MKTDev/assets/js/vendor/backbone.sorting.js"></script>
<script   src="https://sites.accenture.com/publishing/Mexico/MKTDev/assets/js/vendor/backbone.viewOptions.js"></script>
<script   src="https://sites.accenture.com/publishing/Mexico/MKTDev/assets/js/vendor/cycle.js"></script>
<script   src="https://sites.accenture.com/publishing/Mexico/MKTDev/assets/js/vendor/moment.js"></script>
<script   src="https://sites.accenture.com/publishing/Mexico/MKTDev/assets/js/vendor/masonry.js"></script>
<script   src="https://sites.accenture.com/publishing/Mexico/MKTDev/assets/js/_config.js"></script> 
<script   src="https://sites.accenture.com/publishing/Mexico/MKTDev/assets/modules/TopNavigation.js"></script> 
<script   src="https://sites.accenture.com/publishing/Mexico/MKTDev/assets/js/common.js"></script> 
<script   src="https://sites.accenture.com/publishing/Mexico/MKTDev/assets/js/index.js"></script> 


<div id="overlay"></div>
<div class="videoModal"></div>

<div class="topNavigation"><ul id="topNav"></ul></div>


<div class="content" id="indexView">
	<div class="sliderContainer">
		<div id="slides"></div>
		<div class="controls">
			<a href="#" id="prev">Prev</a>
			<a href="#" id="next">Next</a>
		</div>
	</div>
	<div id="newsList" class="newsList">
		<div id="filters">
			<div id="categoryFilter">
				<a data-filter="all" 	class="active-tab"	href="#"><i></i>Access me</a>
				<a data-filter="business" 	href="#"><i></i>Our Business</a>
				<a data-filter="growth" 	href="#"><i></i>Our growth</a>
				<a data-filter="people" 	href="#"><i></i>Our people</a>
			</div>
		</div>
		<div class="news-header">
			<h2>Noticias Recientes</h2>
			<a href="#" class="access-me"></a>
			<div id="viewFilter">
				<a data-filter="list" 		href="#" class="listView"><i></i>View List</a>
				<a data-filter="grid" 		href="#" class="gridView selected"><i></i>View Grid</a>
			</div>
		</div>
		<div class="news"></div>

	</div>
</div>