var login= document.getElementById("login-form");
var register = document.getElementById("register-form");
var message = document.getElementById("message");
function ShowRegister () {
    login.style.display="none";
    register.style.display= "block";
document.getElementById("form-title").textContent= "🎂 Creat Your Account";
document.getElementById("switch-text").innerHTML= 'Already have an account? <a id="here" href="#" onclick="showLogin()">Login here</a>';
message.textContent= "";
}
function showLogin(){
    register.style.display = "none";  
  login.style.display = "block";
  document.getElementById("form-title").textContent = "🍰 Welcome to SOFT SWEET 🍩";
  document.getElementById("switch-text").innerHTML = 'Do not have an account? <a id="here" href="#" onclick="ShowRegister()">Register here</a>';
  message.textContent= "";
}
// ==================== check for register ===============
if(register){
    register.addEventListener("submit" , function(event){
        event.preventDefault();
        var name= document.getElementById("register-name").value.trim();
        var email= document.getElementById("register-email").value.trim();
        var password= document.getElementById("register-password").value.trim();
        var phone= document.getElementById("register-phone").value.trim();
        var Emailreg = new RegExp(/^[a-zA-Z0-9]{3,30}@[a-z]{5}\.(com|eg|edu)$/)
        message.style.color = "red"
        if(!Emailreg.test(email)){
          message.textContent="Invalid email format.";  
         return;
        }
        if(password.length<6){
            message.textContent="password must be at least 6 characters.";
            return;
        }
        var regPhone = new RegExp(/^01(0|1|2|5)[0-9]{8}$/)
        if(!regPhone.test(phone)){
            message.textContent="Invalid phone Number.";  
         return;
        }
          // ================Save data ==============
        var date = new Date()
       date.setFullYear(date.getFullYear() +1)
       document.cookie="UserName="+ name +";expires=" +date;
       document.cookie="email="+ email +";expires=" +date;
       document.cookie="password="+ password +";expires=" +date;
       document.cookie="phone="+ phone +";expires=" +date;
       message.style.color="green";
       message.textContent="Account created successfully! You can now log in.";
    //    showLogin();
    })
}
//  ===============check for Login ====================
if(login){
    login.addEventListener("submit" , function(event){
        event.preventDefault();
     var email= document.getElementById("login-email").value.trim();
        var password= document.getElementById("login-password").value.trim();
        // ==========loop for Cookies data================
      var items= document.cookie.split(";");
      var obj={}
      for(item of items){
        var i= item.split("=");
        var key= i[0].trim();
        var value= i[1];
        obj[key]= value;
      }
      // console.log(obj);
      if(obj.email === email && obj.password === password){
        message.style.color = "green";
       message.textContent = "✅ Login successful!";
    setTimeout(() => { 
                   window.location.href = "../proudct/index.html"  //FLOW
                 } , 1000);
    }
     else {
        message.style.color="red";
       message.textContent="Invalid Email or password." ;
     }

    })
}

