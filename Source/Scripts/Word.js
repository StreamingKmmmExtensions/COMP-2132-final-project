const MAX_TRIES = 6;

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
                    console.log("Space");
                    return;
                }

                if ($element.val().toLowerCase() === this.#name[i].toLowerCase())
                {
                    $element.removeClass("incorrect-input");
                    $element.addClass("correct-input");
                    $element.attr("disabled", true);
                }
                else
                {
                    $element.removeClass("correct-input");
                    $element.addClass("incorrect-input");
                    this.#tries++;
                }

                if (i !== this.#name.length - 1)
                {
                    $(`#${this.#uuids[i + 1]}`).focus();
                }



                if (this.#tries >= this.#maxTries)
                {
                    this.validateAnswer(this.getAnswer());
                }
                else if (this.getAnswer() === this.#name.toLowerCase())
                {
                    $("#after-game-message").html("You win!");
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
    }
}