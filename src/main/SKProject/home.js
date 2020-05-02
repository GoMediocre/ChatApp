
    // window.onload = function() {
    //     this.startTimer();
    // }


    function validateForm() {
        var uName = document.getElementById("txtuname").value;
        var email = document.getElementById("txtemail").value;
        var gender = document.getElementsByName("gender");
        var gen;
        for (var i = 0; i < gender.length; ++i) {
            if (gender[i].checked){
                gen = gender[i].value;
                break;
            }
        }
        console.log(uName + " " + email + " " + gen);
        sendDataToServer(uName, email, gen);
    };


    function sendDataToServer(name, email, gender) {
            var user = {
                "name" : name,
                "email" : email,
                "gender" : gender
            };
            console.log("I am ajax call")
            $.ajax({
                url : 'http://localhost:8080/Chat-Application/rest/user/data',
                type : 'POST',
                data : user,
                contentType: "application/json",
                success: function (data) {
                    console.log("i am success");
                    if(data.result === true){       
                        //alert("LogIn Successfully");
                        //window.location = "visitorIndex.html";
                    }else{
                        alert("userName or Pasword Incorrect")
                    }
                }
                , error: function (jqXHR, textStatus, err) { 
                    alert('text status ' + textStatus + ', err ' + err);
                }
            });

    }

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
   

