var button_colours = [
"red",
"blue",
"green",
"yellow"
];

var  game_pattern = [];

var user_clicked_pattern = [];

var level = 0;

// start the game// 
$(document).on("keydown", function(){
    if(level==0){

$("#level-title").text("Level " + level);

next_sequence();
    };
});

// check user input vs sequence //

function check_answer(current_level){

if (game_pattern[current_level] === user_clicked_pattern[current_level]){

    console.log("success");

    if (user_clicked_pattern.length === game_pattern.length){
        setTimeout(function(){
            next_sequence();
        }, 1000);
    }

}    else {
    console.log("FAIL");

    var audio = new Audio("sounds/wrong.mp3");
    audio.play();  

    $("body").addClass("game-over");

    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    
    $("#level-title").text("Game Over, Press Any Key To Restart");

    level = 0;

    game_pattern = [];

}

    

};




// user button clicks //
$(".btn").click(function(){

    var user_chosen_colour = $(this).attr("id");

    user_clicked_pattern.push(user_chosen_colour);

    play(user_chosen_colour);

    check_answer(user_clicked_pattern.length-1);

});

// sequence generator //
function next_sequence(){

    user_clicked_pattern = [];    

    var random_number = Math.floor(Math.random()*4);

    var random_chosen_colour = button_colours[random_number];

    game_pattern.push(random_chosen_colour);

    level++;

    $("#level-title").text("Level " + level);

    play(random_chosen_colour);

};

// animations and sounds //
function play(name){
    var name_id = "#" + name;

    $(name_id).fadeIn(100).fadeOut(100).fadeIn(100);

var audio = new Audio("sounds/" + name + ".mp3");
audio.play();

    $(name_id).addClass("pressed");

    setTimeout(function(){
        $(name_id).removeClass("pressed");
    },100);
};



