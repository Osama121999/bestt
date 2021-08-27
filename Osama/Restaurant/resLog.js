

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
        location.href = "./restaurantDash.html"
    })
})
    .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage)
    swal("Oops! Login Failed", errorMessage, "error");

});

}



// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();

