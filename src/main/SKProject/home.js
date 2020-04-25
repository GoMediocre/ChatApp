
    window.onload = function() {
        this.startTimer();
    }


    function validateForm() {
        var uName = document.getElementById("txtuname").value;
        var email = document.getElementById("txtemail").value;
        var gender = document.getElementsByName("gender").value;

        //after data entey to DB :-
    };


    function  startTimer() {
        var timer = 30;
        setInterval( function(){
            if(timer >= 0){
                document.getElementById("tmr").innerHTML = timer--;
            }
            if(timer == 0){
                document.getElementById("tmr").innerHTML = "Completed";
            }
        }, 1000);
    }
   

