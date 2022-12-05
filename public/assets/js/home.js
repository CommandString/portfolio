$(document).ready(() => {
    $(".button-.column").css("opacity", 1);

    function writeElement(element, callback = null) {
        if (callback !== null) {
            iam();
        }

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
        } else {
            clearInterval(check);
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

    $("[showVideo]").click((e) => {
        e = $(e.currentTarget);

        $("body").modal({
            content: `<video controls style="width: 50%; height: auto; margin: auto;"><source src='${e.attr("showVideo")}'></video>`,
            class: "image- inverted playvideo",
            classContent: "centered"
        }).modal("show");

        $(".playvideo video").on("ended", () => {
            setTimeout(() => {
                $(".playvideo").modal("hide");
            }, 500);
        });
    });

    function iam() {
        words = [
            "Website Developer",
            "Programmer",
            "Fret Smasher",
            "Assistant Teacher",
            "Senior High School Student",
            "Discord Bot Developer",
            "PHP Fanatic",
            "18 years old"
        ];

        element = $("#iam-text");

        function addText(text) {
            element.text(element.text() + text);
        }
        
        wordIterator = 0;
        word = words[wordIterator++];

        function writeWord() {
            letterIterator = 0;
            letters = word.split("");

            interval2 = setInterval(() => {
                letter = letters[letterIterator++];

                if (typeof letter == "undefined") {
                    clearInterval(interval2);
                    setTimeout(() => {
                        deleteWord();
                    }, 400);
                    return;
                }

                if (letter == " ") {
                    addText(letter)
                    letter = letters[letterIterator++];
                }

                addText(letter);
            }, 2000/letters.length);
        }

        function deleteWord() {
            interval2 = setInterval(() => {
                if (element.text().split("").length == 0) {
                    clearInterval(interval2);
                    word = words[wordIterator++];

                    if (typeof word == "undefined") {
                        wordIterator = 0;
                        word = words[wordIterator++];
                    }

                    vowels = ["a", "e", "i", "o", "u"];

                    if (vowels.includes(word.charAt(0).toLowerCase())) {
                        $("#a").text("an");
                    } else if (word.charAt(0) != "1") {
                        $("#a").text("a");
                    } else {
                        $("#a").text("");
                    }

                    writeWord();
                    return;
                }

                if (element.text().charAt(element.text().length-1) == " ") {
                    element.text(element.text().slice(0, -1));
                }

                element.text(element.text().slice(0, -1));
            }, 400/word.length)
        }

        writeWord();
    }
});