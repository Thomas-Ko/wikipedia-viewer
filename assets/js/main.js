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
                controller.setSearchResults(response);
            },
        });
    },

    setSearchResults: function(data){
        for (i=0; i<10; i++){
            var arr=[];
            for (x=1; x<data.length; x++){
                arr.push(data[x][i]);
            }

            // model.results.push(newArr);
            var newObj = new model.ResultObject(arr[0],arr[1],arr[2]);
            model.results.push(newObj);

        }
    },


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
    },



};


/*=========================
    INITIALIZE
=========================*/
controller.init();


