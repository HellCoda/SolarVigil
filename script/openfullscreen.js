function goToVideoPage() {
    window.location.href = "video.html";
    }
    
    function goTosolarsystem() {
    window.location.href = "Main.html";
    }
    
    
    var elem = document.documentElement;
    
    function openFullscreen() {
    
    if (elem.requestFullscreen) {
    elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { 
    elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { 
    elem.msRequestFullscreen();
    }
    }
    
    
    var dialog = document.getElementById("dialog");
    var overlay = document.getElementById("overlay");
    var dialogButton = document.getElementById("dialog-button");
    
    
    function showDialog() {
    dialog.style.display = "block";
    overlay.style.display = "block";
    }
    
    
    function hideDialog() {
    dialog.style.display = "none";
    overlay.style.display = "none";
    }
    
    
    window.addEventListener("load", showDialog);
    
    
    dialogButton.addEventListener("click", function() {
    openFullscreen();
    hideDialog();
    });