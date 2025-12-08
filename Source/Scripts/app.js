const $gameArea = $("#game-area");


generateGameArea();

$("#play-again-button").on("click", (e) => generateGameArea());






function generateGameArea()
{
    fetch("Data/words.json")
        .then((response) => {
            if (!response.ok)
            {
                throw new Error("Network error");
            }

            return response.json();
        })
        .then((jsonData) => {
            const words = jsonData;
            const randomIndex = Math.floor(Math.random() * words.length);
            const word = new Word(words[randomIndex]["word"], words[randomIndex]["hint"]);

            // TODO: Make stick figure images
            /*html += `<img id="hangman-img" src="Images/stick-figure-01.webp" alt="">`;*/
            $gameArea.html(word.getInputBox());
            word.setupInputEvents();
        })
        .catch(() => $("#hint").html("Could not load JSON due to network error."));
}