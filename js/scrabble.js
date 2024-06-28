/*
File: Scrabble.js
GUI Assignment: #5, Create a Scrabble website
Garrett Bacon, UMass Lowell Computer Science, Garrett_Bacon@student.uml.edu
Desc: This is the javascript file to add scrabble functionality to my website
*/
//Starts the jquery when the body is loaded
var position = [];
$(document).ready(function(){
    var lastDrop = 0;
    var revertB = false;
    //will be used to store and then sum up word scores
    var score = 0;
    //will be used for the word itself
    var word = '';
    //Used to store ID of letters on rack
    var letterID = []
    //check to see if first box is filled
    var valid = false;

    //create an array of letter ID's
    letterID = initializeBoard(letterID);
    console.log('here');
    //https://stackoverflow.com/questions/15193640/jquery-ui-draggable-reset-to-original-position
    //Using that link to make my tiles revertable
    //Make our letter tiles draggable
    $('.rackTile').draggable({
        revert: 'invalid',
        cursor: 'move'

    });
    //Define our droppable zones for the tiles
    $('.word').droppable({
        //ensure box only accepts letter tiles
        accept:'.rackTile',
        drop: function(event,ui){
            //Get the word ID
            var wordID = $(this).attr('id');
            wordID = wordID.toString();
            wordNum = parseInt(wordID.substr(4));
            //Make sure the first tile gets dropped on the left

            if(!valid && wordNum != 1){
                var tileID = ui.draggable.attr('id');
                //convert ID to a string to parse
                tileID = tileID.toString();
                //convert the number string to num
                tileNum = parseInt(tileID.substr(4));
                revert(tileNum);
             }
            else{
                if(wordNum == 1){
                    valid = true;
                    ui.draggable.css({
                        top: '-270px'
                    });
                }
                if(wordNum != lastDrop+1){
                    var tileID = ui.draggable.attr('id');
                    //convert ID to a string to parse
                    tileID = tileID.toString();
                    //convert the number string to num
                    tileNum = parseInt(tileID.substr(4));
                    revert(tileNum);
                }
                else{
                    //get the id of the tile div
                    var tileID = ui.draggable.attr('id');
                    //convert ID to a string to parse
                    tileID = tileID.toString();
                    //convert the number string to num
                    tileNum = parseInt(tileID.substr(4));
                    var letter = letterArray[letterID[tileNum-1]]
                    console.log(letter);
                    word += letter;
                    //double the letter score for the bonus box
                    if(wordNum == 7){
                        score += (2 * ScrabbleTiles[letter].value);
                    }else{
                        score += ScrabbleTiles[letter].value;
                    }
                    //double the score if we hit the double word box
                    if(wordNum == 3){
                        score *= 2;
                    }
                    $('#userWord').text(word);
                    //Clear the current score and update it with the new value
                    $('#score').text('');
                    $('#score').text(score);
                    lastDrop++;
                }
            }
           
        }
        //add behavior for when a tile is dropped
    });
    //if the redeal button is clicked
    $('#reset').click(function(event){
        lastDrop = 0;
        letterID = initializeBoard(letterID);
        score = 0;
        word = '';
        valid = false;
        // not my most efficient solution but the for loop kept breaking
        // resets the tile locations
        revert(9);
        $('#userWord').text(word);
        //Clear the current score and update it with the new value
        $('#score').text('');
        $('#score').text(score);
    });
    $('#deal').click(function(event){
        lastDrop = 0;
        letterID = initializeBoard(letterID);
        //clear the word
        word = '';
        $('#userWord').text(word);
        valid = false; 
        revert(9);
    });


});

function initializeBoard(letterID){
    //get 7 random letter ID's
    for(var i = 0; i < 7; i++){
        letterID[i] = randNum();
    }
    for(var i = 0; i<7;i++){
        if(letterID[i] == 26){
            //if we have the blank character special case
            $(`#tile${i+1}`).html(`<img src="graphics_data/Scrabble_Tiles/Scrabble_Tile_Blank.jpg">`);
        }else{
            //uses the letter to get the graphics data
            $(`#tile${i+1}`).html(`<img src="graphics_data/Scrabble_Tiles/Scrabble_Tile_${letterArray[letterID[i]]}.jpg">`);
        }
    }
    console.log(letterID);
    return letterID;
}

function randNum(){
    return Math.floor(Math.random() * 27) //generates and returns our int
}
//Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

//return a specific tile back to its original spot or return them all
function revert(idNum){
    if(idNum == 1){
        $(`#tile1`).animate({
            top: '50px',
            left: '30px'
        });
    }
    else if(idNum == 2){
        $(`#tile2`).animate({
            top: '50px',
            left: '115px'
        });
    }
    else if(idNum == 3){
        $(`#tile3`).animate({
            top: '50px',
            left: '200px'
        });
    }
    else if(idNum == 4){
        $(`#tile4`).animate({
            top: '50px',
            left: '285px'
        });
    }
    else if(idNum == 5){
        $(`#tile5`).animate({
            top: '50px',
            left: '370px'
        });
    }
    else if(idNum == 6){
        $(`#tile6`).animate({
            top: '50px',
            left: '455px'
        });
    }
    else if(idNum == 7){
        $(`#tile7`).animate({
            top: '50px',
            left: '540px'
        });
    } else{
        $(`#tile1`).animate({
            top: '50px',
            left: '30px'
        });
        $(`#tile2`).animate({
            top: '50px',
            left: '115px'
        });
        $(`#tile3`).animate({
            top: '50px',
            left: '200px'
        });
        $(`#tile4`).animate({
            top: '50px',
            left: '285px'
        });
        $(`#tile5`).animate({
            top: '50px',
            left: '370px'
        });
        $(`#tile6`).animate({
            top: '50px',
            left: '455px'
        });
        $(`#tile7`).animate({
            top: '50px',
            left: '540px'
        });
    }
}
