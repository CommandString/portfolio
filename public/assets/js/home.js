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

    timesFlipped = 0;
    switchingImages = false;
    logoSide = true
    $("#logo img").click(() => {
        if (switchingImages) return;

        switchingImages = true;

        setTimeout(() => {
            switchingImages = false;
        }, 900)


        logoSide = (logoSide) ? false : true;
        
        cse = $(`#logo img[pic="${$('#logo img.visible').attr("pic")}"]`);
        nse = $(`#logo img[pic="${$('#logo img.hidden').attr("pic")}"]`);

        cse.transition("horizontal flip", () => {
            nse.transition("horizontal flip", null, 100);
            cse.css("display", "none");

            if (!logoSide) {
                if (timesFlipped == 0) {
                    $("body").toast({
                        title: "You found a secret!",
                        showIcon: 'user secret',
                        class: "violet centered",
                        position: "top attached"
                    });
                } else if (timesFlipped == 1) {
                    $("body").toast({
                        title: "You already found the secret though",
                        class: "violet centered",
                        position: "top attached"
                    });
                } else if (timesFlipped == 3) {
                    $("body").toast({
                        title: "You're making me dizzy",
                        class: "violet centered",
                        position: "top attached",
                        displayTime: 3000
                    });
                } else if (timesFlipped == 10) {
                    $("body").toast({
                        title: "Aren't you bored yet?",
                        class: "violet centered",
                        position: "top attached"
                    });
                } else if (timesFlipped == 100) {
                    $("body").toast({
                        title: "Please stop...",
                        class: "violet centered",
                        position: "top attached"
                    });
                }
                
                console.log(`You've flipped my logo ${timesFlipped} time(s)`);

                timesFlipped++;
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

    played = 0;
    $("[showVideo]").click((e) => {
        e = $(e.currentTarget);

        $("body").modal({
            content: `<video controls style="width: 80%; height: auto; margin: auto;"><source src='${e.attr("showVideo")}'></video>`,
            class: "image- inverted playvideo",
            classContent: "centered",
            onVisible: () => {
                $(".playvideo video").trigger("play");
            }
        }).modal("show");

        $(".playvideo video").on("ended", () => {
            setTimeout(() => {
                $(".playvideo").modal("hide");

                if (played == 0) {
                    $("body").toast({
                        title: "Yes that was me",
                        message: "For those who are interested the song is The Devil Went Down to Georgia by Steve Ouimette",
                        class: "violet centered",
                        position: "top attached",
                        displayTime: 5500
                    });
                } else if (played == 1) {
                    $("body").toast({
                        title: "Again?",
                        message: "I do have a couple videos of me playing on my youtube channel if you're interested",
                        class: "violet centered",
                        position: "top attached"
                    })
                } else if (played == 5) {
                    $("body").toast({
                        title: "This is the fifth time!",
                        message: "I'm gonna redirect you to my youtube channel now XD",
                        class: "violet centered",
                        position: "top attached",
                        onHidden: () => {
                            window.open("https://www.youtube.com/channel/UCVDEwnond4DR4w_dmjqLFSQ", "_blank");
                        }
                    });
                }

                played++
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