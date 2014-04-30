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
/** Access me Banner **/

  var AccessMeBannerItem = Backbone.SP.Item.extend({});
  
  var AccessMeBannerItems = Backbone.SP.List.extend({
    model:LFBannerItem, 
    site: siteRoot, 
    list: 'AccessMeBanner', 
    view: ''
  });
 
  
  var AccessMeBannerItemView = Backbone.View.extend({
    tagName: 'div',
    initialize: function(){
      this.render();
    },
    render: function(){
      var linkUrl = this.model.get('linkUrl');
      var imageUrl = this.model.get('imageUrl');

      var template =  _.template($('#AccessMeBannerTemplate').html(),{
        title: this.model.get('Title'),
        linkUrl: linkUrl.split(',')[0],
        imageUrl: imageUrl.split(',')[0]
      });
      this.$el.html(template);
      return this;

    }
  });


  var AccessMeBannerItemsView = Backbone.View.extend({
    //tagName:'ul',
    initialize: function(){
      this.render();
    },
    render:function(){

      this.collection.forEach(function(model){

        var accessMeBannerView = new AccessMeBannerItemView({model:model});
        $('#AccessMeBanner').html(accessMeBannerView.el);

      }, this);
    }

  });