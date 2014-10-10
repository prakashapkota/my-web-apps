document.addEventListener('visibilitychange', function(event) {
  if (!document.hidden) {
    console.log('The page is visible.')
  } else {
    console.log('The page is hidden. ');
  }
});

if (window.navigator && window.navigator.geolocation) {
   console.log('geolocalisation is ok');
} else {
  	console.log('NO geolocalisation');
}

(function($) {     
    /* jQuery.fx.off = true;     //Disable All jQuery Effect Methods
     $('div').slideUp(); // Does not animate, hides immediately */

 })(jQuery);
