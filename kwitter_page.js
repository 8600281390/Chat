//YOUR FIREBASE LINKS
const firebaseConfig = {
      apiKey: "AIzaSyBZnsL1cTBSUoS1eIUvJdix4_gmd0tD6ng",
      authDomain: "kwitter-app-b0c79.firebaseapp.com",
      databaseURL: "https://kwitter-app-b0c79-default-rtdb.firebaseio.com",
      projectId: "kwitter-app-b0c79",
      storageBucket: "kwitter-app-b0c79.appspot.com",
      messagingSenderId: "890799003837",
      appId: "1:890799003837:web:59029727d1dd1ca2ab3fd4"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

user_name=localStorage.getItem("user_name");
room_name=localStorage.getItem("room_name");

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
name = message_data["name"];
message = message_data["msg"];
likes = message_data["like"];

name_tag = "<h4>"+name+"<img class='user_tick' src='tick.png'></h4>";
message_tag = "<h4 class='message_h4'>"+message+"</h4>";
like_tag = "<button class='btn btn-warning' id='"+firebase_message_id+"' value="+likes+" onclick='updateLikes(this.id)'>";
span = "<span class='glyphicon glyphicon-thumbs-up'> Like :"+likes+"</span></button><hr>";
row = name_tag+message_tag+like_tag+span;
document.getElementById("output").innerHTML+=row;
//End code
      } });  }); }
getData();

function send(){
      msg=document.getElementById("msg").value;

  firebase.database().ref(room_name).push({
        name : user_name,
        msg : msg,
        like :0  
      })    
}

function updateLikes(id){
current_like = document.getElementById(id).value;
current_like = Number(current_like)+1;

firebase.database().ref(room_name).child(id).update({
  like : current_like,
})
}