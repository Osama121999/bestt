var userID;


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log(user.uid);
        userID = user.uid;

        var username = document.getElementById("username")
        firebase.firestore().collection("Restaurant").doc(user.uid).get()
            .then((snapshot) => {
                var currentUser = snapshot.data()
                console.log(currentUser);
                username.innerHTML = currentUser.restaurantname;
                 getCard();


            }).catch((er) => {
                console.log("Error", er);
            })



    }
})


var storage = firebase.storage();

let addCard = (e) => {
    console.log(e);
    e.preventDefault();
    var restaurantName = document.getElementById("restaurantName").value;
    var dish = document.getElementById("dish").value;
    var price = document.getElementById("price").value;

    var Description = document.getElementById("description").value;

    var imageFile = document.getElementById("imageFile");
    var imageKey = imageFile.files[0];

    var imagesRef = storage.ref().child('images/' + imageKey.name);
    var uploadTask = imagesRef.put(imageKey);


    uploadTask.snapshot.ref.getDownloadURL()
        .then((url) => {
            console.log("Image Added", url);

            firebase.firestore().collection("ADDCARD").add({
                    restaurantName: restaurantName,
                    dish: dish,
                    price: price,
                    Description: Description,
                    uid: userID,
                    image: url
                })
                .then(function() {
                    console.log(userID);
                    // console.log("Object url", url);
                    console.log("Data Added");
                    getCard();
                    // getTodo(userID);
                })
                .catch(function(error) {
                    console.log(error);
                })



        })
        .catch((er) => {
            console.log(er);
        })







    console.log(imageKey);
    console.log(restaurantName);
    console.log(Description);



}
var cardArray = []

// .where("uid" , "==" , uid)
//   .get()

let getCard = () => {
    cardArray = []
    firebase.firestore().collection("ADDCARD").where("uid" , "==" , userID)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                // console.log();
                // var a = doc.data()
                cardArray.push(doc.data())
                document.getElementById.innerHTML = "";
                document.getElementById("disPlayCard").innerHTML = "";
            });
            console.log(cardArray);
            cardArray.forEach(function(element, index) {
                document.getElementById("disPlayCard").innerHTML += `

            
                <div class="col col-sm-12 col-md-3">
                    <div class="card">
                        <img src="${element.image}" class="card-img-top" alt="..." height="300px" width="300px" >
                        <div class="card-body">
                            <h5 class="card-title">${element.restaurantName}</h5>
                            <p class="card-text">${element.dish}</p>
                            <p class="card-text">${element.price}</p>
                            <p class="card-text">${element.Description}</p>
                            <a href="#" class='btn btn-primary'> Order  </a>
                        </div>
                    </div>
                </div>
        

            `;

            })

        })
}


var navbar = document.querySelector(".navbar");
console.log(navbar);
window.onscroll = function() {
    if (document.documentElement.scrollTop > 20) {
        navbar.classList.add("scrool")

    } else {
        navbar.classList.remove("scrool")

    }
}