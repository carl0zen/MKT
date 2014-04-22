 
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
      console.log('Parameter cat passed: '+cat);
       categoryBanners.forEach(function(model){
          console.log(model.get('category'));
          if(model.get('category') === cat){

            url = model.get('LinkTitle');
            
          }
       });
      console.log(url);
       return url;
      
    },
    render:function(){
      //Get the image from another list
      newObj = news._byId[this.id].attributes;

      var categoryImage = this.getCategoryImage(newObj.category);
      console.log(categoryImage);


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
                       .       .o8                                                            
                      .o8      "888                                                            
 .ooooo.   .oooo.   .o888oo     888oooo.   .oooo.   ooo. .oo.   ooo. .oo.    .ooooo.  oooo d8b 
d88' `"Y8 `P  )88b    888       d88' `88b `P  )88b  `888P"Y88b  `888P"Y88b  d88' `88b `888""8P 
888        .oP"888    888       888   888  .oP"888   888   888   888   888  888ooo888  888     
888   .o8 d8(  888    888 .     888   888 d8(  888   888   888   888   888  888    .o  888     
`Y8bod8P' `Y888""8o   "888"     `Y8bod8P' `Y888""8o o888o o888o o888o o888o `Y8bod8P' d888b  


  **/
  var CategoryBanner = Backbone.SP.Item.extend({});
  var CategoryBanners = Backbone.SP.List.extend({
    model:CategoryBanner,
    site: siteRoot,
    list: 'CategoryBanners'
  });


  /** 

ooooo        oooooooooooo     .o8                                                            
`888'        `888'     `8    "888                                                            
 888          888             888oooo.   .oooo.   ooo. .oo.   ooo. .oo.    .ooooo.  oooo d8b 
 888          888oooo8        d88' `88b `P  )88b  `888P"Y88b  `888P"Y88b  d88' `88b `888""8P 
 888          888    "        888   888  .oP"888   888   888   888   888  888ooo888  888     
 888       o  888             888   888 d8(  888   888   888   888   888  888    .o  888     
o888ooooood8 o888o            `Y8bod8P' `Y888""8o o888o o888o o888o o888o `Y8bod8P' d888b    

   **/
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
        $('#LFBanner').html(lfBannerView.el);

      }, this);
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
            ":id":'renderNewView'
        },
        defaultView: function(){
          $('.content').html('TESTING');
        },
        renderNewView: function(id){

            //Fetch category banner list to display as header
            var _this = this;
            
            
            categoryBanners.fetch({
              success:function(){
                _this.renderLFBanner();
                news = new NewsList();

                //Fetching the content from the Sharepoint List
                news.fetch({
                  success:function(){
                    var detailView = new DetailView({'id':id});
                    //Add breadcrumb
                    var breadcrumb = $('.p2-breadcrumbCurrent');

                    breadcrumb.html('<a href="default.aspx">'+$('.p2-breadcrumbCurrent').html()+'</a>');
                    breadcrumb.nextAll().remove();
                    breadcrumb.after('<span> &gt; </span><span>'+news._byId[id].attributes.LinkTitle+'</span>');
                    //Check if news object exist
                    _this.renderRelatedNews(id);
                    
                  }
                });
              }
            });
            this.renderExpertSlider();
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

          var relatedNewsView = new RelatedNewsView({'id':id});
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