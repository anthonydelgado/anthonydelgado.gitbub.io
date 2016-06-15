(function($) {
  "use strict";

    // Up - go to top
    $('.up').click(function(){
        $('html, body').animate({scrollTop:0}, 1000);
    });

    // Contact button - go to contact
    $('.top-contact').click(function(){
        $('html, body').animate({
            scrollTop: $("#contact").offset().top
        }, 1000);
    });

    // Menu button - toggle
    $('.top-menu').click(function(){
        $('nav').fadeToggle(300);
    });
    
    // Dark theme button
    $('.top-dark').click(function(){
        $('head').append("<link id='dark' href='css/dark.css' type='text/css' rel='stylesheet' />");
        $('.settings .btn').removeClass('active');
        $('.top-dark').addClass('active');
    });
    
    // White theme button
    $('.top-white').click(function(){
        $('#dark').remove();
        $('.settings .btn').removeClass('active');
        $('.top-white').addClass('active');
    });

    // Tooltip 
    $('[data-toggle="tooltip"]').tooltip('hide');

    // Progress bar
    $('.progress .progress-bar').progressbar();
    
    


})(jQuery);



(function(){
    var stage, textStage, form, input;
    var circles, textPixels, textFormed;
    var offsetX, offsetY, text;
    var colors = ['#3b5998', '#00aced', '#dd4b39', '#cb2027', '#007bb6', '#517fa4'];

    function init() {
        initStages();
        initForm();
        initText();
        initCircles();
        animate();
        addListeners();
    }

    // Init Canvas
    function initStages() {
        offsetX = (window.innerWidth-600)/2;
        offsetY = (window.innerHeight-300)/2;
        textStage = new createjs.Stage("text");
        textStage.canvas.width = 600;
        textStage.canvas.height = 200;

        stage = new createjs.Stage("stage");
        stage.canvas.width = window.innerWidth;
        stage.canvas.height = window.innerHeight;
    }

    function initForm() {
        form = document.getElementById('form');
        form.style.top = offsetY+200+'px';
        form.style.left = offsetX+'px';
        input = document.getElementById('inputText');
    }

    function initText() {
        text = new createjs.Text("t", "80px 'Source Sans Pro'", "#eee");
        text.textAlign = 'center';
        text.x = 300;
    }

    function initCircles() {
        circles = [];
        for(var i=0; i<600; i++) {
            var circle = new createjs.Shape();
            var r = 7;
            var x = window.innerWidth*Math.random();
            var y = window.innerHeight*Math.random();
            var color = colors[Math.floor(i%colors.length)];
            var alpha = 0.2 + Math.random()*0.5;
            circle.alpha = alpha;
            circle.radius = r;
            circle.graphics.beginFill(color).drawCircle(0, 0, r);
            circle.x = x;
            circle.y = y;
            circles.push(circle);
            stage.addChild(circle);
            circle.movement = 'float';
            tweenCircle(circle);
        }
    }


    // animating circles
    function animate() {
        stage.update();
        requestAnimationFrame(animate);
    }

    function tweenCircle(c, dir) {
        if(c.tween) c.tween.kill();
        if(dir == 'in') {
            c.tween = TweenLite.to(c, 0.4, {x: c.originX, y: c.originY, ease:Quad.easeInOut, alpha: 1, radius: 5, scaleX: 0.4, scaleY: 0.4, onComplete: function() {
                c.movement = 'jiggle';
                tweenCircle(c);
            }});
        } else if(dir == 'out') {
            c.tween = TweenLite.to(c, 0.8, {x: window.innerWidth*Math.random(), y: window.innerHeight*Math.random(), ease:Quad.easeInOut, alpha: 0.2 + Math.random()*0.5, scaleX: 1, scaleY: 1, onComplete: function() {
                c.movement = 'float';
                tweenCircle(c);
            }});
        } else {
            if(c.movement == 'float') {
                c.tween = TweenLite.to(c, 5 + Math.random()*3.5, {x: c.x + -100+Math.random()*200, y: c.y + -100+Math.random()*200, ease:Quad.easeInOut, alpha: 0.2 + Math.random()*0.5,
                    onComplete: function() {
                        tweenCircle(c);
                    }});
            } else {
                c.tween = TweenLite.to(c, 0.05, {x: c.originX + Math.random()*3, y: c.originY + Math.random()*3, ease:Quad.easeInOut,
                    onComplete: function() {
                        tweenCircle(c);
                    }});
            }
        }
    }

    function formText() {
        for(var i= 0, l=textPixels.length; i<l; i++) {
            circles[i].originX = offsetX + textPixels[i].x;
            circles[i].originY = offsetY + textPixels[i].y;
            tweenCircle(circles[i], 'in');
        }
        textFormed = true;
        if(textPixels.length < circles.length) {
            for(var j = textPixels.length; j<circles.length; j++) {
                circles[j].tween = TweenLite.to(circles[j], 0.4, {alpha: 0.1});
            }
        }
    }

    function explode() {
        for(var i= 0, l=textPixels.length; i<l; i++) {
            tweenCircle(circles[i], 'out');
        }
        if(textPixels.length < circles.length) {
            for(var j = textPixels.length; j<circles.length; j++) {
                circles[j].tween = TweenLite.to(circles[j], 0.4, {alpha: 1});
            }
        }
    }

    // event handlers
    function addListeners() {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
 $( "#entiresite" ).fadeOut( "slow", function() {
    // Animation complete.


setTimeout(function(){  
 $( "#gitme" ).fadeIn( "slow", function() {
    // Animation complete.
 explode();
$( "#entiresite" ).fadeIn();
  });

}, 2000);


 if(textFormed) {
                explode();
                if(input.value != '') {
                    setTimeout(function() {
                        createText(input.value.toUpperCase());
                    }, 810);
                } else {
                    textFormed = false;
                }
            } else {
                createText(input.value.toUpperCase());
            }

        });

  });
           
    }

    function createText(t) {
        var fontSize = 860/(t.length);
        if (fontSize > 160) fontSize = 160;
        text.text = t;
        text.font = "900 "+fontSize+"px 'Source Sans Pro'";
        text.textAlign = 'center';
        text.x = 300;
        text.y = (172-fontSize)/2;
        textStage.addChild(text);
        textStage.update();

        var ctx = document.getElementById('text').getContext('2d');
        var pix = ctx.getImageData(0,0,600,200).data;
        textPixels = [];
        for (var i = pix.length; i >= 0; i -= 4) {
            if (pix[i] != 0) {
                var x = (i / 4) % 600;
                var y = Math.floor(Math.floor(i/600)/4);

                if((x && x%8 == 0) && (y && y%8 == 0)) textPixels.push({x: x, y: y});
            }
        }

        formText();

    }


    window.onload = function() { init() 



$( "#me" ).click(function() {


 $( ".face" ).animate({
    opacity: 1,
    width: "600",
    height: "600"
  }, 1000, function() {
    // Animation complete.

createText('*');
setTimeout(function(){ 

explode();

 $( ".face" ).animate({
    opacity: ".1",
    width: "30",
    height: "30"
  }, 1000, function() {
    // Animation complete.

setTimeout(function(){ 
 $( ".face" ).animate({
    opacity: ".9",
    width: "300",
    height: "300"
  }, 1000, function() {
    // Animation complete.

  });

 }, 1500);

  });

 }, 1500);

});

  });
        


$( "#spy a" ).click(function() {
explode();
});


function navcrazy () { 

    var iconElement = document.getElementById('mini-nav-icon');
    var options = {
        from: 'fa-arrow-left',
        to: 'fa-bars',
        animation: 'rotateAntiClockwise'
    };

    iconate(iconElement, options);

    $('#entiresite').toggleClass('opacityentiresite'); 
    $('#mini-nav').toggleClass('minifull'); 
  $( "#spy" ).toggle();
  $( "#stage" ).toggleClass('mobilehidden');
  $( "#text" ).toggleClass('mobilehidden');

    $('body').toggleClass('mobileblackout'); 

explode();

}
 
$('#mini-nav').on('show.bs.dropdown', function () {

navcrazy();

 $( ".face" ).animate({
    opacity: ".2",
    width: "150",
    height: "150"
  }, 500, function() {
    // Animation complete.

  });

})



$('#mini-nav').on('hide.bs.dropdown', function () {

navcrazy();

 $( ".face" ).animate({
    opacity: ".9",
    width: "300",
    height: "300"
  }, 500, function() {
    // Animation complete.

  });


})

       setTimeout(function(){           createText('Hi!'); }, 3000);
        setTimeout(function(){          explode(); }, 6000);

setTimeout(function(){  
 $( "#entiresite" ).fadeIn( "slow", function() {
    // Animation complete. 
$( "#mini-nav" ).animate({"top": "0"});

  });

}, 6000);

};
})();




















