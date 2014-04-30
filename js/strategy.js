 
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

$(document).ready(function(e){
  Backbone.ViewOptions.add( Backbone.View.prototype );



  var StorySliderView = Backbone.View.extend({
    options: ["id"],
    el: $('#storySlider'),
    initialize: function(options){
      this.setOptions(options);
      this.render();
    },

    render: function(){
      this.$el.html('');
      var _this = this;

      this.$el.append('<ul class="slider"></ul><a href="#" id="prevStory">PREV</a><a href="#" id="nextStory">NEXT</a>');
      
      $('#nextStory, #prevStory').click(function(e){return false;});
      // counter of models
      this.model.forEach(function(model){
         
          var title = model.get('Title');   
          var id = model.get('ID');
          //Exclude current article from slider
          if (id !== _this.id){
            var image = model.get('imageUrl');

            if(typeof image !== 'undefined' && image.length > 0) {
              image = image.split(',')[0];image = '<span class="mask"><img src="'+image+'"/></span>';}else{image='';}
            title = title.substring(0, 100);
            $('#storySlider .slider').append('<li>'+image+'<a href="#'+id+'">'+title+'</a></li>');
          }
        
      });
      //count number of slides minus 1 (current)
      var noSlides = Math.round((news.length-1)/2);

      var currentSlide = Math.ceil(this.id/2);

      var lis = $(".slider li");
      //counts the number of pages in slider
      var counter = 0;
      for(var i = 0; i < lis.length; i+=2) {
        counter++;

        lis.slice(i, i+2).wrapAll("<div class='slide'>P&aacute;gina "+counter+" de "+noSlides+" </div>");
      }
      $('#storySlider ul').cycle({ 
          fx:     'fade', 
          speed:  'fast', 
          timeout: 0, 
          next:   '#nextStory', 
          prev:   '#prevStory' 
      }).cycle(currentSlide-1);
      //this.$el.html(template);
    }
  });

  var DetailView = Backbone.View.extend({
    options: ["id"],
    el:$('#detailView'),
    initialize: function(options){
      this.setOptions(options);
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
    render:function(){
      //Get the image from another list
      newObj = news._byId[this.id].attributes;


      var imageUrl = newObj.imageUrl;

      if(imageUrl){
        imageUrl = imageUrl.split(',')[0]
      }

      var videoUrl = newObj.videoUrl;

      var videoid;

      if(videoUrl != null) {
        videoUrl = videoUrl.split(',')[0];
        videoid = this.getVideoId(videoUrl);


      } else { 
         videoid = null;
      }



      var template = _.template($('#detailViewTemplate').html(),{
          title     : newObj.LinkTitle,
          content   : newObj.content,

          date      : moment(newObj.date).format('MMMM DD, YYYY'),
          author    : newObj.author0,
          imageUrl  : imageUrl,
          videoId   : videoid,
        
        });
      this.$el.html(template);
    }

  });



 /**
 ****************************************************

 ****************************************************/
  var StrategyBanner = Backbone.SP.Item.extend({});
  
  var StrategyBannerItems = Backbone.SP.List.extend({
    model:StrategyBanner, 
    site: siteRoot, 
    list: 'MexicoStrategyBanner', 
    view: ''
  });
 


/**

                   oooo                .                   .o8  
                   `888              .o8                  "888  
oooo d8b  .ooooo.   888   .oooo.   .o888oo  .ooooo.   .oooo888  
`888""8P d88' `88b  888  `P  )88b    888   d88' `88b d88' `888  
 888     888ooo888  888   .oP"888    888   888ooo888 888   888  
 888     888    .o  888  d8(  888    888 . 888    .o 888   888  
d888b    `Y8bod8P' o888o `Y888""8o   "888" `Y8bod8P' `Y8bod88P" 

**/
  var RelatedNewItemView = Backbone.View.extend({
    options: ["id"],
    tagName: 'li',
    getVideoId: function(url) {
        
          var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
          var match = url.match(regExp);
          if (match&&match[1].length==11){
              return match[1];
          }else{
              return false;
          }
      
    },
    initialize: function(opts){
      this.setOptions(opts);
      this.render();
    },
    renderTemplate: function(news){
      console.log(news);
      var newObj = news._byId[this.id].attributes;
      var imageUrl = newObj.imageUrl;

      if(imageUrl){
        imageUrl = imageUrl.split(',')[0]
      }

      var videoUrl = newObj.videoUrl;

      var videoid;

      if(videoUrl != null) {
        videoUrl = videoUrl.split(',')[0];
        videoid = this.getVideoId(videoUrl);


      } else { 
         videoid = null;
      }
      

      var template = _.template($('#relatedNewItemTemplate').html(),{
      
        title: newObj.LinkTitle,
        date: moment(newObj.date).format('MMMM DD, YYYY'),
        tag: newObj.tag,
        imageUrl: imageUrl,
        videoId: videoid,
        id:this.id
      });
      this.$el.html(template);
    },
    render: function(){
      var _this = this;

      var NewsItem = Backbone.SP.Item.extend({});

      var NewsList = Backbone.SP.List.extend({
        model:NewsItem, 
        site: siteRoot, 
        list: 'Noticias', 
        view: ''
      });
      var news = new NewsList();
      news.fetch({
        success:function(e){

          _this.renderTemplate(news);
        }
      });
      return this;
    }
  });

  var RelatedNewsView = Backbone.View.extend({
      options: ["id"],
      initialize: function(options){
        
        this.setOptions(options);
        this.render();
      },
      render:function(){
      
        var id = this.id;

        var newObj = news._byId[id].attributes;

         
        var related =[];
        if (newObj.related1_x003a_ID){
          related.push({id:newObj.related1_x003a_ID});
        }
        if (newObj.related2_x003a_ID){
          related.push({id:newObj.related2_x003a_ID});
        }
        if (newObj.related3_x003a_ID){
          related.push({id:newObj.related3_x003a_ID});
        }

        $('#Related').html('');

        _.each(related, function(e){
          if(e){
            var id = e.id.split(';')[0];
            var relatedItem = new RelatedNewItemView({id:id});
            $('#Related').append(relatedItem.el);
          }
        });

      }

  });
  /** Experts**/

  var ExpertItem = Backbone.SP.Item.extend({});
  var ExpertList = Backbone.SP.List.extend({
    site:siteRoot,
    list: 'Expertos'
  });

  var ExpertItemView = Backbone.View.extend({
    tagName: 'li',
    initialize: function(){
      this.render();
    },
    render: function(){
      var imageUrl = this.model.get('imageURL');
      if (imageUrl){
        imageUrl = imageUrl.split(',')[0];
      }else{
        imageUrl = '#';
      }

      var template =  _.template($('#expertItemTemplate').html(),{
        name: this.model.get('Title'), 
        position: this.model.get('Position'),
        imageUrl: imageUrl,
        linkUrl: this.model.get('linkURL')
      });
      this.$el.html(template);
      return this;
    }

  });

  var ExpertsListView = Backbone.View.extend({
    el:$('ul.experts'),
    initialize: function(){
      this.render();
    },
    render: function(){
      this.$el.html('');
      this.collection.forEach(function(collection){

        var expertItemView = new ExpertItemView({model:collection});
        this.$el.append(expertItemView.el);

      }, this);
      $('ul.experts').cycle({ 
          fx:     'fade', 
          speed:  'fast', 
          timeout: 0, 
          next:   '#nextExp', 
          prev:   '#prevExp' 
      });
    }
  });

/**

                                    .o8                               .   
                                   "888                             .o8   
 .oooo.   oo.ooooo.  oo.ooooo.      888oooo.   .ooooo.   .ooooo.  .o888oo 
`P  )88b   888' `88b  888' `88b     d88' `88b d88' `88b d88' `88b   888   
 .oP"888   888   888  888   888     888   888 888   888 888   888   888   
d8(  888   888   888  888   888     888   888 888   888 888   888   888 . 
`Y888""8o  888bod8P'  888bod8P'     `Y8bod8P' `Y8bod8P' `Y8bod8P'   "888" 
           888        888                                                 
          o888o      o888o       

**/
  var news;
  var breadcrumb = $('.p2-breadcrumbCurrent');

      breadcrumb.html('<a href="default.aspx">'
        +$('.p2-breadcrumbCurrent').html()
        +'</a><span> &gt; </span><a href="strategy.aspx">Mexico Strategy</a> ');

      breadcrumb.nextAll().remove();

    var AppRouter = Backbone.Router.extend({
        routes: {
          '': 'defaultView',
            ":id":'renderNewView'
        },
        
        filterCollection: function(cat){
          var sorted = new SortedCollection(news);
          sorted.setSort('order','asc');
          var filteredNews = new FilteredCollection(sorted);

          filteredNews.filterBy({tag:cat});
          var newsListView = new NewsListView({collection:filteredNews});

        },
        defaultView: function(){
          $('#topNav li:first').addClass('selected');
          $('.sidebar, #detailView').hide().fadeIn(300);
          this.fetchItems(null);
          this.renderLFBanner();
          this.renderExpertSlider();
          this.renderAccessMeBanner();

        },
        renderNewView: function(id){
          $('#newsList').hide();
          $('#detailView').hide().fadeIn(300);
          this.fetchItems(id);
          this.renderLFBanner();
          this.renderExpertSlider();
          this.renderAccessMeBanner();
         
        },

        fetchItems: function(id){
            var _this = this;
            

            
            news = new NewsList();

                //Fetching the content from the Sharepoint List
                news.fetch({
                  success:function(){
                    //Add breadcrumb
                    
                    breadcrumb.nextAll().remove();
                    if(id){
                      var detailView = new DetailView({'id':id});
                      
                      breadcrumb.after('<span> &gt; </span><span>'+news._byId[id].attributes.LinkTitle+'</span>');
                      _this.renderStorySlider(id);
                      _this.renderRelatedNews(id);

                    }else{
                      // Sort by story order
                      var sorted = new SortedCollection(news);
                      sorted.setSort('order0','asc');

                      var firstId = sorted.first().id;
                      // Add article title to breadcrumb 


                      // Display the first story for the default view
                      var detailView = new DetailView({'id':firstId});

                      _this.renderStorySlider(firstId);
                      _this.renderRelatedNews(firstId);
                    }
                    //Render the slider for stories;
                    
                  }
                });
            
        },
        renderStorySlider: function(id){

            var storySliderView = new StorySliderView({model:news, id: id});
        },
        renderExpertSlider: function(){
          var expertsList = new ExpertList();
          expertsList.fetch({
            success: function(e){
              var expertsListView = new ExpertsListView({collection:expertsList});
            }
          });

        },
        renderRelatedNews:function(id){
          $('#topNav li:first-child').addClass('selected');
          var relatedNewsView = new RelatedNewsView({'id':id, 'news':news});
        },
        renderLFBanner: function(){
             var lfBannerItems = new LFBannerItems();
            lfBannerItems.fetch({
                success: function(){
                  var lfBannerView = new LFBannerItemsView({collection:lfBannerItems});
                }
            });
        },
        renderAccessMeBanner: function(){
            var accessMeBannerItems = new AccessMeBannerItems();
            accessMeBannerItems.fetch({
                success: function(){
                  var accessMeBannerView = new AccessMeBannerItemsView({collection:accessMeBannerItems});
                }
            });
        }

    });
    // Initiate the router
    var app_router = new AppRouter;

    // Start Backbone history a necessary step for bookmarkable URL's
    Backbone.history.start();


});