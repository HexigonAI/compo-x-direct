$(".clone-sec").click(function () {
    console.log("clicked");
    var clone = $("#component").clone();
    $("#stage").append(clone);
    clone.attr("id", "component" + Math.floor(Math.random() * 100000));
    //remove the class "clone" from the cloned element
  });
  
  randomColor = function () {
    //create an array of colors in hex
    var colors = ["#fad6db", "#f4d0f0", "#f9d3d6"];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  //when the user press enters on the element search-compo do this
  $("#search-compo").keypress(function (e) {
    if (e.which == 13) {
      $(".ai-component").hide();
      $("#draggable").fadeOut();
      $("#loader").fadeIn();
      $("#component").css("background-image", "none");
      $("#compoval").html("");
  
      var search = $("#search-compo").val();
      //Enter key pressed
      fetch("https://unlockedx.awunda.com/webhook/compox", {
        method: "POST",
        body: $("#search-compo").val(),
      })
        .then(function (response) {
          console.log(response);
          return response.json();
        })
        .then(function (data) {
          $(".ai-component").show();
          if (data.length == 0) {
            alert("No data found");
          }
  
          console.log(data);
          window.data = data;
   
  
          var html = data.HTML;
          var css = data.CSS;
          if (html == undefined) {
            html = data.html;
          }
          if (css == undefined) {
            css = data.css;
          }
  
          console.log("parsed");
          var div = document.createElement("div");
          div.className = "ai-component";
          div.id = "component" + Math.floor(Math.random() * 100000);
  
          div.style.width = "100%";
          div.setAttribute("data-prompt", $("#search-compo").val());
  
          console.log(html);
          console.log(css);
  
          div.innerHTML = html;
          $(div).find("*").attr("contenteditable", "true");
  
  
  
  
          $("#component").append(div);
          $("#component").append("<style>" + css + "</style>");
  
          id = 0;
          //make id global
          window.id = id;
  
          $("#loader").fadeOut();
  
          $("#draggable").fadeIn();
          $("#draggable").css("position", "fixed");
          $("#draggable").css("z-index", "1000");
          $("#draggable").css("top", "4rem");
          $("#draggable").css("margin-top", "3rem");
          $("#search-compo").attr("placeholder", "Create another component");
          $("#search-compo").val("");
  
  
          var str = search;
          var res = str.split(" ");
  
          var i = 0;
  
          function randomTime() {
            return Math.floor(Math.random() * (334 - 23 + 1) + 23);
          }
  
          $(".ai-component").click(function () {
            //$(this).remove();
          });
  
          $(".ai-component").hover(
            function () {
              $(this).css("cursor", "grab");
            },
            function () {
              $(this).css("cursor", "auto");
            }
          );
  
          $(".ai-component").draggable({
            containment: "#component",
            scroll: false,
            start: function (event, ui) {
              $(this).css("border", "1px dashed grey");
              $(this).css("opacity", "0.5");
            },
            stop: function (event, ui) {
              $(this).css("border", "none");
              $(this).css("opacity", "1");
            },
          });
  
          $(".ai-component").click(function () {
            $(this).draggable("disable");
            $(this).css("cursor", "auto");
          });
          
          $(".ai-component").dblclick(function () {
            $(this).draggable("enable");
            $(this).css("cursor", "grab");
          });
  
  
          $(".ai-component").hover(function () {
            $(".ai-component").css("outline", "none");
            $(this).css("outline", "1px solid purple");
          });
          $(".ai-component").mouseleave(function () {
            $(this).css("outline", "none");
          });
  
          $(".ai-component").click(function () {
            $("#delete-top").css("display", "block");
            $("#trash").removeClass("hide");
            console.log("clicked");
            var id = $(this).attr("id");
            window.id = id;
            console.log("delete " + $(this).attr("id"));
          });
  
          var children = $(".ai-component").children();
          children.hover(
            function () {
              var className = $(this).attr("class").split(" ")[0];
              var div = document.createElement("div");
              div.className = "class-name-top";
              div.innerHTML = className;
              $(this).append(div);
              div.style.position = "absolute";
              div.style.top = "-2rem";
              div.style.left = "0";
              div.style.padding = "0.2rem";
              div.style.background = "purple";
              div.style.color = "white";
              div.style.fontSize = "0.6rem";
              div.style.borderRadius = "0.2rem";
              div.style.zIndex = "1000";
              div.style.opacity = "0.8";
            },
            function () {
              $(".class-name-top").remove();
            }
          );
  
          children.children().hover(
            function () {
              var className = $(this).attr("class").split(" ")[0];
              var div = document.createElement("div");
              div.className = "class-name";
              div.innerHTML = className;
              $(this).append(div);
              div.style.position = "absolute";
              div.style.top = "-4rem";
              div.style.left = "0";
              div.style.padding = "0.2rem";
              div.style.background = "purple";
              div.style.color = "white";
              div.style.fontSize = "0.6rem";
              div.style.borderRadius = "0.2rem";
              div.style.zIndex = "1000";
              div.style.opacity = "0.8";
            },
            function () {
              $(".class-name").remove();
            }
          );
  
  
          $("#delete-top").click(function () {
            $("#" + window.id).remove();
            $("#delete-top").css("display", "none");
          });
  
          $("#trash").click(function () {
            $("#" + window.id).remove();
            $("#delete-top").css("display", "none");
            $("#trash").addClass("hide");
          });
  
          var timer = setInterval(function () {
            $("#compoval").append(res[i] + " ");
            i++;
            if (i >= res.length) {
              clearInterval(timer);
            }
            $("#compoval").css(
              "background-image",
              "linear-gradient(to right, " +
                randomColor() +
                ", " +
                randomColor() +
                ")"
            );
            $("#compoval").css("background-image-opacity", "0.3");
          }, randomTime());
        });
    }
  });
  
  document.getElementById("copy").addEventListener("click", function () {
    document.execCommand("copy");
  });
  
  document.getElementById("go2").addEventListener("click", function () {
    document.execCommand("copy");
  });
  
  document.addEventListener("copy", function (e) {
    //check if btn2 was clicked
    wfdata = document.getElementById("wfdata");
    e.clipboardData.setData("application/json", data[id].wcompo);
    e.preventDefault(); // default behaviour is to copy any selected text
    $("#notice").fadeIn();
    setTimeout(function () {
      $("#notice").fadeOut();
    }, 3000);
  });
  
  $("#next").click(function () {
    //if id is less than 9
    if (id < 9) {
      id++;
      $("#component").css(
        "background-image",
        "url(https://codelesscomponents.com/assets/" + data[id].image + ")"
      );
    }
    //else
    else {
      id = 0;
      $("#component").css(
        "background-image",
        "url(https://codelesscomponents.com/assets/" + data[id].image + ")"
      );
    }
  });
  
  $("#component").css("overflow-y", "scroll");
  
  $("#search-compo").click(function () {
    $("body").animate({ backgroundColor: "#252525" }, 500);
  });
  