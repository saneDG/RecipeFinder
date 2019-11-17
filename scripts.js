$('.food-search').keypress(function (e) {
    var key = e.which;
    if(key == 13)  // the enter key code
     {
       $('.reload').click();
       return false;  
     }
   }); 

$(".hide").hide()

$(".reload").click(function(e){
    e.preventDefault();

    var foodsearch = $(".food-search").val()
    var rnd = Math.floor((Math.random() * 50) + 1);
    var url = "https://api.edamam.com/search?q=" + foodsearch + "&app_id=0694a5e8&app_key=3b7720b960e90357d6bc883a5a765ab3&from=" + rnd + "&to=" + (rnd + 1)

    console.log(foodsearch)

    $.ajax({
        url: url,
        dataType: 'json',
        success: function (resp) {

            $( ".list-group-item" ).remove();
            $(".card-subtitle").show();
            $(".recipe-link").show();

            try {
                var title = resp.hits[0].recipe.label
                var imgUrl = resp.hits[0].recipe.image
                var dietLabel = resp.hits[0].recipe.dietLabels[0]
                var incredientLines = resp.hits[0].recipe.ingredientLines
                var recipeUrl = resp.hits[0].recipe.url
            } catch (error) {
                $(".card-subtitle").hide();
                $(".recipe-link").hide();
                $(".card-title").html('Something went wrong. Try different keyword');
                $(".card-img-top").attr("src", "error.svg");
            }
    
            console.log("title: " + title);
            console.log("image url: " + imgUrl);
            console.log("diet label: " + dietLabel);
            console.log("recipe url: " + incredientLines);
    
            $(".card-title").html(title)
            $(".card-img-top").attr("src", imgUrl)
            $(".card-subtitle").html(dietLabel)
            $(".recipe-link").html("link to recipe")
    
            function addListItem(index){
                $( ".list-group" ).append("<li class=list-group-item> " + resp.hits[0].recipe.ingredientLines[index] + " </li>");
            }
    
            $.each(resp.hits[0].recipe.ingredientLines, function(index) {
                addListItem(index)
            });
    
            $(".card-text").html(incredientLines)
            $(".btn-recipe-link").attr("href", recipeUrl)
            // No need to create a new jQuery object using $()
            // result = $( end * newend );
            $(".hide").show()
        },
        error: function (req, status, err) {
            console.log('Something went wrong', status, err);
            $(".card-title").html('Something went wrong. Try different keyword');
            $(".card-img-top").attr("src", "error.svg");
        }
    });
});
