$(function() {

    $( "#draggable" ).css({
        left: $.cookie('position.left')+'px' || 0,
        top: $.cookie('position.top')+'px' || 0
    })
    $( "#draggable" ).draggable({
    	start: function(e){
            //console.log('start '+this);
    	},
    	drag: function(){
    		//console.log('drag '+this);
    	},
    	stop: function(){
    		var position = $(this).position();
    		$.cookie("position.left", position.left);
            $.cookie("position.top", position.top);
    	}
    });


    ///RESIZABLE !!!!!!!!!!!!!!!!!!!!!!!!!!

    $( "#resizable" ).resizable({
      animate: true
    });

    //SORTABLE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    $( "#sortable" ).sortable();
    $( "#sortable" ).disableSelection();


    // AUTOCOMPLETE !!!!!!!!!!!!!!!!!!!!!

    var availableTags = [
      "ActionScript",
      "AppleScript",
      "Asp",
      "BASIC",
      "C",
      "C++",
      "Clojure",
      "COBOL",
      "ColdFusion",
      "Erlang",
      "Fortran",
      "Groovy",
      "Haskell",
      "Java",
      "JavaScript",
      "Lisp",
      "Perl",
      "PHP",
      "Python",
      "Ruby",
      "Scala",
      "Scheme"
    ];
    $( "#tags" ).autocomplete({
      source: availableTags
    });

    //DATEPICKER !!!!!!!!!!!!!!!!!!!!

    $( "#datepicker" ).datepicker();


    //POPIN MODAL  !!!!!!!!!!!!!!!!!!!!

    $( "#dialog" ).dialog({
        autoOpen: false,
        show: {
            effect: "show",
            duration: 1000
        },
        hide: {
            effect: "easeOut",
            duration: 1000
        }
    });
 
    $( "#opener" ).click(function() {
      $( "#dialog" ).dialog( "open" );
    });


    //PHOTO MANAGER

    // there's the gallery and the trash
    var $gallery = $( "#gallery" ),
      $trash = $( "#trash" );

    // let the gallery items be draggable
    $( "li", $gallery ).draggable({
      cancel: "a.ui-icon", // clicking an icon won't initiate dragging
      revert: "invalid", // when not dropped, the item will revert back to its initial position
      containment: "document",
      helper: "clone",
      cursor: "move"
    });

    // let the trash be droppable, accepting the gallery items
    $trash.droppable({
      accept: "#gallery > li",
      activeClass: "ui-state-highlight",
      drop: function( event, ui ) {
        deleteImage( ui.draggable );
      }
    });

    // let the gallery be droppable as well, accepting items from the trash
    $gallery.droppable({
      accept: "#trash li",
      activeClass: "custom-state-active",
      drop: function( event, ui ) {
        recycleImage( ui.draggable );
      }
    });

    // image deletion function
    function deleteImage( $item ) {
      $item.fadeOut(function() {
        var $list = $( "ul", $trash ).length ?
          $( "ul", $trash ) :
          $( "<ul class='gallery ui-helper-reset'/>" ).appendTo( $trash );
 
        $item.find( "a.ui-icon-trash" ).remove();
        $item.appendTo( $list ).fadeIn(function() {
          $item
            .animate({ width: "48px" })
            .find( "img" )
              .animate({ height: "36px" });
        });
      });
    }

    // image recycle function
    function recycleImage( $item ) {
      $item.fadeOut(function() {
        $item
          .find( "a.ui-icon-refresh" )
            .remove()
          .end()
          .css( "width", "96px")
          .find( "img" )
            .css( "height", "72px" )
          .end()
          .appendTo( $gallery )
          .fadeIn();
      });
    }

  });