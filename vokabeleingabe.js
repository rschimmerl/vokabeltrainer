$( document ).on( "pageshow", "#eingabe", function( event ) {

   //localStorage.clear();
   
    $("#sbm_eingabe").click( function() {

        saveItem();
        return false;

    });
    
   refreshAnzeige();

});

//Speichern eines neuen Vokabels:
function saveItem () {

    original = $("#original").val();
    deutsch = $("#deutsch").val();

    if (original.trim() == '' || deutsch.trim() =='') return;

    if(typeof(Storage)!=="undefined") {

        localStorage.setItem(original, deutsch);

        $("#original").val("");
        $("#deutsch").val("");
        refreshAnzeige();
    }

}


function refreshAnzeige() {
   //Anzeige der schon eingegeben Vokabel:
   if(typeof(Storage)!=="undefined") {

        var items = [];
        $.each( localStorage, function( key, val ) {

            items.push( '<li>' + key + " : " + val + "</li>" );

        });
        $("#anzeige").html(items);

   }
   
}

function VokabelLeeren() {
   
   if(typeof(Storage)!=="undefined") {
      localStorage.clear(); 
      refreshAnzeige();
   }
}