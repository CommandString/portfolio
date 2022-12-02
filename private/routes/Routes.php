<?php

//########################//
//   DEFINE ROUTES HERE   //
//########################//

use CommandString\Router\Environment as Env;
use HttpSoft\Response\HtmlResponse;
use Router\Routes\Files;

function createLang(string $name, string $description, string $img, int $percent, string $color): stdClass
{
    $object = new stdClass;

    $object->name = $name;
    $object->description = $description;
    $object->img = "/assets/img/$img";
    $object->percent = $percent;
    $object->color = $color;

    return $object;
}

function createPackage(string $name, string $description, string $version, string $repo): stdClass
{
    $object = new stdClass;

    $object->name = $name;
    $object->description = $description;
    $object->version = $version;
    $object->repo = $repo;

    return $object;
}

function createSocial(string $name, string $username, string $url, string $img): stdClass
{
    $object = new stdClass;

    $object->name = $name;
    $object->username = $username;
    $object->url = $url;
    $object->img = "/assets/img/$img";

    return $object;
}

$router->get("/", function () {
    $langs = [
        createLang("PHP", "PHP is a general-purpose scripting language geared toward web development. It was originally created by Danish-Canadian programmer Rasmus Lerdorf in 1993 and released in 1995. The PHP reference implementation is now produced by The PHP Group.", "php.png", 87, "violet"),
        createLang("Javascript", "JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS. As of 2022, 98% of websites use JavaScript on the client side for webpage behavior, often incorporating third-party libraries.", "js.png", 69, "yellow"),
        createLang("Lua", "Lua is a lightweight, high-level, multi-paradigm programming language designed primarily for embedded use in applications. Lua is cross-platform, since the interpreter of compiled bytecode is written in ANSI C, and Lua has a relatively simple C API to embed it into applications.", "lua.png", 8, "blue"),
        createLang("Java", "Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible.", "java.png", 5, "red"),
        createLang("MySQL", "MySQL is an open-source relational database management system. Its name is a combination of \"My\", the name of co-founder Michael Widenius's daughter My, and \"SQL\", the abbreviation for Structured Query Language.", "mysql.png", 82, "teal"),
        createLang("HTML", "The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser. It can be assisted by technologies such as Cascading Style Sheets and scripting languages such as JavaScript.", "html.png", 97, "orange"),
        createLang("Python", "Python is a high-level, general-purpose programming language. Its design philosophy emphasizes code readability with the use of significant indentation. Python is dynamically-typed and garbage-collected. It supports multiple programming paradigms, including structured, object-oriented and functional programming.", "python.png", 20, "teal"),
        createLang("CSS", "CSS (Cascading Style Sheets) is used to style and layout web pages — for example, to alter the font, color, size, and spacing of your content, split it into multiple columns, or add animations and other decorative features", "css.png", 84, "blue")
    ];

    $packages = [
        createPackage("commandstring/cookie-encryption", "An addon to cmdstr/cookie to encrypt cookies with cmdstr/encrypt.", "v2.0.1", "https://github.com/CommandString/Cookie-Encryption"),
        createPackage("commandstring/pdo", "Making PDO easier with some magic 🪄.", "v1.0.1", "https://github.com/CommandString/PDO"),
        createPackage("commandstring/orm", "Not an ORM (yet) just an extension to my PDO driver.", "v1.1.2", "https://github.com/CommandString/PDO"),
        createPackage("commandstring/utils", "Basic utility functions I use daily in PHP.", "v1.0.0", "https://github.com/CommandString/Utils"),
        createPackage("commandstring/discordwebhook", "Create/send discord webhooks in PHP.", "v1.0.0", "https://github.com/CommandString/discordwebhook"),
        createPackage("commandstring/router", "An HTTP router for PHP for my micro-framework.", "v1.0.6", "https://github.com/CommandString/Router"),
        createPackage("commandstring/cookies", "A simpler way to manipulate cookies in PHP.", "v5.0.1", "https://github.com/CommandString/Cookies"),
        createPackage("commandstring/encrypt", "A simpler way to encrypt/decrypt data in PHP", "v2.0.2", "https://github.com/CommandString/Encrypt")
    ];

    $socials = [
        createSocial("Discord", "Command_String#8821", "https://discord.dog/232224992908017664", "discord.png"),
        createSocial("Youtube", "commandstring3250", "https://www.youtube.com/channel/UCVDEwnond4DR4w_dmjqLFSQ", "youtube.png"),
        createSocial("Github", "CommandString", "https://github.com/CommandString", "github.png")
    ];

    usort($packages, function ($a, $b) {
        return strcmp($a->name, $b->name);
    });
    
    usort($langs, function ($a, $b) {
        return ($a->percent < $b->percent);
    });

    return new HtmlResponse(Env::get()->twig->render("home.html", [
        "langs" => $langs,
        "packages" => $packages,
        "socials" => $socials
    ]));
});

// DEFINE ALL ROUTES ABOVE HERE OR THEY WILL NOT WORK //
$router->get("/.*(".Files::generateRegex().")", "Files@handle");

$router->set404("/.*", "ErrorHandler@handle404");

$router->run();
