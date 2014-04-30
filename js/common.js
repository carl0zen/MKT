
$(document).ready(function(e){
	
	$('body').fadeIn(300).css('background','none');
	$('#overlay').click(function(e){
	  $('.videoModal, #overlay').fadeOut(300);
	});
	

});


// Creating navigation
topNavItems = new TopNavItems();

//Fetching the content from the Sharepoint List
topNavItems.fetch({
  success: function(e){
    var topNavItemsView = new TopNavItemsView({collection:topNavItems});
  }
});