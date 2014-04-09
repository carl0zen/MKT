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
			<h4>{{=title}}</h4>
			<p class="date">{{=date}}</p>
			<div class="tags"><a href="#" class="link-{{=tag}}">{{=tag}}</a></div>
			<a href="#noticia/{{=id}}" class="more">Conoce m&aacutes</a>
		</div>
	</div>
</script>
<script id="detailViewTemplate" type="text/template">
	<div class="newsDetail">
		<h1>{{=title}}</h1>
		<p>{{=content}}</p>
	</div>
</script>