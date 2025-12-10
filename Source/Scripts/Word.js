const MAX_TRIES = 6;
const LETTER_NOT_FOUND = -1;

class Word
{
    #word;
    #uuids; // UUIDs of the <input>s for entering letters
    #tries;
    #maxTries;





    constructor(name, hint)
    {
        this.#word = name;
        this.#uuids = Array(name.length);
        this.#tries = 0;

        $("#hint").html(`Hint: ${hint}`);

        if (this.#word.length < MAX_TRIES)
        {
            this.#maxTries = this.#word.length;
        }
        else
        {
            this.#maxTries = MAX_TRIES;
        }
    }





    #fadeAnimation()
    {

    }





    getAnswer()
    {
        let answer = "";


        for (let i = 0;
             i < this.#word.length;
             i++)
        {
            answer += $(`#${this.#uuids[i]}`).val();
        }


        return answer;
    }





    /**
     * Get the index of the first occurrence of <code>letter</code> in <code>#name</code> for which the corresponding <input> is empty.
     * @param letter
     * @return Index of <code>letter</code> or <code>LETTER_NOT_FOUND</code> if either the word does not contain <code>letter</code> or there are no remaining empty inputs that should have <code>letter</code>.
     */
    #getIndexOfLetter(letter)
    {
        if (!arrayContains(this.#word, letter))
        {
            return LETTER_NOT_FOUND;
        }


        for (let i = 0;
             i < this.#word.length;
             i++)
        {
            if (this.#word[i].toLowerCase() === letter.toLowerCase() &&
                $(`#${this.#uuids[i]}`).val() === "")
            {
                return i;
            }
        }


        return LETTER_NOT_FOUND;
    }





    getInputBox()
    {
        let html = "<img id=\"hangman-img\" src=\"Images/00.png\" alt=\"hang-man-img\"><div id=\"input-div\">";


        // Add Elements
        for (let i = 0;
             i < this.#word.length;
             i++)
        {
            this.#uuids[i] = self.crypto.randomUUID();

            html += `<input type="text" maxlength="1" id="${this.#uuids[i]}">`;
        }

        html += "</div>";

        return html;
    }






    setupInputEvents()
    {
        for (let i = 0;
             i < this.#word.length;
             i++)
        {
            const $element = $(`#${this.#uuids[i]}`);

            $element.on("input", (e) =>
            {
                if (!$(e.target).val().match("[a-zA-Z]"))
                {
                    // debug info
                    console.log("Ignored");
                    return;
                }


                const letter = $element.val().toLowerCase();


                if (letter === this.#word[i].toLowerCase())
                {
                    $element.removeClass("incorrect-input");
                    $element.addClass("correct-input");
                    $element.attr("disabled", true);

                    if (i !== this.#word.length - 1)
                    {
                        $(`#${this.#uuids[i + 1]}`).focus();
                    }
                }
                else if (arrayContains(this.#word, letter))
                {
                    const indexOfLetter = this.#getIndexOfLetter(letter);


                    if (indexOfLetter !== LETTER_NOT_FOUND)
                    {
                        const $targetElement = $(`#${this.#uuids[indexOfLetter]}`);

                        $targetElement.val(letter);
                        $targetElement.removeClass("incorrect-input");
                        $targetElement.addClass("correct-input");
                        $targetElement.attr("disabled", true);
                        $element.val("");
                    }
                }
                else
                {
                    $element.removeClass("correct-input");
                    $element.addClass("incorrect-input");

                    this.#tries++;

                    const animationHandler = requestAnimationFrame(null);

                    $("#hangman-img").attr("src", `Images/0${this.#tries}.png`);
                }




                if (this.#tries >= this.#maxTries)
                {
                    this.validateAnswer(this.getAnswer());
                }
                else if (this.getAnswer() === this.#word.toLowerCase())
                {
                    $("#after-game-message").html("You win!");
                    $("#after-game-area").show();
                }
            });
        }
    }





    validateAnswer(str)
    {
        if (str.toLowerCase() === this.#word.toLowerCase())
        {
            $("#after-game-message").html("You win!");
        }
        else
        {
            $("#after-game-message").html(`Sorry, better luck next time. The correct answer was "${this.#word}."`);

            for (let i = 0;
                 i < this.#uuids.length;
                 i++)
            {
                $(`#${this.#uuids[i]}`).attr("disabled", true);
            }
        }


        $("#after-game-area").show();
    }
}