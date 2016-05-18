/*=========================
    MODEL
=========================*/
var model = {
    
   /*  results will be filled in by the controller.setSearchResults function when it is invoked by a successful API call.
    It will contain 10 objects, each with properties title, info, and link.*/
    results : [],


    //this object constructor will be used in the controller.setSearchResults function
    ResultObject : function (title, info, link) {
        this.title = title;
        this.info = info;
        this.link = link;
    }





        

    
};

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

        }
    },

    getSearchResults: function(){
        return model.results;
    }
};

       

/*=========================
    VIEW
=========================*/
view = {

    init : function(){
        view.buttonClick();
        view.renderSearchResults();
    },

    buttonClick: function(){
        $("button").on("click",function(){
            //removes any previous results from display
            document.getElementById("results").innerHTML = "";

            //takes value of input box
            inputText = $("input").val();

            //calls wiki API with value from above
            controller.getWikiInfo(inputText);
        });
    },

    renderSearchResults: function(){
        $( document ).ajaxStop(function() {
            var data= controller.getSearchResults();
            console.log(data);

            for (i=0; i<data.length; i++){
                var title=data[i].title;
                var info = data[i].info;
                var link =data[i].link;

                // console.log(link);

                $("#results").append('<a href="' + link +'" target="_blank"><div class="resultDiv col-xs-12"> <h2>'+title+"</h2>" + "<p>" +info +"</p>" + '</p></div></a>');
            }
        });
    }

};


/*=========================
    INITIALIZE
=========================*/
controller.init();


//to do
//if undefined, don't append the div; for example, searching "boston celtics" returns 9 good results, 1 undefined result