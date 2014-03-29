var anzahl_karten = 10;
var anzeige_deutsch = 0;
var animation_ended = true;

$(document).ready( function() {
    
    $(document).on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
        function(e) {
            animation_ended = true;
        }
    );
    
});

$( document ).on( "pageshow", "#training", function( event ) {

    $("#neue_auswahl").hide();
    anzeige_deutsch = 0;
    
    
    $('.card').on('swiperight', function(evt, touch) {

        $(this).addClass('verschwinden');

        index = $(this).index();
        $(this).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
        function(e) {

            // code to execute after transition ends
            animation_ended = true;
            nextCard(index);


        });


    });

    $('.card').on("tap",function(evt){

        if (animation_ended == false) {

            return;

        }

        if (anzeige_deutsch == 0) {

            $(this).find("div.original").hide();

        } else {

            $(this).find("div.deutsch").hide();

        }

        animation_ended = false;

        $(this).addClass('flipper');
        $(this).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
        function(e) {

            // code to execute after transition ends

            if ( anzeige_deutsch == 0 ) {

                $(this).find("div.deutsch").show();
                anzeige_deutsch = 1;

            } else {

                $(this).find("div.original").show();
                anzeige_deutsch = 0;

            }
            $(this).removeClass('flipper');
            animation_ended = true;

        });

    });

    $("#card_" + anzahl_karten).addClass('first_card');


});

function nextCard(index) {

    if ( index < 1 ) {
        $("#neue_auswahl").fadeIn();
        return;
    } 

    anzeige_deutsch = 0;
    $("#card_" + (index + 1)).hide();
    $("#card_" + index).addClass('first_card');


}

