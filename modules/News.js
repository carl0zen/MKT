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