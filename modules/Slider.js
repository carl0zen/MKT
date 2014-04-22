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
