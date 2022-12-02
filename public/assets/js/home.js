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

    secretFound = false;
    switchingImages = false;
    $("#logo img").click(() => {
        if (switchingImages) return;

        switchingImages = true;
        
        cse = $(`#logo img[pic="${$('#logo img.visible').attr("pic")}"]`);
        nse = $(`#logo img[pic="${$('#logo img.hidden').attr("pic")}"]`);

        cse.transition("horizontal flip", () => {
            nse.transition("horizontal flip", null, 100);
            cse.css("display", "none");
            switchingImages = false;

            if (!secretFound) {
                $("body").toast({
                    title: "You found a secret!",
                    showIcon: 'user secret',
                    class: "violet centered",
                    position: "top attached"
                });
                secretFound = true;
            }
        }, 100);
    });

    $("[showImage]").click((e) => {

        e = $(e.currentTarget);

        $("body").modal({
            content: `<img src='${e.attr("showImage")}' class='ui centered large image'>`,
            class: "image- inverted"
        }).modal("show");
    });
});