let register = (event) => {
    console.log('event :', event)
    event.preventDefault();
    let username = document.getElementById('username').value
    let number = document.getElementById('number').value

    let country = document.getElementById('country').value
    let city = document.getElementById('city').value


    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    const userData = {
        username,
        number,
        country,
        city,
        email,
        password
    }
    console.log('userData :', userData)
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log("SignUp Successfull")
        firebase.firestore().collection("users").doc(user.uid).set({
            username: username,
            number: number,
            country: country,
            email: email,
            city : city,
            uid: user.uid,
            password: password
            
        })

        
        .then(function() {
            console.log("Data Succesfull");
        }).catch(error => {
            console.log(error);
        })

        swal({
            title: "Good job!",
            text: "You clicked the button!",
            icon: "success",
        }).then((value) => {
            // localStorage.setItem("userInfo",JSON.stringify(auth.currentUser) )
            location.href="./userLog.html";

        })
})
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error(errorMessage)
            // ..
            swal("Bad job!" , errorMessage, "error")
        });
}