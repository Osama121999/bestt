

let login = (event) => {
    console.log(event)
    event.preventDefault()
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    console.log(email, password)

    firebase.auth().signInWithEmailAndPassword(email, password)
  
    .then((userCredential) => {
     // Signed in
     var user = userCredential.user;
     // ...
     console.log(user)
     console.log("User Sucessfully login")
    
        swal({
        title: "Good job!",
        text: "Successfully Login!",
        icon: "success",
        button: "next",
    })
    .then((value) => {
        location.href = "./userDash.html"
    })
})
    .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage)
    swal("Oops! Login Failed", errorMessage, "error");

});

}