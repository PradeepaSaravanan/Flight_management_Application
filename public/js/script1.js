var routes = "";

window.onload=getflights;
function flightnumber(){
    var flightcont=" ";
    for(let f in routes){
        flightcont+=`
        <button class="btnf" onclick='updateroute("${routes[f]._id}")'><i class="bi bi-airplane"></i>&nbsp;${routes[f].flight_number}</button>&nbsp;&nbsp;&nbsp;`
    }
    document.getElementById('flightnumber').innerHTML = flightcont;
}
var rform =document.getElementById('addForm');
// window.onload=showroute;
// function showroute(){
//     var routedisplay=`<button onclick='display()'>Routes</button>`
//     document.getElementById('showroutes').innerHTML = routedisplay;
// }

function getflights(){
    console.log("getFlights called!!!");
    var req = new XMLHttpRequest();
    req.open("GET", "http://localhost:5000/routes", true);
    req.send();
    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            if (req.status === 200) {
                routes = JSON.parse(req.responseText);
                flightnumber();
                event.preventDefault();
            }
        }
    }

}


function display() {

    let disp =  document.getElementById("updateForm");
    disp.style.display='none';
    let updatedisp =  document.getElementById("updateflight");
    updatedisp.style.display='none';

   console.log("Display is called!!!");
    var content = `<div class='table'><div class='user-header'>
    <span class='headcell'>Flight</span>
        <span class='headcell'>Source</span>
        <span class='headcell'>Destination</span>
        <span class='headcell'>Arrival Time</span>
        <span class='headcell'>Departure_Time</span>
        <span class='headcell'>travel_date</span>
        <span class='headcell'>cost</span>
        <span class='cell'></span>
        <span class='cell'></span>
    </div>`;

    for (let rou in routes) {
        if(routes[rou].source===undefined){
            content +=""
        }else{
                content += `<div class='user'>
                <span class='cell'>${routes[rou].flight_number}</span>
                <span class='cell'>${routes[rou].source}</span>
                <span class='cell'>${routes[rou].destination}</span>
                <span class='cell'>${routes[rou].arrival_Time}</span>
                <span class='cell'>${routes[rou].departure_Time}</span>
                <span class='cell'>${routes[rou].travel_Date}</span>
                <span class='cell'>${routes[rou].cost}</span>
         <button class="btn" onclick='deleteroute("${routes[rou]._id}")'">Delete</button>&nbsp;
		 <button class="btn" onclick='updateflight("${routes[rou]._id}")'>Update</button>
        </div>
	 `
        }
    }
    event.preventDefault();
    document.getElementById('display').innerHTML = content+"</div>";
}

// window.onload=getroutes;
function getroutes() {
    console.log("getRoutes called!!!");
    var req = new XMLHttpRequest();
    req.open("GET", "http://localhost:5000/routes", true);
    req.send();
    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            if (req.status === 200) {
                routes = JSON.parse(req.responseText);
                display();
                event.preventDefault();
            }
        }
    }

}

function addroute() {


 let flightfrm =  document.getElementById("addform");
  flightfrm.style.display="block";

    console.log("Add route called!!!!")
    // var fn = document.getElementById("flight_number").value;
    // var sc = document.getElementById("seating_capacity").value;
    var sr = document.getElementById("source").value;
    var ds = document.getElementById("destination").value;
    var at = document.getElementById("arrival_time").value;
    var dt = document.getElementById("departure_time").value;
    var td = document.getElementById("travel_date").value;
    var cs = document.getElementById("cost").value;

    var req1 = new XMLHttpRequest();
    req1.open("POST", "http://localhost:5000/routes", true);
    req1.setRequestHeader('Content-type', 'application/json');
    req1.send(JSON.stringify({
        // flight_number:fn,
        // seating_capacity:sc,
        source: sr,
        destination: ds,
        arrival_Time: at,
        departure_Time: dt,
        travel_Date: td,
        cost: cs
    }));

    req1.onreadystatechange = function () {
        if (req1.readyState === 4) {
            if (req1.status === 200) {
                console.log("response from addd route");
                event.preventDefault();
                getroutes();
                display();
               
            }
        }
    }
    event.preventDefault();
}

var i;

function updateroute(id) {
     i = id;
    var frm = document.getElementById("updateForm");
    frm.style.display = 'block';
   console.log("update is called",id)

    for (let r in routes) {

        if (routes[r]._id===id) {

            var fn = routes[r].flight_number;
            var sc = routes[r].seating_capacity;
            var sr = routes[r].source;
            var ds = routes[r].destination;
            var at = routes[r].arrival_Time;
            var dt = routes[r].departure_Time;
            var td = routes[r].travel_Date;
            var cs = routes[r].cost;

            document.getElementById("flight_numberu").value = fn;
            document.getElementById("seating_capacityu").value = sc;
            if(sr===undefined){
            document.getElementById("sourceu").value = "";
            document.getElementById("destinationu").value = "";
            document.getElementById("arrival_timeu").value = "";
            document.getElementById("departure_timeu").value = "";
            document.getElementById("travel_dateu").value = "";
            document.getElementById("costu").value = "";
            }
            else{
            document.getElementById("sourceu").value = sr;
            document.getElementById("destinationu").value = ds;
            document.getElementById("arrival_timeu").value = at;
            document.getElementById("departure_timeu").value = dt;
            document.getElementById("travel_dateu").value = td;
            document.getElementById("costu").value = cs;
            }
        }
        event.preventDefault();
    }
}


function updateroutes() {

    var g = document.getElementById("flight_numberu").value;
    var h = document.getElementById("seating_capacityu").value;
    var a= document.getElementById("sourceu").value;
    var b= document.getElementById("destinationu").value;
    var c= document.getElementById("arrival_timeu").value;
    var d= document.getElementById("departure_timeu").value;
    var e= document.getElementById("travel_dateu").value;
    var f = document.getElementById("costu").value;


    var req2 = new XMLHttpRequest();
    req2.open("PUT","http://localhost:5000/routes/"+i, true);
    req2.setRequestHeader('Content-type', 'application/json');

    req2.send(JSON.stringify(
        {
            flight_number:g,
            seating_capacity:h,
            source:a,
            destination:b,
            arrival_Time:c,
            departure_Time:d,
            travel_Date:e,
            cost:f

        }
    ));

    req2.onreadystatechange = function () {
        if (req2.readyState == 4) {
            if (req2.status == 200) {
                alert("Route added successfully to flight..!!!")
                getroutes();
                // event.preventDefault();
            }
        }
    }
    // alert("Route added successfully to flight..!!!")
    event.preventDefault();
}


var fid;

function updateflight(id) {
     fid = id;
    var frm = document.getElementById("updateflight");
    frm.style.display = 'block';
   console.log("updateflight is called",id)

    for (let r in routes) {

        if (routes[r]._id===id) {

            var sr = routes[r].source;
            var ds = routes[r].destination;
            var at = routes[r].arrival_Time;
            var dt = routes[r].departure_Time;
            var td = routes[r].travel_Date;
            var cs = routes[r].cost;

            document.getElementById("sourceuf").value = sr;
            document.getElementById("destinationuf").value = ds;
            document.getElementById("arrival_timeuf").value = at;
            document.getElementById("departure_timeuf").value = dt;
            document.getElementById("travel_dateuf").value = td;
            document.getElementById("costuf").value = cs;

        }
        event.preventDefault();
    }
}


function updateflights() {

    
    var a= document.getElementById("sourceuf").value;
    var b= document.getElementById("destinationuf").value;
    var c= document.getElementById("arrival_timeuf").value;
    var d= document.getElementById("departure_timeuf").value;
    var e= document.getElementById("travel_dateuf").value;
    var f = document.getElementById("costuf").value;


    var req3 = new XMLHttpRequest();
    req3.open("PUT","http://localhost:5000/routes/"+fid, true);
    req3.setRequestHeader('Content-type', 'application/json');

    req3.send(JSON.stringify(
        {
            
            source:a,
            destination:b,
            arrival_Time:c,
            departure_Time:d,
            travel_Date:e,
            cost:f

        }
    ));

    req3.onreadystatechange = function () {
        if (req3.readyState == 4) {
            if (req3.status == 200) {
                alert("Route updated successfully to flight..!!!")
                getroutes();
                // event.preventDefault();
            }
        }
    }
    event.preventDefault();
}


/*delete*/
function deleteroute(id) {
    console.log(id);
    var req2 = new XMLHttpRequest();
    req2.open("DELETE", "http://localhost:5000/routes/"+id, true);
    //req2.setRequestHeader('Content-type', 'application/json');

    req2.send();

    req2.onreadystatechange = function () {
        if (req2.readyState == 4) {
            if (req2.status == 200) {
                getroutes();
            }
        }
    }

}



