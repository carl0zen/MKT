
  var TopNavItem = Backbone.SP.Item.extend({});
  
  var TopNavItems = Backbone.SP.List.extend({
    model:TopNavItem, 
    site: siteRoot, 
    list: 'TopNavigation', 
    view: ''
  });
 
  
  var TopNavItemView = Backbone.View.extend({
    tagName: 'li',
    initialize: function(){
      this.render();
    },
    render: function(){
      var linkUrl = this.model.get('linkUrl');
      var template =  _.template($('#topNavItemTemplate').html(),{
        title: this.model.get('Title'),
        linkUrl: linkUrl.split(',')[0]
      });
      this.$el.html(template);
      return this;

    }
  });


  var TopNavItemsView = Backbone.View.extend({
    //tagName:'ul',
    initialize: function(){
      this.render();
    },
    render:function(){

      this.collection.forEach(function(model){

        var topNavView = new TopNavItemView({model:model});
        $('#topNav').append(topNavView.el);

      }, this);
    }

  });