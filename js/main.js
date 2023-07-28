var userEmail = document.querySelector('#userEmail');
var userPassword = document.querySelector('#userPassword');
var btnLogin = document.querySelector('#btnLogin');

var signName = document.querySelector('#signName');
var signEmail = document.querySelector('#signEmail');
var signPassword = document.querySelector('#signPassword');
var btnSignUp = document.querySelector('#btnSignUp');

var pathparts = location.pathname.split('/');
var baseURL = ''
for (var i = 0; i < pathparts.length - 1; i++) {
    baseURL += '/' + pathparts[i]
}

var userName = localStorage.getItem('sessionUsername')
if (userName !=null){
    document.getElementById('welcome').innerHTML = `<h1  class="color "> Welcome ${userName}</h1>`;
}


var signUpContainer;
if (localStorage.getItem('myuser') != null){
    signUpContainer = JSON.parse(localStorage.getItem('myuser'))
  
}
else {
    signUpContainer = [];
}

btnSignUp.addEventListener('click' , function(){
    signUP ();
    clearForm();
})


function clearForm(){
   signName.value = '';
   signEmail.value = '';
   signPassword.value = '';
}

function isEmpty(){
    if (signName.value== "" || signEmail.value== "" || signPassword == "" ){
        return false;
    }else {
        return true;
    }
}

function isExist(){
    for (var i = 0 ; i < signUpContainer.length ; i++){
        if (signUpContainer[i].email.toLowerCase() == signEmail.value.toLowerCase()){
            return false;
        }
    }
}

function signUP (){
    if (isEmpty () == false){
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false;
    }
    var userSingup = {
        name: signName.value,
        email: signEmail.value,
        password: signPassword.value
    }
    if (signUpContainer.length ==0){
        signUpContainer.push(userSingup);
        localStorage.setItem('myuser' , JSON.stringify(signUpContainer));
        document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>'
      return true;
    }
    if (isExist() == false){
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">email already exists</span>'
    }else{
        signUpContainer.push(userSingup);
        localStorage.setItem('myuser' , JSON.stringify(signUpContainer));
        document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>';
    }

}

///////////////////////////////////////
// login

// btnLogin.addEventListener('click' , function(){
//     logIN();
// })


function loginEmpty(){
    if (userEmail.value == "" || userPassword.value == ""){
        return false;
    }else{
        return true;
    }
}

function logIN(){
    if (loginEmpty() == false){
        document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false
    }
    var email = userEmail.value;
    var password = userPassword.value;
    for (var i = 0; i < signUpContainer.length ; i++){
        if (signUpContainer[i].email.toLowerCase() == email.toLowerCase()&&signUpContainer[i].password.toLowerCase() == password.toLowerCase() ){
            localStorage.setItem('sessionUsername' , signUpContainer[i].name)
            if (baseURL == '/'){
                location.replace('http://' + location.hostname + '/home.html')
            }else{
                location.replace(baseURL + '/home.html')
            }
        }else{
            document.getElementById('incorrect').innerHTML = '<span class="p-2 text-danger">incorrect email or password</span>'
        }
    }
}

// var userName = localStorage.getItem('sessionUsername')
// if (userName !=null){
//     document.getElementById('welcome').innerHTML = `<h1  class="color "> Welcome ${userName}</h1>`;
// }


function logout() {
    localStorage.removeItem('sessionUsername')
    location.replace(baseURL + '/index.html')
}





