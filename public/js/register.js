function register(){
 let username1=document.getElementById("form3Example1cg").value;
 let email1=document.getElementById("form3Example3cg").value;
 let pwd1=document.getElementById("form3Example4cg").value;
 let mobile1=document.getElementById("form3Example4cdg").value;
    
 var req = new XMLHttpRequest();
    req.open("POST", "http://localhost:5000/register");
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify({
        "username":username1,
        "email":email1,
        "hash_password":pwd1,
        "mobile":mobile1
    }));
    req.onreadystatechange = function(){
        if(req.readyState == 4)
        {
            if(req.status == 201){
                loadUser();  
            
            }
        }
    }

    
}


function login(){
    var name=document.getElementById('txtusername').value;
    var pwd=document.getElementById('txtpassword').value
    var req = new XMLHttpRequest();
var newObj={
    username:name,
    hash_password:pwd
}
    
    req.open("POST","http://localhost:5000/login" , true);
    req.setRequestHeader("Content-type","application/json");

    req.send(JSON.stringify(newObj));
    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            if (req.status === 200) {
                console.log(this.responseText);
                // window.location.href="booking.html";
                var k=JSON.parse(req.responseText);
                localStorage.setItem("Token",k);
                loadUser();
            
            }
        }
    }
}


    function loadUser(){

        var req = new XMLHttpRequest();
     
    
        req.open("GET", "http://localhost:5000/auth-user", true);
     
        req.setRequestHeader("Content-type", "application/json");
     
        req.setRequestHeader("x-user-auth-token",localStorage.getItem("Token"));
     
      
     
        req.send();
     
        req.onreadystatechange = function () {
     
           if (req.readyState == 4) {
     
              if (req.status == 200) {
                 window.location.href = "booking.html";
     
              }
     
           }
     
      
     
        }}