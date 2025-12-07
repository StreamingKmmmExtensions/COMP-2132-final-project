const MAX_TRIES = 6;

let tries = 0;


const $gameArea = $("#game-area");


$gameArea.html(generateGameArea());





function generateGameArea()
{
    let html = "";
    let words = fetch("Data/words.json");
    //let word = new Word(words[Math.floor(Math.random() * words.length)]);
    let word = new Word("Blah");


    // TODO: Make stick figure images
    /*html += `<img id="hangman-img" src="Images/stick-figure-01.webp" alt="">`;*/
    html += word.getInputBox();


    return html;
}