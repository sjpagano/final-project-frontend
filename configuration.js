const mode = 1;

const host_local = "http://localhost:8080";
const host_remote = "https://flower-latest.onrender.com";

function getHost() {
    return (mode == 0) ? host_local : host_remote;
}

function isLoggedIn() {
    if(localStorage.getItem("token")) {
        return true;
    } else {
        return false;
    }
}

function getTheToken() {
    return localStorage.getItem("token");
} 

function saveTheToken(token) {
     localStorage.setItem("token", token);
} 

function removeTheToken() {
    localStorage.removeItem("token");
} 

let configuration = {
    isLoggedIn: () => isLoggedIn(), 
    host: () => getHost(), 
    token: () => getTheToken()    
};

function saveCart(id) {
    localStorage.setItem("bouqet", id);
}

function removeCart() {
    localStorage.removeItem("bouqet");
}

function getCart() {
    return localStorage.getItem("bouqet");
}

function saveDateandPrice(date, price) {
    localStorage.setItem("date", date);
    localStorage.setItem("price", price);
}

function removeDateandPrice() {
    localStorage.removeItem("date");
    localStorage.removeItem("price");
}

function getDate() {
    return localStorage.getItem("date");
}

function getPrice() {
    return localStorage.getItem("price");
}

function isPurchasing() {
    localStorage.setItem("purchasing", true);
}

function notPurchasing() {
    localStorage.removeItem("purchasing");
}

function getPurchasing() {
    if(localStorage.getItem("purchasing")) {
        return true;
    } else {
        return false;
    }
}

function isTracking() {
    localStorage.setItem("tracking", true);
}

function notTracking() {
    localStorage.removeItem("tracking");
}

function getTracking() {
    if(localStorage.getItem("tracking")) {
        return true;
    } else {
        return false;
    }
}

function setRecipient(recipient) {
    localStorage.setItem("recipient", JSON.stringify(recipient));
}

function removeRecipient() {
    localStorage.removeItem("recipient");
}

function getRecipient() {
    var recipientString = localStorage.getItem("recipient");
    return JSON.parse(recipientString);
}

function setLocation(location) {
    localStorage.setItem("location", JSON.stringify(location));
}

function removeLocation() {
    localStorage.removeItem("location");
}

function getLocation() {
    var locationString = localStorage.getItem("location");
    return JSON.parse(locationString);
}

function clearStorage() {
    removeCart();
    removeDateandPrice();
    notPurchasing();
    removeRecipient();
    removeLocation();
    notTracking();
}


async function signup() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("pass").value;
    let customer = {email:email,password:password};
    let request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
      };
      try {
        let response = await fetch(getHost() + "/signup", request);
        if(response.status == 200) {  
            alert("The registration was successful!")
            location.href = "login.html";

        } else {
            console.log(`response status:${response.status}`);            
            alert("Something went wrong!");
        }
      }
      catch(error) {
        console.log(error);        
        alert("Something went wrong!");
      }    
}



async function login() {    
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let customer = {email: email, password: password}
    let request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(customer)
      };
      try {
        let response = await fetch(getHost() + "/signin", request);
        if(response.status == 200) {  
            alert("The login was successful!");
            const token = await response.text();
            saveTheToken(token);
            if (getPurchasing()) {
                location.href="deliveryInfo.html";
            } else if (getTracking()) {location.href="trackOrder.html";}
            else {
                location.href="index.html";
            }          
        } else {
            console.log(`response status:${response.status}`);   
            removeTheToken();         
            alert("Something went wrong!");
        }
      }
      catch(error) {
        console.log(error); 
        removeTheToken();       
        alert("Something went wrong!");
      }    
}