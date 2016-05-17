/*=========================
    MODEL
=========================*/


/*=========================
    CONTROLLER
=========================*/

controller = {
    init: function(){
        view.buttonClick();
    },
    getWikiInfo : function(searchStr){
        
        $.ajax({
         
            // The URL for the request
            url: "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + searchStr,
         
            // The data to send (will be converted to a query string)
            data: {
                id: 123
            },
         
            // Whether this is a POST or GET request
            type: "GET",

            // The type of data we expect back
            dataType : "jsonp",

            success: function( response ) {
                console.log(response);
            },
        });
    } 
};

       

/*=========================
    VIEW
=========================*/
view = {
    buttonClick: function(){
        $("button").on("click",function(){
            inputText = $("input").val();
            console.log(inputText);
            controller.getWikiInfo(inputText);
        });
    }
};


/*=========================
    INITIALIZE
=========================*/
controller.init();



