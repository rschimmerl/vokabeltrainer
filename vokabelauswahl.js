$( document ).on( "pageshow", "#auswahl", function( event ) {

    $.ajax({

        url: 'http://193.170.245.138/latein/vokabelauswahl.php',
        data: { action: 'lektionen'},
        dataType: 'jsonp',
        jsonp: 'callback',
        success: function(data){

            var items = [];
            $.each( data, function( key, val ) {

                items.push( "<option value=" + val + ">" + val + "</option>" );

            });

            list = items.join( "" );
            $("#select-native-1").html(list);

        },
        error: function () {

            alert("error");

        }

    });

    $("#sbm_lektionenauswahl").click( function() {

        auswahl_lektion = $("#select-native-1").val();

        $.ajax({

            url: 'http://193.170.245.138/latein/vokabelauswahl.php',
            data: { action: 'auswahl', lektion: auswahl_lektion},
            dataType: 'jsonp',
            jsonp: 'callback',
            success: function(data){

                createCards(data);

            },
            error: function () {

                alert("error");

            }

        });

    });


    $("#sbm_vokabel").click( function() {

        createCardsLocal();
        return false;
    
    });
    
});

function createCards(data) {

    var cnt = 0;
    var items = [];

    $.each( data, function( key, val ) {

        classname = 'card_' + (cnt % 10);
        items.push( '<div id="card_' + (cnt + 1) +'" class="card ' + classname + '">' +
        '<div class="card_cell">' +
        '<div class="original">' + val.Latein + '</div>'+
        '<div class="deutsch">' + val.Deutsch +'</div>' +
        '</div>'+
        '</div>' );

        cnt++;

    });

    anzahl_karten = cnt;
    $("#card_container").html(items);
    $.mobile.changePage( $("#training"), "slide", true, true);

}

function createCardsLocal() {

    var cnt = 0;
    var items = [];

    if(typeof(Storage)!=="undefined") {

        $.each( localStorage, function( key, val ) {

            classname = 'card_' + (cnt % 10);
            items.push( '<div id="card_' + (cnt + 1) +'" class="card ' + classname + '">' +
            '<div class="card_cell">' +
            '<div class="original">' + key + '</div>'+
            '<div class="deutsch">' + val +'</div>' +
            '</div>'+
            '</div>' );
            cnt++;

        });

    }

    anzahl_karten = cnt;
    $("#card_container").html(items);
    $.mobile.changePage( $("#training"), "slide", true, true);

}