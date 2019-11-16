
// APIKEY 
// 3b7720b960e90357d6bc883a5a765ab3

// application ID
// 0694a5e8

// example req
// https://api.edamam.com/search?q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}
// &from=0&to=3&calories=591-722&health=alcohol-free

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
    
            var title = resp.hits[0].recipe.label
            var imgUrl = resp.hits[0].recipe.image
            var dietLabel = resp.hits[0].recipe.dietLabels[0]
            var incredientLines = resp.hits[0].recipe.ingredientLines
            var recipeUrl = resp.hits[0].recipe.url
    
            console.log("title: " + title);
            console.log("image url: " + imgUrl);
            console.log("diet label: " + dietLabel);
            console.log("recipe url: " + incredientLines);
    
            $(".card-title").html(title)
            $(".card-img-top").attr("src", imgUrl)
            $(".card-subtitle").html(dietLabel)
    
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
        }
    });
});
