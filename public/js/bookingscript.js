var flights =[];

// window.onload=getflights();
function display(src,des) {
    console.log("Display is called!!!");

    let content=`<div class='table'> <div class='user-header'>
    <span class='headcell'>Flight Number</span> 
    <span class='headcell'>Source</span>
     <span class='headcell'>Destination</span> 
     <span class='headcell'>Arrival Time</span> 
     <span class='headcell'>Departure Time</span>
     <span class='headcell'>Travel Date</span>
     <span class='headcell'>Price</span>
     <span class='headcell'>Booking</span>
     </div>`;

    //  var content = `<h3>Flights Available</h3><table border>
    //  <tr>
    //     <th border>flight_number</th>
    //      <th border >Source</th>
    //      <th border >Destination</th>
    //      <th border >Arrival Time</th>
    //      <th border>Departure_Time</th>
    //      <th border>travel_date</th>
    //      <th border >cost</th>
    //  </tr>`;
 

 console.log("SOURCEEE",src);
 console.log("SOURCEEE",des);


     for (let i in flights) {
        
         var s=flights[i].source;
         var d=flights[i].destination;
         if(s===src && d===des){        
         content+=`<div class='user'>
         <span class='cell'><i class="bi bi-airplane"></i>&nbsp;&nbsp;${flights[i].flight_number}  </span> 
         <span class='cell'>${flights[i].source}</span> 
         <span class='cell'>${flights[i].destination}</span>
         <span class='cell'>${flights[i].arrival_Time}</span> 
         <span class='cell'>${flights[i].departure_Time}</span>
         <span class='cell'>${flights[i].travel_Date}</span>
         <span class='cell'>${flights[i].cost}</span>
         <button class="btn" onclick='addCustomer("${flights[i]._id}")'>BOOK</button>

          </div>`;
        //          content += `
        //  <tr><td>${flights[i].flight_number}</td>
        //   <td>${flights[i].source}</td>
        //   <td>${flights[i].destination}</td>
        //   <td>${flights[i].arrival_Time}</td>
        //   <td>${flights[i].departure_Time}</td>
        //   <td>${flights[i].travel_Date}</td>
        //   <td>${flights[i].cost}</td>
        //   <td>
        //   <button onclick='addCustomer("${flights[i]._id}")'>BOOK</button>
        //   <td></tr>`;
        }
     }
     event.preventDefault();
     document.getElementById('srchbtn').innerHTML = content+"</div></div>";
     
 }

 function getflights() {

    console.log("getFlights called!!!");

    var src=document.getElementById('source').value;
    var des=document.getElementById('destination').value;
    console.log("src,des:",src,des);
    var req1 = new XMLHttpRequest();
    const url="http://localhost:5000/searchflights";
    // ?source="+src+"&destination="+des;
    req1.open("GET",url , true);
    req1.send();

    req1.onreadystatechange = function () {
        if (req1.readyState === 4) {
            if (req1.status === 200) {
                event.preventDefault();
                flights = JSON.parse(req1.responseText);
                console.log(flights);
                display(src,des);
                //event.preventDefault();
            }
        }
    }
    event.preventDefault();
}

let flight_id=""

function addCustomer(id){
   let form= document.getElementById('book');
   form.style.display='block';
   flight_id=id;
// let display=""
    for(keys in flights){
        if(flights[keys]._id=== id){
            console.log("source:::",flights[keys].source)
            document.getElementById('flightNumber').value=flights[keys].flight_number;
            document.getElementById('txtsource').value=flights[keys].source;
          //  document.getElementById('source').value=source;
             document.getElementById('txtdestination').value=flights[keys].destination;
           // document.getElementById('destination').value=destination;
            document.getElementById('arrivalTime').value=flights[keys].arrival_Time;
            document.getElementById('departureTime').value=flights[keys].departure_Time;
           // document.getElementById('travelDate').value=flights[keys].travel_Date;
            document.getElementById('price').value=flights[keys].cost;



        }
    }

}
// var  flight_num='';
// function confirm(){
//     let name=document.getElementById('txtName').value;
//     let age=document.getElementById('txtAge').value;
//     let phone=document.getElementById('txtPhone').value;
//     let Aadhar=document.getElementById('txtAadhar').value;
//     let passport=document.getElementById('txtPassport').value;
//     let email= document.getElementById('txtEmail').value;
//      flight_num=document.getElementById('flightNumber').value;
//     // let source=document.getElementById('source').value
//     // let destination=document.getElementById('destination').value
//     // let arrivalT=document.getElementById('arrivalTime').value
//     // let departureT=document.getElementById('departureTime').value
//     // let price=document.getElementById('price').value

//     var req = new XMLHttpRequest();
// 	req.open('POST', 'http://localhost:5000/customer', true);
// 	req.setRequestHeader('Content-type', 'application/json');
// 	//let users=JSON.stringify(newObj)
// 	req.send(JSON.stringify({
//         flight_number:flight_num,
// 		customer_name:name,
// 		customer_age: age,
// 		phone: phone,
// 		aadhar_id: Aadhar,
// 		passport_number: passport,
//         email:email
// 	}));
// 	req.onreadystatechange = function () {
// 		if (req.readyState === 4) {
// 			if (req.status === 201) {
// 				// getdata();
//                 alert("Your ticket Booked Successfully");

//                 showTicket(flight_num);
//                 console.log("Added Successfully")
// 				event.preventDefault();

// 				//document.getElementById('addUserForm').reset();


// 			} else {
// 				console.log("Faliedddd");
// 			}
// 		}
// 	}
// }

// function showTicket(flight_num){
//     var customers;

//     var disp="";
//     var req = new XMLHttpRequest();
//     url="http://localhost:5000/searchCustomers?flight_number="+flight_num
//     req.open("GET", url, true);
//     req.send();
//     req.onreadystatechange = function () {
//         if (req.readyState === 4) {
//             if (req.status === 200) {
//                 customers = JSON.parse(req.responseText);
//                 console.log("Customer Details",customers)
//                 alert("get Customer details");
//                 disp+=`  <div class="head">
//                 <span style="padding-right: 40%;"> A2P FLIGHTS</span>
//                 <span style="text-align: center;"> Boarding Pass</span>
//             </div>
//             <div class="row1">
//                 <div class="row11">
//                <b><p>Name Of Passenger</p></b>
//                 <span>${customers.customer_name}</span>
//               </div>
//               <div class="row11">
//                 <b><p>Flight</p></b>
//                 <span>${flights.flight_number}</span>
//               </div>
//               <div class="row11">
//                 <b><p>Arrival Time</p></b>
//                 <span></span>
//               </div>
//               <div class="row11">
//                 <b><p>Departure Time</p></b>
//                 <span></span>
//               </div>
//             </div>
//            `;
//            document.getElementById('shwTicket').innerHTML=disp;
//                 event.preventDefault();
//             }
//         }
//     }

   
    
    
// }































// //window.onload = searchFlight;
// let fligts="";
// function display(){

//     let content="";

//     var req = new XMLHttpRequest();

// 	req.open('GET', 'http://localhost:5000/searchflights/651ef8539108261ddbdd812b', true);
// 	// req.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
// 	req.send();
// 	req.onreadystatechange = function () {
// 		if (req.readyState == 4) {
// 			if (req.status == 200) {
// 				flights=JSON.parse(req.responseText);
//                 content+=`<span>`
                   

// 				}
// 				document.getElementById('root').innerHTML = disp;
// 				event.preventDefault();

// 			}
// 		}
// 	}
// }



   










// function searchFlight(){

//     console.log("search Flight is called!!")
//     var src= document.getElementById('src').value;
//     var dest= document.getElementById('dest').value;
//     var travelDate= document.getElementById('dt').value;
//     console.log(travelDate);
//     //var url = `http://localhost:5000/searchflights?source=${src}&destination=${dest}`;
//     var url = "http://localhost:5000/searchflights?source=" + src + "&destination=" + dest;
// //    var url = "http://localhost:5000/getflightDetails/"+src+"/"+dest+"/"+travelDate    &travel_Date=${travelDate};
//     var disp ="Hai";
// 	var req = new XMLHttpRequest();
//     req.open('GET',url,true);
//     req.send();
// 	req.onreadystatechange = function () {
// 		if (req.readyState == 4) {
// 			if (req.status == 200) {
				
//                 disp+=this.responseText

//             }
// 				document.getElementById('root').innerHTML = disp;
// 				event.preventDefault();

//         }
//     }
       
       
// }

