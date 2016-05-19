/*=========================
    MODEL
=========================*/

var model = {
    //this will be replaced with the search term from the input box
    searchTerm : null,
   /*  results will be filled in by the controller.setSearchResults function when it is invoked by a successful API call.
    It will contain 10 objects, each with properties title, info, and link.*/
    results : [],

    //this object constructor is used in the controller.setSearchResults function
    ResultObject : function (title, info, link) {
        this.title = title;
        this.info = info;
        this.link = link;
    }
    
};  //end model


/*=========================
    CONTROLLER
=========================*/

controller = {
    init: function(){
        view.init();
    },
    getWikiInfo : function(searchStr){
        
        $.ajax({
         
            // The URL for the request
            url: "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + searchStr,
         
            // Whether this is a POST or GET request
            type: "GET",

            // The type of data we expect back
            dataType : "jsonp",

            success: function( response ) {
                console.log(response);
                controller.setSearchResults(response);
            },
        });
    },

    setSearchResults: function(data){

        model.results=[];
        for (i=0; i<10; i++){
            var arr=[];
            for (x=1; x<data.length; x++){
                arr.push(data[x][i]);
            }

            var newObj = new model.ResultObject(arr[0],arr[1],arr[2]);
            model.results.push(newObj);
            model.searchTerm=data[0];
        }
    },

    getSearchResults: function(){
        return model.results;
    },
    getSearchTerm: function(){
        return model.searchTerm;
    }
}; //end controller
       

/*=========================
    VIEW
=========================*/
view = {

    init : function(){
        view.searchButtonClick();
        view.pressEnter();
        view.renderSearchResults();
    },

    searchButtonClick: function(){
        $("#searchButton").on("click",view.search);
    },

    pressEnter: function(){
        $(document).keypress(function(e) {
        
        //if the input is in focus and the button pressed is enter
        if ($("input").is( ":focus" ) && e.which == 13) {
                view.search();
            }
        });

    },

    search: function(){
        
        //removes any previous results from display
        document.getElementById("results").innerHTML = "";

        //takes value of input box
        inputText = $("input").val();

        //calls wiki API with value from above
        controller.getWikiInfo(inputText);

        //erases input value
        $("input").val("");
    },

    renderSearchResults: function(){
        $( document ).ajaxStop(function() {
            var data= controller.getSearchResults();
            var searchTerm = controller.getSearchTerm();
            console.log(data);

            //if first result is undefined (meaning everything else is also undefined)
            if(data[0].title===undefined){
                //tell user that no results found for their search term
                $("#results").append("<h2>No results found</h2><p>Try again or <a class='link' href='https://en.wikipedia.org/wiki/Special:Random' target='_blank'>click here for a random article</a>.</p>").hide().fadeIn(200);
            } else {
                //
                $('#results').append('<h2>Search Results for:<span class="search-term"> ' + searchTerm + '</span></h2>');
            }

            //loops through an array of results
            for (i=0; i<data.length; i++){
                var title=data[i].title;
                var info = data[i].info;
                var link =data[i].link;
                
                //display result if there is information for result
                if (title!==undefined){
                    $("#results").append('<a href="' + link +'" target="_blank"><div class="resultDiv col-xs-12"> <h3>'+title+"</h3>" + "<p>" +info +"</p>" + '</p></div></a>').hide().fadeIn(200);
                }         
            }
        });
    }

}; //end view


/*=========================
    INITIALIZE
=========================*/
controller.init();
