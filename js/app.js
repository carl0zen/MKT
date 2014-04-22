 // configuration for underscores template syntax

 $(document).ready(function(e){



  _.templateSettings = {
      evaluate:    /\{\{(.+?)\}\}/g,
      interpolate: /\{\{=(.+?)\}\}/g,
      escape:      /\{\{-(.+?)\}\}/g
  };

  // Defining the site root to reference it later on in every list call made by the app
  var siteRoot = '/publishing/Mexico/MKTDev/';

  
  // Defining the app router
/** Top Navigation **/


  var TopNavItem = Backbone.SP.Item.extend({});
  
  var TopNavItems = Backbone.SP.List.extend({
    model:TopNavItem, 
    site: siteRoot, 
    list: 'TopNavigation', 
    view: ''
  });
 
  
  var TopNavItemView = Backbone.View.extend({
    tagName: 'li',
    initialize: function(){
      this.render();
    },
    render: function(){
      var linkUrl = this.model.get('linkUrl');
      var template =  _.template($('#topNavItemTemplate').html(),{
        title: this.model.get('Title'),
        linkUrl: linkUrl.split(',')[0]
      });
      this.$el.html(template);
      return this;

    }
  });


  var TopNavItemsView = Backbone.View.extend({
    //tagName:'ul',
    initialize: function(){
      this.render();
    },
    render:function(){

      this.collection.forEach(function(model){

        var topNavView = new TopNavItemView({model:model});
        $('#topNav').append(topNavView.el);

      }, this);
    }

  });

 
  
  
  /**

  
 .oooooo..o oooo   o8o        .o8                     
d8P'    `Y8 `888   `"'       "888                     
Y88bo.       888  oooo   .oooo888   .ooooo.  oooo d8b 
 `"Y8888o.   888  `888  d88' `888  d88' `88b `888""8P 
     `"Y88b  888   888  888   888  888ooo888  888     
oo     .d8P  888   888  888   888  888    .o  888     
8""88888P'  o888o o888o `Y8bod88P" `Y8bod8P' d888b    


  **/

  // We start defining a model  from the sharepoint List
  var Slide = Backbone.SP.Item.extend({});
  
  var Slides = Backbone.SP.List.extend({
    model:Slide, 
    site: siteRoot, 
    list: 'Slider', 
    view: ''
  });
 
  
  var SlideView = Backbone.View.extend({
    tagName: 'div',
    initialize: function(){
      this.render();
    },
    render: function(){
      //console.log(this.model.attributes.caption);
      var imageUrl = this.model.get('imageUrl');

      var template =  _.template($('#slideTemplate').html(),{
        caption: this.model.get('caption'), 
        title: this.model.get('Title'),
        imageUrl: imageUrl.split(',')[0],
        linkUrl: this.model.get('.linkUrl')
      });
      this.$el.html( template);
      return this;

    }
  });

  var SlidesView = Backbone.View.extend({
    //tagName:'ul',
    el: $('#slides'),
    initialize: function(){
      this.render();
    },
    render:function(){
      console.log(this.collection);
      window.collection = this.collection;
      this.collection.forEach(function(collection){

        var slideView = new SlideView({model:collection});
        this.$el.append(slideView.el);

      }, this);
      // Initializing cycle slider
      $('#slides').after('<div id="nav">').cycle({ 

          speed:  'fast', 
          timeout: 7000, 
          pager:  '#nav',
          fx:     'scrollHorz', 
          prev:   '#prev', 
          next:   '#next',
          slideResize: true,
          containerResize: false,
          width: '100%',
          fit: 1
      });
    }

  });

  /**

ooooo      ooo               .    o8o             o8o                     
`888b.     `8'             .o8    `"'             `"'                     
 8 `88b.    8   .ooooo.  .o888oo oooo   .ooooo.  oooo   .oooo.    .oooo.o 
 8   `88b.  8  d88' `88b   888   `888  d88' `"Y8 `888  `P  )88b  d88(  "8 
 8     `88b.8  888   888   888    888  888        888   .oP"888  `"Y88b.  
 8       `888  888   888   888 .  888  888   .o8  888  d8(  888  o.  )88b 
o8o        `8  `Y8bod8P'   "888" o888o `Y8bod8P' o888o `Y888""8o 8""888P' 



  **/
   
  // We start defining a model  from the sharepoint List
  var NewsItem = Backbone.SP.Item.extend({});
  
  var NewsList = Backbone.SP.List.extend({
    model:NewsItem, 
    site: siteRoot, 
    list: 'Noticias', 
    view: ''
  });
 
  
  var NewsItemView = Backbone.View.extend({

    initialize: function(){
      this.render();
    },
    getVideoId: function(url) {
        
          var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
          var match = url.match(regExp);
          if (match&&match[1].length==11){
              return match[1];
          }else{
              return false;
          }
      
    },
    render: function(){
      var imageUrl = this.model.get('imageUrl');

      if(imageUrl){
        imageUrl = imageUrl.split(',')[0]
      }

      var videoUrl = this.model.get('videoUrl');

      var videoid;

      if(videoUrl != null) {
        videoUrl = videoUrl.split(',')[0];
        videoid = this.getVideoId(videoUrl);


      } else { 
         videoid = null;
      }


      var template =  _.template($('#newsItemTemplate').html(),{
        title: this.model.get('Title'), 
        date: moment(this.model.get('date')).format('MMMM DD, YYYY'),
        category: this.model.get('category'),
        tag: this.model.get('tag'),
        videoUrl: this.model.get('videoUrl'),
        videoId: videoid,
        imageUrl: imageUrl,
        id: this.model.get('ID'),
        relevance: this.model.get('relevance'),
        content: this.model.get('content')
      });
      this.$el.html( template);
      return this;

    }
  });

  

  var NewsListView = Backbone.View.extend({
    //tagName:'ul',
    el: $('#newsList'),
    events: {
      'click #filters a':'filter', 
      'click #viewFilter a': 'viewFilter',
      'click a.videoLink': 'openVideoModal'
    },
    initialize: function(){
      this.render();
    },
    render:function(){
      var currentMonth = moment(this.collection.models[0].get('date')).month()-1;
      var month, monthId;
      this.collection.forEach(function(model){
        var date = moment(model.get('date'));
        date = date.format('MMMM DD, YYYY');

      
        //model.set({date: date});

        var thisMonth = moment(date).month();

        //Check if the month has changed

        if(thisMonth !== currentMonth){

          currentMonth = thisMonth;
          month = moment(date).format('MMMM YYYY');
          monthId = moment(date).format('MMYY');
          $('.news').append('<div class="dateWrapper"><h3>'+ month +'</h3></div><div class="month" id="month-'+monthId+'"></div>').hide().fadeIn(300);
        }

        var newsItemView = new NewsItemView({model:model});
        $('#month-'+monthId).append(newsItemView.el).hide().fadeIn(300);

      }, this);
      $('.month > div').addClass('.newsItemWrapper');
      $('.month').masonry({
        columnWidth: 350,
        itemSelector: '.newsItemWrapper'
      });
    },
    openVideoModal: function(e){
      e.preventDefault();
      var videoId = $(e.currentTarget).attr('data-videoId');
      $('#overlay').fadeIn(300, function(e){
        $('.videoModal').html('<iframe width="853" height="480" src="//www.youtube.com/embed/'+videoId+'" frameborder="0" allowfullscreen></iframe>').hide();
        $('.videoModal').fadeIn(300);
       

      });

      return false;
    },
    viewFilter: function(e){

      $('#viewFilter a').removeClass('selected');
      $(e.currentTarget).addClass("selected");
      var filter = $(e.currentTarget).attr('data-filter');


      if (filter === 'list'){
        $('.news').removeClass('grid').addClass('list');
      }else{
        $('.news').removeClass('list').addClass('grid');
      }
      return false;

    },
    filter: function(e){

      $('#filters a').removeClass('active-tab');
      $(e.currentTarget).addClass("active-tab");
      this.$el.find('.news').html('');
      var filter = $(e.currentTarget).attr('data-filter');


      this.collection.filterBy({category: filter});

      this.collection.sortBy('date','desc');

      if(filter === 'all'){
        this.collection.resetFilters();
      }
      this.render();
      return false;

    }

  });

  
  /** 
      .o8                .             oooo  oooo            
     "888              .o8             `888  `888            
 .oooo888   .ooooo.  .o888oo  .oooo.    888   888   .ooooo.  
d88' `888  d88' `88b   888   `P  )88b   888   888  d88' `88b 
888   888  888ooo888   888    .oP"888   888   888  888ooo888 
888   888  888    .o   888 . d8(  888   888   888  888    .o 
`Y8bod88P" `Y8bod8P'   "888" `Y888""8o o888o o888o `Y8bod8P' 
**/
// Add the view options functionality to all our views.
Backbone.ViewOptions.add( Backbone.View.prototype );

var DetailView = Backbone.View.extend({
  options: ["id"],
  el:$('#app'),
  initialize: function(options){
    this.setOptions(options);
    this.render();
  },
  
  render:function(){

    var template = _.template($('#detailViewTemplate').html(),{
        title: news._byId[this.id].attributes.LinkTitle,
        content: news._byId[this.id].attributes.content
      });
    this.$el.html(template);
  }

});


/** LF Banner **/
var LFBannerItem = Backbone.SP.Item.extend({});
  
  var LFBannerItems = Backbone.SP.List.extend({
    model:LFBannerItem, 
    site: siteRoot, 
    list: 'LFBanner', 
    view: ''
  });
 
  
  var LFBannerItemView = Backbone.View.extend({
    tagName: 'div',
    initialize: function(){
      this.render();
    },
    render: function(){
      var linkUrl = this.model.get('linkUrl');
      var imageUrl = this.model.get('imageUrl');

      var template =  _.template($('#LFBannerTemplate').html(),{
        title: this.model.get('Title'),
        linkUrl: linkUrl.split(',')[0],
        imageUrl: imageUrl.split(',')[0]
      });
      this.$el.html(template);
      return this;

    }
  });


  var LFBannerItemsView = Backbone.View.extend({
    //tagName:'ul',
    initialize: function(){
      this.render();
    },
    render:function(){

      this.collection.forEach(function(model){

        var lfBannerView = new LFBannerItemView({model:model});
        $('#LFBanner').append(lfBannerView.el);

      }, this);
    }

  });

//Hide Overlay
$('#overlay').click(function(e){
  $('.videoModal, #overlay').fadeOut(300);
});
 
// Render Menu
topNavItems = new TopNavItems();

//Fetching the content from the Sharepoint List
topNavItems.fetch({
  success: function(e){
    var topNavItemsView = new TopNavItemsView({collection:topNavItems});
  }
});


var AppRouter = Backbone.Router.extend({
        routes: {
            "":'renderIndexView',
            "noticia/:id": "renderNewView" // matches http://example.com/#anything-here
        },
       
        renderIndexView:function(){
          var IndexView = Backbone.View.extend({
            el:$('#app'), 
            initialize: function(){
              this.render();
            },
            render: function(){
              var template = _.template($('#indexViewTemplate').html());
              this.$el.html(template);
            }
          });
          var indexView = new IndexView();
          _this = this;
          _(function() {
              _this.renderSlider();
              _this.renderNews();
          }).defer();

        },
        renderNewView: function(id){

          
          if(typeof news === 'undefined'){
            news = new NewsList();

            //Fetching the content from the Sharepoint List
            news.fetch({
              success:function(){
                var detailView = new DetailView({'id':id});

              }
            });
          }else{
            var detailView = new DetailView({'id':id});
            
          }

          //this.renderLFBanner();
           //Add breadcrumb
          var breadcrumb = $('.p2-breadcrumbCurrent');

          breadcrumb.html('<a href="#">'+$('.p2-breadcrumbCurrent').html()+'</a>');
          breadcrumb.after('<span> &gt; </span><span>'+news._byId[id].attributes.LinkTitle+'</span>');
          //Check if news object exist
         
        },
        renderSlider:function(){
          // Creating an instance of slides
          slidesInstance = new Slides();

          //Fetching the content from the Sharepoint List
          slidesInstance.fetch({
            success: function(e){

              var slidesView = new SlidesView({collection:slidesInstance});
            }
          });
        },
        renderNews:function(){

           // Creating an instance of slides
          news = new NewsList();

          //Fetching the content from the Sharepoint List
          news.fetch({
            success: function(e){
              // Creating a filtering function
              var sorted = new SortedCollection(news);
              sorted.setSort('date','desc');

              var filteredNews = new FilteredCollection(sorted);
              var newsListView = new NewsListView({collection:filteredNews});
            }
          });
        },
        renderLFBanner: function(){
             var lfBannerItems = new LFBannerItems();
            lfBannerItems.fetch({
                success: function(){
                  var lfBannerView = new LFBannerItemsView({collection:lfBannerItems});
                }
            });
        }

    });
    // Initiate the router
    var app_router = new AppRouter;

    // Start Backbone history a necessary step for bookmarkable URL's
    Backbone.history.start();



 });




/**
$(document).ready(function(e){

  function loadData(){
    var call = $.ajax({
      url: "https://sites.accenture.com/publishing/Mexico/MKTDev/_vti_bin/listdata.svc/Slider?select=Headline,Caption,ImageUrl&top=500",
      type: "GET",
      dataType: "json",
      headers: {
        Accept: "application/json;odata=verbose"
      }
    });
    var dataObject, slideJSONString, slideJSON;
      call.done(function (data,textStatus, jqXHR){
        dataObject = data.d.results;
        slideJSONString = JSON.stringify(dataObject);
        slideJSON = JSON.parse(slideJSONString);
        console.log(slideJSON);
        slideJSON.forEach(function(o){

          $('#sliderContainer').append('<div class="slide">'+'<h1>'+o.Headline+'</h1>'+
            '<p>'+o.Caption + '</p>'+
            '<p class="small"'+ o.ModifiedBy+'</p>'
            +'</div>');
          
        });
        
      });
      call.fail(function (jqXHR,textStatus,errorThrown){
        alert("Error in communication: " + jqXHR.responseText);
      });
  }

  loadData();
  
  
}); **/