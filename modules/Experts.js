 
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