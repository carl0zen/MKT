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
    options: ["id", "news"],
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
      var newObj = this.news._byId[this.id].attributes;
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
      options: ["id", "news"],
      initialize: function(options){
        
        this.setOptions(options);
        this.render();
      },
      render:function(){
      
        var id = this.id;

        var newObj = this.news._byId[id].attributes;

         
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
            var relatedItem = new RelatedNewItemView({id:id,news:this.news});
            $('#Related').append(relatedItem.el);
          }
        });

      }

  });