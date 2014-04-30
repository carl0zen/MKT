// This initializes the ViewOptions object
Backbone.ViewOptions.add( Backbone.View.prototype );

var spItem = Backbone.SP.Item.extend({});
  
var AboutLF = Backbone.SP.List.extend({
  model:spItem, 
  site: siteRoot, 
  list: 'AboutLuisFerezin', 
  view: ''
});
 

var AboutLFView = Backbone.View.extend({
  el: $('#aboutLF'),
  initialize: function(){
    this.render();
  },
  render: function(){
    var template =  _.template($('#aboutLFTemplate').html(),{
      header: this.model.get('header'),
      subheader: this.model.get('subheader'),
      quote: this.model.get('quote'),
      content: this.model.get('content'),
    });
    this.$el.html(template);
    $('#footerquote').html(this.model.get('footerquote'));
    return this;
  }
});



var OpinionList = Backbone.SP.List.extend({
  model:spItem,
  site:siteRoot, 
  list: 'OpinionLuisFerezin'
});

var OpinionSlideView = Backbone.View.extend({
  el: $('#miopinion .iosSlider .slider'),
  initialize: function(){
    this.render();
  },
  render:function(){
    var template = _.template($('#opinionSlideTemplate').html(),{
      title: this.model.get('Title'),
      date: moment(this.model.get('date')).format('MMMM DD, YYYY'),
      author: this.model.get('author0'),
      content: this.model.get('content'),
      linkUrl: this.model.get('linkUrl')
    });
    this.$el.append(template);
  }
});

var NumbersList = Backbone.SP.List.extend({
  model:spItem,
  site: siteRoot, 
  list: 'NumerosLuisFerezin'
});

var NumberItemView = Backbone.View.extend({
  el: $('#accentureennumeros .graphs'),
  initialize: function(){
    this.render();
  },
  render: function(){
    var val = this.model.get('value');

    var template = _.template($('#numbersTemplate').html(),{
      type: this.model.get('graphType'),
      value: Math.ceil(val),
      title: this.model.get('Title'),
      extract: this.model.get('extract')
    });
    this.$el.append(template);
  }

});

var TimelineList = Backbone.SP.List.extend({
  model: spItem,
  site:siteRoot, 
  list: 'TimelineLuisFerezin'
});

var TimelineItemView = Backbone.View.extend({
  options: ["y"],
  el: $('#issues'),
  initialize: function(options){
    this.setOptions(options);
    this.render();
  },
  render: function(){
    var template = _.template($('#timelineIssueTemplate').html(),{
      month: this.model.get('month'),
      year: Math.ceil(this.model.get('year')),
      extract: this.model.get('extract')
    });
    this.$el.find('#'+this.y).append(template);
  }
});

// Creating instance og Luis Ferezin About me section
var aboutLF = new AboutLF();
aboutLF.fetch({
  success: function(){
    var aboutLFView = new AboutLFView({model:aboutLF.first()});
  }
});
// Create and fetch opinions
var opinions = new OpinionList();
opinions.fetch({
  success: function(){
    opinions.forEach(function(model){
      var slide = new OpinionSlideView({model:model});
    });
    $('.iosSlider').iosSlider({
      desktopClickDrag: true,
      snapToChildren: true,
      infiniteSlider: null,
      snapSlideCenter: true,
      navSlideSelector: '.sliderContainer .slideSelectors .item',
      navPrevSelector: $('.prevButton'),
      navNextSelector: $('.nextButton') ,
      onSlideComplete: slideComplete,
      onSliderLoaded: sliderLoaded,
      onSlideChange: slideChange
    });
    
  }
});

//Creating and fetching accenture en numeros
var numbers = new NumbersList();
numbers.fetch({
  success:function(){
    numbers.forEach(function(model){
      var graph = new NumberItemView({model:model});
    });
    var $chart = $('.chart');
    $chart.easyPieChart({
      onStep: function(from, to, percent) {
        $(this.el).find('.percent').text(Math.round(percent));
      }
    });
    var chart = window.chart = $chart.data('easyPieChart');
    chart.update($chart.data('percent'));
    $('.js_update').on('click', function() {
      chart.update(Math.random()*200-100);
    });

  }
});

// Creating and fetching timeline

var timeline = new TimelineList();

function between(x, min, max) {
  return x >= min && x <= max;
}
timeline.fetch({
  success: function(){
      var sorted = new SortedCollection(timeline);
      sorted.setSort('year','desc');
      sorted.forEach(function(model){
          var year = Math.ceil(model.get('year'));
          console.log(year);
          var bottomYear = 0;
          if (between(year,1980,1990)){
            bottomYear = 1980;
          }
          if (between(year,1990,2000)){
            bottomYear = 1990;
          }
          if (between(year,2000,2010)){
            bottomYear = 2000;
          }
          if (between(year,2010,2020)){
            bottomYear = 2010;
          }
          console.log(bottomYear);
          new TimelineItemView({model:model, y:bottomYear});
      });

  }
});
function slideChange(args) {
      
  $('.sliderContainer .slideSelectors .item').removeClass('selected');
  $('.sliderContainer .slideSelectors .item:eq(' + (args.currentSlideNumber - 1) + ')').addClass('selected');

}

function slideComplete(args) {
  
  if(!args.slideChanged) return false;
    
  $(args.sliderObject).find('.text1, .text2').attr('style', '');
  
  $(args.currentSlideObject).find('.text1').animate({
    left: '30px',
    opacity: '0.8'
  }, 700, 'easeOutQuint');
  
  $(args.currentSlideObject).find('.text2').delay(200).animate({
    left: '30px',
    opacity: '0.8'
  }, 600, 'easeOutQuint');
  
}

function sliderLoaded(args) {
    
  $(args.sliderObject).find('.text1, .text2').attr('style', '');
  
  $(args.currentSlideObject).find('.text1').animate({
    left: '30px',
    opacity: '0.8'
  }, 700, 'easeOutQuint');
  
  $(args.currentSlideObject).find('.text2').delay(200).animate({
    left: '30px',
    opacity: '0.8'
  }, 600, 'easeOutQuint');
  
  slideChange(args);
  
}
$(document).ready(function() {	
    
      
      
      });
      
      
           if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
      if (typeof this !== "function") {
        // closest thing possible to the ECMAScript 5 internal IsCallable function
        throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
      }

      var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP = function () {},
        fBound = function () {
          return fToBind.apply(this instanceof fNOP && oThis ? this : oThis,
        aArgs.concat(Array.prototype.slice.call(arguments)));
      };

      fNOP.prototype = this.prototype;
      fBound.prototype = new fNOP();

      return fBound;
    };
  }

   $("#send").click(function(){
    window.location.href = 'mailto:l.mendoza.alejandro@accenture.com&subject=Contacto Leadership Corner&body=Nombre:' + $("#Nombre").val() + '%0D%0A%0D%0AMensaje:' + $("#Mensaje").val() + '%0D%0AEnviado desde Accenture Mexico';
    return false;
  });

    $(function(){
      $().timelinr({
        arrowKeys: 'true'
      });
      //QUick fix, please remove
      setTimeout(function(e){
        $('#timeline ul').removeClass('p2-UL');
      },2000);
    });

    
    function scrollTo(div){
        div = $(div);
        $('html,body').animate({scrollTop: div.offset

().top},'slow');
    }
    $('.nav li a').click(function(e){
      var divId = $(this).attr('href');
      console.log(divId);
      scrollTo(divId);
      return false;
    });

    $(window).scroll(function() {    
    var scroll = $(window).scrollTop();


    if (scroll >= 20 && !$('.header').hasClass('animated')) {
        $('.nav .glyphicon').slideUp(100);
          $('.logo img').animate({
              width: '100px'
          },300);
          $('.nav-brand h1').animate({
              'line-height': '45px', 
              'font-size': '24px'
          });
          $('.navbar-nav').animate({
            'line-height': '30px',
            'margin-top': '13px'
          });
          $('.header').css({position:'fixed'});
          $('.header').animate({
            height: '80px',
            padding: 0,
            position: 'fixed',
            top: 0,
            width: '100%'

          });
          $('.header').addClass('animated');
        
    }
    else {
      if (!$('.header').hasClass('animated')){

          $('.nav .glyphicon').slideDown(100);
          $('.logo img').animate({
              width: '147px'
          },300);
          $('.nav-brand h1').animate({
              'line-height': '64px', 
              'font-size': '30px'
          });
          $('.navbar-nav').animate({
            'line-height': '30px',
            'margin-top': 0
          });
          $('.header').animate({
            height: 'auto',
            padding: 0,

          });
          $('.header').removeClass('animated');
      }
        
    }
}); 