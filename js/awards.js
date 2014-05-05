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
    list: 'AccentureEnAccion', 
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
          $('.news').append('<div class="month" id="month-'+monthId+'"></div>').hide().fadeIn(300);
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

$(document).ready(function(e){
  Backbone.ViewOptions.add( Backbone.View.prototype );

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
    getCategoryImage: function(cat){
      var url;

       categoryBanners.forEach(function(model){

          if(model.get('category') === cat){

            url = model.get('LinkTitle');
            
          }
       });

       return url;
      
    },
    render:function(){
      //Get the image from another list
      newObj = news._byId[this.id].attributes;

      var categoryImage = this.getCategoryImage(newObj.category);



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
          title:      newObj.LinkTitle,
          content:    newObj.content,
          category:   newObj.category,
          date:       moment(newObj.date).format('MMMM DD, YYYY'),
          author:     newObj.author,
          tag:        newObj.tag,
          imageUrl: imageUrl,
          videoId: videoid,
          categoryImageUrl: categoryImage
        });
      this.$el.html(template);
    }

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
    el:$('#Related'),
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
    initialize: function(){
      
      this.render();
    },
    renderTemplate: function(){
      var newObj = this.model.attributes;
      console.log(newObj);
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
        id:newObj.ID
      });
      this.$el.append('<li>'+template+'</li>');
    },
    render: function(){
      this.renderTemplate();
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
    
        
        var News = Backbone.SP.List.extend({
          model:NewsItem, 
          site: siteRoot, 
          list: 'Noticias', 
          view: ''
        });

        $('#Related').html('');

        var allNews = new News();
        allNews.fetch({
          success:function(e){
              var filtered = new FilteredCollection(allNews);
              filtered.filterBy({tag:'Client'});

              var sorted = new SortedCollection(filtered);
              sorted.setSort('date','desc');

              var relatedItem = new RelatedNewItemView({model:sorted.first()});

              filtered.filterBy({tag:'Performance'});
              var sorted = new SortedCollection(filtered);
              sorted.setSort('date','desc');

              var relatedItem = new RelatedNewItemView({model:sorted.first()});

              filtered.filterBy({tag:'Future'});
              var sorted = new SortedCollection(filtered);
              sorted.setSort('date','desc');

              var relatedItem = new RelatedNewItemView({model:sorted.first()});

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
      this.$el.html( template);
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
  window.categoryBanners = null;
  categoryBanner = new CategoryBanner();
  categoryBanners = new CategoryBanners({model:categoryBanner});

    var AppRouter = Backbone.Router.extend({
        routes: {
          '': 'defaultView',
            ":id":'renderNewView', 
            "category/:cat": 'filterCategory'
        },
        filterCategory: function(cat){
          $('.sidebar, #detailView').hide();
          $('#newsList').fadeIn(300);
          var _this = this;
          if (typeof news !== 'undefined' && news.length > 0){
            this.filterCollection(cat);
           
          }else{
            news = new NewsList();
            news.fetch({
              success:function(e){
                _this.filterCollection(cat);
              }
            });
          }


        },
        filterCollection: function(cat){
          var sorted = new SortedCollection(news);
          sorted.setSort('date','desc');
          var filteredNews = new FilteredCollection(sorted);

          filteredNews.filterBy({tag:cat});
          var newsListView = new NewsListView({collection:filteredNews});

        },
        defaultView: function(){
          $('#detailView').hide();
          $('#newsList').fadeIn(300);
          this.fetchItems(null);
          this.renderExpertSlider();
        },
        renderNewView: function(id){
          $('#newsList').hide();
          $('#newsList .news').html('');
          $('.sidebar, #detailView').fadeIn(300);
          this.fetchItems(id, function(){
            console.log('Articles fetched successfully');
          });
          this.renderExpertSlider();
        },
        fetchItems: function(id){
            //Fetch category banner list to display as header
            var _this = this;
            this.renderRelatedNews();
            
            categoryBanners.fetch({
              success:function(){
                _this.renderLFBanner();
                _this.renderAccessMeBanner();
                news = new NewsList();

                //Fetching the content from the Sharepoint List
                news.fetch({
                  success:function(){
                    //Add breadcrumb
                    var breadcrumb = $('.p2-breadcrumbCurrent');

                    breadcrumb.html('<a href="default.aspx">'+$('.p2-breadcrumbCurrent').html()+'</a>');
                    breadcrumb.nextAll().remove();

                    if(id){
                      var detailView = new DetailView({'id':id});
                      breadcrumb.after('<span> &gt; </span><span>'+news._byId[id].attributes.LinkTitle+'</span>');
                      

                    }else{
                      // Creating a filtering function
                      var sorted = new SortedCollection(news);
                      sorted.setSort('date','desc');

                      var filteredNews = new FilteredCollection(sorted);
                      var newsListView = new NewsListView({collection:filteredNews});
                    }
                      

                  }
                });
                $('#topNav li:nth-child(2)').addClass('selected');

              }
            });
            
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
          var News = Backbone.SP.List.extend({
            model:NewsItem, 
            site: siteRoot, 
            list: 'Noticias', 
            view: ''
          });

          var allNews = new News();
          allNews.fetch({
            success:function(e){
                
            } 
          });
          var relatedNewsView = new RelatedNewsView();
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