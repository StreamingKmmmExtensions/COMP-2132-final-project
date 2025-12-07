class Word
{
    #name;


    constructor(name)
    {
        this.#name = name;
    }


    getInputBox()
    {
        let html = "";


        for (let i = 0;
             i < this.#name.length;
             i++)
        {
            const guid = self.crypto.randomUUID();


            console.log(guid);
            html += `<input id="${guid}" type="text" maxlength="1">`;

            const element = $(`#${guid}`);

            element.on("click", () => console.log("clicked"));

            element.on("input", (e) => {
                console.log(element.val());

                if (element.val().toLowerCase() === this.#name[i].toLowerCase())
                {
                    console.log("Match");
                }
            });
        }

        return html;
    }
}