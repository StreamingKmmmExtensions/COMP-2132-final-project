const MAX_TRIES = 6;
const LETTER_NOT_FOUND = -1;

class Word
{
    #name;
    #uuids;
    #tries;
    #maxTries;





    constructor(name, hint)
    {
        this.#name = name;
        this.#uuids = Array(name.length);
        this.#tries = 0;

        $("#hint").html(`Hint: ${hint}`);

        if (this.#name.length < MAX_TRIES)
        {
            this.#maxTries = this.#name.length;
        }
        else
        {
            this.#maxTries = MAX_TRIES;
        }
    }





    getAnswer()
    {
        let answer = "";


        for (let i = 0;
             i < this.#name.length;
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
        if (!arrayContains(this.#name, letter))
        {
            return LETTER_NOT_FOUND;
        }


        for (let i = 0;
             i < this.#name.length;
             i++)
        {
            if (this.#name[i].toLowerCase() === letter.toLowerCase() &&
                $(`#${this.#uuids[i]}`).val() === "")
            {
                return i;
            }
        }


        return LETTER_NOT_FOUND;
    }





    getInputBox()
    {
        let html = "";


        // Add Elements
        for (let i = 0;
             i < this.#name.length;
             i++)
        {
            this.#uuids[i] = self.crypto.randomUUID();

            html += `<input type="text" maxlength="1" id="${this.#uuids[i]}">`;
        }

        return html;
    }






    setupInputEvents()
    {
        for (let i = 0;
             i < this.#name.length;
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


                if (letter === this.#name[i].toLowerCase())
                {
                    $element.removeClass("incorrect-input");
                    $element.addClass("correct-input");
                    $element.attr("disabled", true);

                    if (i !== this.#name.length - 1)
                    {
                        $(`#${this.#uuids[i + 1]}`).focus();
                    }
                }
                else if (arrayContains(this.#name, letter))
                {
                    const indexOfLetter = this.#getIndexOfLetter(letter);


                    if (indexOfLetter !== LETTER_NOT_FOUND)
                    {
                        const $targetElement = $(`#${this.#uuids[indexOfLetter]}`);

                        //console.log(`array contains and letter found: ${indexOfLetter}`);

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
                }




                if (this.#tries >= this.#maxTries)
                {
                    this.validateAnswer(this.getAnswer());
                }
                else if (this.getAnswer() === this.#name.toLowerCase())
                {
                    $("#after-game-message").html("You win!");
                    $("#after-game-area").show();
                }
            });
        }
    }





    validateAnswer(str)
    {
        if (str.toLowerCase() === this.#name.toLowerCase())
        {
            $("#after-game-message").html("You win!");
        }
        else
        {
            $("#after-game-message").html(`Sorry, better luck next time. The correct answer was "${this.#name}."`);

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