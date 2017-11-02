<?php
include __DIR__.'/vendor.php'
?>




        <!DOCTYPE html>
<!--[if IE 8]>
<html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]>
<html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en" class="no-js" xmlns="http://www.w3.org/1999/html">
<!--<![endif]-->
<head>
    <meta charset="utf-8"/>
    <title>Avatar Installer</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1" name="viewport"/>
    <meta content="avatar cms installer" name="description"/>
    <meta content="Sahak" name="author"/>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://npmcdn.com/tether@1.2.4/dist/js/tether.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <style>
        body{
            background-color: #f47371;
        }
        #output {
            width: 100%;
            height: 350px;
            overflow-y: scroll;
            background: black;
            color: darkturquoise;
            font-family: monospace;
            box-shadow: -17px 12px 15px #888888;
        }
    </style>
    <style>
        body {
            margin: 0;
        }

        .bookshelf_wrapper {
            position: relative;
            top: 60%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        .books_list {
            margin: 0 auto;
            width: 300px;
            padding: 0;
        }

        .book_item {
            position: absolute;
            top: -120px;
            box-sizing: border-box;
            list-style: none;
            width: 40px;
            height: 120px;
            opacity: 0;
            background-color: #f9f6ff;
            border: 5px solid #4948fa;
            transform-origin: bottom left;
            transform: translateX(300px);
            animation: travel 2500ms linear infinite;
        }

        .book_item.first {
            top: -140px;
            height: 140px;
        }

        .book_item.first:before, .book_item.first:after {
            content: '';
            position: absolute;
            top: 10px;
            left: 0;
            width: 100%;
            height: 5px;
            background-color: #4948fa;
        }

        .book_item.first:after {
            top: initial;
            bottom: 10px;
        }

        .book_item.second:before, .book_item.second:after, .book_item.fifth:before, .book_item.fifth:after {
            box-sizing: border-box;
            content: '';
            position: absolute;
            top: 10px;
            left: 0;
            width: 100%;
            height: 17.5px;
            border-top: 5px solid #4948fa;
            border-bottom: 5px solid #4948fa;
        }

        .book_item.second:after, .book_item.fifth:after {
            top: initial;
            bottom: 10px;
        }

        .book_item.third:before, .book_item.third:after {
            box-sizing: border-box;
            content: '';
            position: absolute;
            top: 10px;
            left: 9px;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            border: 5px solid #4948fa;
        }

        .book_item.third:after {
            top: initial;
            bottom: 10px;
        }

        .book_item.fourth {
            top: -130px;
            height: 130px;
        }

        .book_item.fourth:before {
            box-sizing: border-box;
            content: '';
            position: absolute;
            top: 46px;
            left: 0;
            width: 100%;
            height: 17.5px;
            border-top: 5px solid #4948fa;
            border-bottom: 5px solid #4948fa;
        }

        .book_item.fifth {
            top: -100px;
            height: 100px;
        }

        .book_item.sixth {
            top: -140px;
            height: 140px;
        }

        .book_item.sixth:before {
            box-sizing: border-box;
            content: '';
            position: absolute;
            bottom: 31px;
            left: 0px;
            width: 100%;
            height: 5px;
            background-color: #4948fa;
        }

        .book_item.sixth:after {
            box-sizing: border-box;
            content: '';
            position: absolute;
            bottom: 10px;
            left: 9px;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            border: 5px solid #4948fa;
        }

        .book_item:nth-child(2) {
            animation-delay: 416.66667ms;
        }

        .book_item:nth-child(3) {
            animation-delay: 833.33333ms;
        }

        .book_item:nth-child(4) {
            animation-delay: 1250ms;
        }

        .book_item:nth-child(5) {
            animation-delay: 1666.66667ms;
        }

        .book_item:nth-child(6) {
            animation-delay: 2083.33333ms;
        }

        .shelf {
            width: 300px;
            height: 5px;
            margin: 0 auto;
            background-color: #4948fa;
            position: relative;
        }

        .shelf:before, .shelf:after {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background: #1e6cc7;
            background-image: radial-gradient(rgba(255, 255, 255, 0.5) 30%, transparent 0);
            background-size: 10px 10px;
            background-position: 0 -2.5px;
            top: 200%;
            left: 5%;
            animation: move 250ms linear infinite;
        }

        .shelf:after {
            top: 400%;
            left: 7.5%;
        }

        @keyframes move {
            from {
                background-position-x: 0;
            }

            to {
                background-position-x: 10px;
            }
        }

        @keyframes travel {
            0% {
                opacity: 0;
                transform: translateX(300px) rotateZ(0deg) scaleY(1);
            }

            6.5% {
                transform: translateX(279.5px) rotateZ(0deg) scaleY(1.1);
            }

            8.8% {
                transform: translateX(273.6px) rotateZ(0deg) scaleY(1);
            }

            10% {
                opacity: 1;
                transform: translateX(270px) rotateZ(0deg);
            }

            17.6% {
                transform: translateX(247.2px) rotateZ(-30deg);
            }

            45% {
                transform: translateX(165px) rotateZ(-30deg);
            }

            49.5% {
                transform: translateX(151.5px) rotateZ(-45deg);
            }

            61.5% {
                transform: translateX(115.5px) rotateZ(-45deg);
            }

            67% {
                transform: translateX(99px) rotateZ(-60deg);
            }

            76% {
                transform: translateX(72px) rotateZ(-60deg);
            }

            83.5% {
                opacity: 1;
                transform: translateX(49.5px) rotateZ(-90deg);
            }

            90% {
                opacity: 0;
            }

            100% {
                opacity: 0;
                transform: translateX(0px) rotateZ(-90deg);
            }
        }
    </style>
</head>
<body>
<div class="row">
    <div class="col-lg-1"></div>
    <div class="col-lg-10">
        <h1>Avatar Composer</h1>
        <hr/>
        <h3>Console Output:</h3>
        <pre id="output" class="well"></pre>
    </div>

    <div class="col-lg-1"></div>
</div>
<div class="bookshelf_wrapper hidden">
    <ul class="books_list">
        <li class="book_item first"></li>
        <li class="book_item second"></li>
        <li class="book_item third"></li>
        <li class="book_item fourth"></li>
        <li class="book_item fifth"></li>
        <li class="book_item sixth"></li>
    </ul>
    <div class="shelf"></div>
</div>

<script>

    $(document).ready(function () {
        check();
    });
    function url() {
        return '';
    }
    function call(func) {
        $(".bookshelf_wrapper").removeClass("hidden");
        $("#output").append("\nplease wait...\n");
        $("#output").append("\n===================================================================\n");
        $("#output").append("Executing Started");
        $("#output").append("\n===================================================================\n");
        $.post(url(),
            {
                "path": $("#path").val(),
                "package": $("#package").val(),
                "command": func,
                "function": "command",

            },
            function (data) {
                $("#output").append(data);
                $("#output").append("\n===================================================================\n");
                $("#output").append("Execution Ended");
                $("#output").append("\n===================================================================\n");
                $(".bookshelf_wrapper").addClass("hidden");

            }
        );
    }
    function check() {
        $("#output").append('\nloading...\n');
        $.post(url(),
            {
                "function": "getStatus",
                "password": $("#password").val(),
            },
            function (data) {
                if (data.composer_extracted) {
                    $("#output").html("Ready. All commands are available.\n Composer start install cms");
                    call('install');
                }
                else if (data.composer) {
                    $.post(url(),
                        {
                            "password": $("#password").val(),
                            "function": "extractComposer",
                        },
                        function (data) {
                            $("#output").append(data);
                          //  window.location.reload();
                        }, 'text');
                }
                else {
                    $("#output").html("Please wait till composer is being installed...\n");
                    $.post(url(),
                        {
                            "password": $("#password").val(),
                            "function": "downloadComposer",
                        },
                        function (data) {
                            $("#output").append(data);
                        }, 'text');
                }
            });
    }
</script>
</body>
</html>