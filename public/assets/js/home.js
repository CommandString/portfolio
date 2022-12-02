$(document).ready(() => {
    $(".button-.column").css("opacity", 1);

    function writeElement(element, callback = null) {
        textToWrite = element.attr("data-write").split("");

        i = 0;

        function addText(element, text) {
            element.text(element.text() + text);
        }

        finished = false;

        interval = setInterval(() => {
            letter = textToWrite[i++];

            if (typeof letter == "undefined") {
                clearInterval(interval);
                finished = true
                return;
            }

            if (letter == " ") {
                addText(element, " ");
                letter = textToWrite[i++];
            }

            addText(element, letter);
        }, 120);

        if (callback !== null) {
            check = setInterval(() => {
                if (finished) {
                    callback();
                    clearInterval(check);
                }
            }, 250);   
        }
    }

    writeElement($("#name > .header"), () => {
        writeElement($("#name > span"), null);
    });

    $("[scrollTo]").click((e) => {
        scrollTo({
            top: $(e.currentTarget.getAttribute("scrollTo")).get(0).offsetTop-40,
            behavior: 'smooth'
          });
    });

    $(".langs- .card .progress").progress();
});