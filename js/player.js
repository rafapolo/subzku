/* subzku.space by extrapolo.com */

$(document).ready(function(){

  // init
  window.loaded = 0;
  $(".vol").val(100);
  var set_num = $("#set").attr("set");
  window.text = $("#set").text() + "#0" + set_num;
  $("#set").text("loading...");

  // load mixer audios
  window.mixer = []
  $(".vol").each(function(i){
    var filename = "audio/set0"+set_num+"/t"+(i+1)
    audio = new Howl({
      src: [filename+".mp3", filename+".webm", filename+".ogg"],
      html5: false,
      volume: 1, // 100%
      loop: false,
      autoplay: false,
      onload: function() {
        window.loaded += 1;
        if (window.loaded==6){
          $("#set").text(window.text);
          $("#playlist").fadeIn(1000);
          playAll();
        }
     },
      onend: function() {
       this.play(); // better loop
     }
    });
    window.mixer[i+1] = audio
  });

  // improve tap to play on mobile
  $(document).focus();
  $("#playlist").click().click();
  $(document).click(function(){ playAll() })

  // control mixer
  $(document).on("input", ".vol", function(){
    id = ($(this).attr("id").split("audio")[1])
    audio = window.mixer[id];
    var vol = parseFloat($(this).val()/100).toFixed(2);
     playAll();
    audio.fade(vol, 0.0);
  })

  // fixes UI bug on Firefox
  $(".vol").on("change", function(){
    $("#playlist").hide(0).show(0);
  })
});

// play all on window focus
$(window,document).on("focusin", function(){
    playAll();
});
// pause all on window onfocus
$(window,document).on("focusout", function(){
    pauseAll();
});

// global mixer controls
function playAll(){
  $(window.mixer).each(function(i){
    // if all loaded
    if (window.loaded==6){
      var audio = window.mixer[i];
      if (i>0) {
        if (!audio.playing()){ audio.play() }
      }
    }
  })
}
function pauseAll(){
  $(window.mixer).each(function(i){
    var audio = window.mixer[i];
    if (i>0) {
      if (audio.playing()){ audio.pause() }
    }
  })
}
function stopAll(){
  $(window.mixer).each(function(i){
    if (i>0) { window.mixer[i].stop() }
  })
}
