let prestatus = {
	"Available": "one",
	"Under Manitenence": "two",
	"Not Available": "three"
};

window.onload = display;

function visibileUserForm(){
	form =document.getElementById('addForm');
	if (form.style.display === 'block') {
    form.style.display = 'none';
  } else {
    form.style.display = 'block';
  }
	
}

// function login(){
//     var user = document.getElementById('username').value;
//     var pass = document.getElementById('password').value;
//     var lhtt = new XMLHttpRequest();
//     lhtt.onreadystatechange = function(){
//         if(this.readyState==4){
//             if(this.status==200){
//                 var res = this.responseText;
//                 console.log(res);
//                 if(res=="admin"){
//                     display();
//                 }
//             }
//         }
//     }
//     lhtt.open("POST","http://localhost:5000/login",true)
//     lhtt.setRequestHeader("Content-type","application/json")
//     lhtt.send(JSON.stringify({username:user,password:pass
//     }))
// }

function addFlight(){
    var cnumber = document.getElementById('flightnum').value;
    var capacity = document.getElementById('capacity').value;
    var cstatus = document.getElementById('presence').value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState==4){
            if(this.status==200){
                display();
            }
        }
    }
    xhttp.open("POST","http://localhost:5000/flight",true)
    xhttp.setRequestHeader("Content-type","application/json")
    xhttp.send(JSON.stringify({flight_number:cnumber,seating_capacity:capacity,status:cstatus
    }))
    alert("Flight Added Successfully!!!")
    document.getElementById('addForm').reset();
    form.style.display = 'none';
    event.preventDefault();
}
var flight_json ="";
function display(){
    var content ="<div class='table'><div class='user-header'><span class='headcell'>FLIGHT NUMBER</span><span class='headcell'>CAPACITY</span><span class='headcell'>STATUS</span></div>";
    var htt = new XMLHttpRequest();
    htt.onreadystatechange = function(){
        if(this.readyState==4){
            if(this.status==200){
                res = this.responseText
                flight_json=JSON.parse(res)
                for(let u in flight_json){
                    var usr = `<div class='user'><span class='cell'><i class="bi bi-airplane"></i>${flight_json[u].flight_number}</span><span class='cell'>${flight_json[u].seating_capacity}</span>&nbsp;&nbsp;
                    <span class='cell'>${flight_json[u].status}</span>
                    <button class="btn" onclick="editFlight('${flight_json[u]._id}')">Update</button>&nbsp;
                    <button class="btn" onclick="deleteFlight('${flight_json[u]._id}')">Delete</button><p/><br></div>`
                    content=content+usr
                }
                var element = document.getElementById('root')
                element.innerHTML = content+"</div>";
            }
        }
    }
    htt.open("GET","http://localhost:5000/flight",true)
    htt.send();
}

let FLIGHTID;
var upform;
function editFlight(flId){
    upform =document.getElementById('updateForm');
	if (upform.style.display === 'block') {
    upform.style.display = 'none';
  } else {
    upform.style.display = 'block';
  }
  FLIGHTID=flId;
  var ind = flight_json.findIndex(e=> e._id===flId)
  console.log(ind);
  	document.getElementById('upflightnum').value = flight_json[ind].flight_number;
	document.getElementById('upcapacity').value= flight_json[ind].seating_capacity;
    document.getElementById('uppresence').value=flight_json[ind].status;
}

function updateFlight(){
	var upnumber = document.getElementById('upflightnum').value;
    var upcapacity = document.getElementById('upcapacity').value;
    var upstatus = document.getElementById('uppresence').value;
	if(upnumber==='' || upcapacity===''){
		alert("Provide All the Details!!!")
		event.preventDefault();
		return;
    }
    xhttp = new XMLHttpRequest();
 
    xhttp.onreadystatechange =function () {
        if(this.readyState == 4){
            if(this.status == 200){
                display();
            }
        }
    };
    xhttp.open("PUT","http://localhost:5000/flight/"+FLIGHTID,true)
    xhttp.setRequestHeader("Content-type","application/json")
    xhttp.send(JSON.stringify({
		flight_number: upnumber,
		seating_capacity:upcapacity,
        status:upstatus
	}));
	event.preventDefault();
	alert("Flight Updated Successfully!!!")
    document.getElementById('updateForm').reset();
    upform.style.display = 'none';
}

function deleteFlight(dltflt) {
	var xxhttp = new XMLHttpRequest();
	xxhttp.open("DELETE","http://localhost:5000/flight/"+dltflt,true)
    xxhttp.send();
        xxhttp.onreadystatechange =function () {
            if(this.readyState == 4){
                if(this.status == 200){
                    display();
                }
            }
        };  
}