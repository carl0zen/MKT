 // configuration for underscores template syntax

 $(document).ready(function(e){

  _.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
  };

  var Slide = Backbone.SP.Item.extend({});
  
  var Slides = Backbone.SP.List.extend({
    model:Slide, 
    site: '/publishing/Mexico/MKTDev/', 
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
      var template =  _.template($('#slideTemplate').html(),{
        caption: this.model.attributes.caption, 
        title: this.model.attributes.Title,
        imageUrl: this.model.attributes.imageUrl,
        linkUrl: this.model.attributes.linkUrl
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
      //console.log(this.collection);
      this.collection.forEach(function(collection){
        //console.log(collection.attributes);
        var slideView = new SlideView({model:collection});

        this.$el.append(slideView.el);

        //console.log(slideView.render().el);
      }, this);
      $.getScript("https://sites.accenture.com/publishing/Mexico/MKTDev/assets/js/vendor/cycle.js");
    }

  });
  slides = new Slides;
  slides.fetch({
    success: function(e){
      var slidesView = new SlidesView({collection:slides});
    }
  });

   
  

  
 });



/**
(function() {
  
  
  var Slide = Backbone.SP.Item.extend({});
  
  var Slides = Backbone.SP.List.extend({
    model:Slide, 
    site: '/publishing/Mexico/MKTDev/', 
    list: 'Slider', 
    view: ''
  });
  
  var SlideView = Backbone.View.extend({

    render: function(){
        // This is method that can be called
        // once an object is init. You could 
        // also do this in the initialize event
        var source = $('.sliderTemplate').html();
        var template = Handlebars.compile(source);
        var html = template(this.collection.toJSON());
        
        this.$el.html(html);
    },
    initialize: function(){
        this.collection.on('add', this.render, this)
      }
  });
  
  var slides = new Slides;

  var slideView = new SlideView({collection: slides});

  
  slides.fetch({
    success: function(){
      console.log(slides.toJSON());
      
    }
  });
  
  $(document).ready(function(e){
     slideView.el = $('.sliderContainer');
     slideView.render();


  });
  
  

  
  
  
})();

  Backbone Code
 

// configuration for underscores template syntax
  _.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
  };

  var Slide = Backbone.SP.Item.extend({});
  
  var Slides = Backbone.SP.List.extend({
    model:Slide, 
    site: '/publishing/Mexico/MKTDev/', 
    list: 'Slider', 
    view: ''
  });
 
  
  var SlideView = Backbone.View.extend({
    tagName: 'li',
    template: _.template($('#slideTemplate').html()),
    render: function(){
      this.$el.html( this.template(this.model.toJSON()));
      return this;

    }
  });

  var SlidesView = Backbone.View.extend({
    tagName:'ul',
    render:function(){
      //console.log(this.collection);
      this.collection.each(function(model){
        var slideView = new SlideView({model:model});
        this.$el.append(slideView.el);
        console.log(slideView.render().el);
      }, this);
    }

  });
  slides = new Slides;
  slides.fetch();
  console.log('Rendering slides fetch');
  console.log(slides);
  var n = 1;
  slides.each(function(e){console.log(n++);});
    
  slidesView = new SlidesView({collection:slides});
  $('#SWPContent1').append(slidesView.render().el);
/**


jQuery CODE

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

	