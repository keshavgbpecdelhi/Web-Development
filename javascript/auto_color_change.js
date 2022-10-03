<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Auto Colour Changer</title>
  <style>
    @import url("https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap");

    *{
      width: 100%;
      height: 100%;
      padding-top: 62px;
      paddin-left: 23px;
    }

    body {
      -ms-overflow-style: none;
      scrollbar-width: none;
      overflow-y: scroll;
      font-family: "Fredoka One", monospace;
      background-image: url(http://surl.li/cmzmk);
      background-size: cover;
      color: rgb(173, 221, 221);
    }

    body::-webkit-scrollbar {
      display: none;
    }
    h1 {
      margin: 0;
      font-size: 5rem;
    }
    h3 {
      font-size: 2rem;
    }
  </style>
</head>

<body>
  <section class="main py-md-5">
    <h1>Hello! <span>I am </span><span id="name">Nikhil.</span></h1>
  </section>

  <script>
    var click = document.getElementById("name");
    click.style.transition = "all 1s";
    setInterval(function () {
      var randomColor = Math.floor(Math.random() * 16777215).toString(16);
      click.style.color = "#" + randomColor;
    }, 3000);
  </script>

</body>

</html>
