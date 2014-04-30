 
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
    events: {
      'click #gallery a': 'showLightbox'
    },
    showLightbox: function(e){

      var imageUrl = $(e.currentTarget).attr('href');
      var title = $(e.currentTarget).attr("data-title");
      var description = $(e.currentTarget).attr('data-description');
      var comments = $(e.currentTarget).find('img').attr('alt');
      $('#overlay').fadeIn();
      $('.videoModal')
        .html('<div class="imagecontainer">'+
                 '<span class="title">'+title+'</span>'+
                '<img src="'+imageUrl+'">'+ 
                '<span class="description">'+description+ comments+'</span>'+
              '</div>').fadeIn(300);
      return false;
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
          categoryImageUrl: categoryImage,
        });

      var galleryId = newObj.gallery_x003a_ID;


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
    render: function(){
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
  /**

                                                        .            
                                                      .o8            
 .ooooo.  oooo    ooo oo.ooooo.   .ooooo.  oooo d8b .o888oo  .oooo.o 
d88' `88b  `88b..8P'   888' `88b d88' `88b `888""8P   888   d88(  "8 
888ooo888    Y888'     888   888 888ooo888  888       888   `"Y88b.  
888    .o  .o8"'88b    888   888 888    .o  888       888 . o.  )88b 
`Y8bod8P' o88'   888o  888bod8P' `Y8bod8P' d888b      "888" 8""888P' 
                       888                                           
                      o888o                        

  **/

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
/*
                     oooo  oooo                                 
                     `888  `888                                 
 .oooooooo  .oooo.    888   888   .ooooo.  oooo d8b oooo    ooo 
888' `88b  `P  )88b   888   888  d88' `88b `888""8P  `88.  .8'  
888   888   .oP"888   888   888  888ooo888  888       `88..8'   
`88bod8P'  d8(  888   888   888  888    .o  888        `888'    
`8oooooo.  `Y888""8o o888o o888o `Y8bod8P' d888b        .8'     
d"     YD                                           .o..P'      
"Y88888P'                                           `Y8P'      
*/

  var item = Backbone.SP.Item.extend({});
  var Galleries = Backbone.SP.List.extend({
    model:item,
    site:siteRoot,
    list: 'Galleries'
  });

  var GalleryItemView = Backbone.View.extend({
    options: ['imageUrl', 'thumb','title', 'description', 'comments'],
    initialize: function(opts){
      this.setOptions(opts);
      this.render();
    },
    render: function(){

      var template = _.template($('#galleryItemTemplate').html(),{
        thumb: this.thumb,
        imageUrl: this.imageUrl,
        description: this.description,
        title: this.title,
        comments: this.comments
      });
      $('#gallery').append(template);
      //pass the template
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
          $('.sidebar, #detailView').hide();
          $('#newsList').fadeIn(300);
          this.fetchItems(null);
        },
        renderNewView: function(id){
          $('#newsList').hide();
          $('#newsList .news').html('');
          $('.sidebar, #detailView').fadeIn(300);
          this.fetchItems(id);
          this.renderExpertSlider();
        },
        fetchItems: function(id){
            //Fetch category banner list to display as header
            var _this = this;
            
            
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
                      _this.renderRelatedNews(id);

                      _this.renderGallery(news._byId[id].attributes.gallery_x003a_ID.split(";")[0]);

                    }else{
                      // Creating a filtering function
                      var sorted = new SortedCollection(news);
                      sorted.setSort('date','desc');

                      var filteredNews = new FilteredCollection(sorted);
                      var newsListView = new NewsListView({collection:filteredNews});
                      _this.renderRelatedNews(1);

                      _this.renderGallery(1);
                    }
                  }
                });

              }
            });
            
        },
        renderGallery: function(id){
          console.log(id + 'Id just passed');
          if(id){
            $('#detailView .news-internal-content').append('<h2>Galería de Fotos</h2><ul id="gallery" class="slideshow" ></ul>');
          }
          var _this = this;
          var galleries = new Galleries();
          galleries.fetch({
            success: function(e){
              galleries.forEach(function(model){
                var galId = model.get('ID');
                if (id === galId){
                  console.log(id+'<=== ID \n galId ===>'+galId);
                  //AJAX call for the specific folder
                  var url = siteRoot+"/_vti_bin/ListData.svc/Galleries?filter=endswith(Path,'"+model.get('NameOrTitle')+"')";
                  $.ajax({
                     type: "GET",
                     contentType: "application/json; charset=utf-8",
                     processData: false,
                     url: url,
                     dataType: "json",
                     error: function (xhr) {
                         alert(xhr.status + ": " + xhr.statusText);
                     },

                     success: function (e) {

                         e.d.results.forEach(function(m){
                          // Required field contains the path of the gallery
                          var modelPath = '/'+model.get('RequiredField');
                          //Check only for images and that the path is the same as the gallery path
                          if(m.ContentType === 'GalleryContentType' && m.Path === modelPath){
                            // Here we construct the image Url
                            var imageUrl = m.Path + '/' + m.Name;
                            var thumb = m.Name.split('.');
                            thumb = m.Path + '/_t/'+ thumb[0] + '_' + thumb[1]+'.jpg';

                            //Creating the instance of the view passing the imageUrl
                            var galleryItem = new GalleryItemView({
                              imageUrl:imageUrl,
                              thumb: thumb,
                              title: m.Title,
                              description: m.Description,
                              comments: m.Comments
                            });

                          }
                        });
                        if($('#gallery a').size()>4){
                          $('#gallery a').each(function(i) {
                              if( i % 4 == 0 ) {
                                  $(this).nextAll().andSelf().slice(0,4).wrapAll('<li class="slide"></li>');
                              }
                          });
                          $('#gallery').before('<div class="controls"><a href="#" id="nextGal">next</a><a href="#" id="prevGal">prev</a></div>')
                          .cycle({
                              speed:  'fast', 
                              timeout:0,
                              fx:     'scrollHorz', 
                              prev:   '#prevGal', 
                              next:   '#nextGal',
                          });
                        }

                     }
                 });

                }
              });
              
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