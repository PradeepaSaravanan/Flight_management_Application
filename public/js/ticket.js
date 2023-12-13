var flight_num = '';

function confirm() {
    let name = document.getElementById('txtName').value;
    let age = document.getElementById('txtAge').value;
    let phone = document.getElementById('txtPhone').value;
    let Aadhar = document.getElementById('txtAadhar').value;
    let passport = document.getElementById('txtPassport').value;
    let email = document.getElementById('txtEmail').value;
    flight_num = document.getElementById('flightNumber').value;
    // let source=document.getElementById('source').value
    // let destination=document.getElementById('destination').value
    // let arrivalT=document.getElementById('arrivalTime').value
    // let departureT=document.getElementById('departureTime').value
    // let price=document.getElementById('price').value

    var req = new XMLHttpRequest();
    req.open('POST', 'http://localhost:5000/customer', true);
    req.setRequestHeader('Content-type', 'application/json');
    //let users=JSON.stringify(newObj)
    // for(k in flights){
    //     if(flights[k].flight_number===flight_num){    
    //     sc = flights[k].seating_capacity;
    //     console.log(sc);
    //     }
    // }
    req.send(JSON.stringify({
        flight_number: flight_num,
        customer_name: name,
        customer_age: age,
        phone: phone,
        aadhar_id: Aadhar,
        passport_number: passport,
        email: email
    }));
    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            if (req.status === 201) {
                const user = JSON.parse(req.responseText);
                console.log("userrrrr::::", user);
                console.log("user id:::", user._id);
                alert("Your ticket Booked Successfully");

                showTicket(flight_num, user._id);
                console.log("Added Successfully")
                event.preventDefault();

                //document.getElementById('addUserForm').reset();


            } else {
                console.log("Faliedddd");
            }
        }
    }
}

function showTicket(flight_num, id) {
    
    var customers;

    var disp = "";
    var req = new XMLHttpRequest();
    url = "http://localhost:5000/searchCustomers?flight_number=" + flight_num + "&_id=" + id;
    req.open("GET", url, true);
    req.send();
    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            if (req.status === 200) {
                customers = JSON.parse(req.responseText);
                console.log("Customer Details", customers);
                console.log("Customer name::::", customers.customer_name);

      
                for(keys in flights){
                    if(flights[keys].flight_number===customers[0].flight_number){
                        

                        disp += `  <div class="head">
                        <i class="bi bi-passport"></i><span style="text-align: center;font-size:font-family: Georgia, 'Times New Roman', Times, serif;font-weight: bold;font-size: 20px;">&nbsp;&nbsp;
                         Boarding Pass</span>
                    </div>
                    <div class="row1">
                        <div class="row11">
                       <b><p>Name Of Passenger</p></b>
                        <span>${customers[0].customer_name}</span>
                      </div>
                      <div class="row11">
                        <b><p>Flight</p></b>
                        <span><i class="bi bi-airplane"></i>&nbsp;&nbsp;${flights[keys].flight_number}</span>
                      </div>
                      <div class="row11">
                        <b><p>Arrival Time</p></b>
                        <span>${flights[keys].arrival_Time}</span>
                      </div>
                      <div class="row11">
                        <b><p>Departure Time</p></b>
                        <span>${flights[keys].departure_Time}</span>
                      </div>
                    </div>
                    <div class="row1">
                    <div class="row11">
                        <b><p>Source</p></b>
                         <span>${flights[keys].source}</span>
                       </div>
                       <div class="row11">
                        <b><p>Destination</p></b>
                         <span>${flights[keys].destination}</span>
                       </div>
                       <div class="row11">
                        <b><p>Travel Date</p></b>
                         <span>${flights[keys].travel_Date}</span>
                       </div>
                       <div class="row11">
                        <b><p>Price</p></b>
                         <span>${flights[keys].cost}</span>
                       </div>
                </div>
                <span>
                        &nbsp; &nbsp; &nbsp; &nbsp;<button style="margin-left:300px" class="btn" type="submit" onclick='GeneratePdf()'>Save Ticket </button>
                &nbsp; &nbsp; &nbsp; &nbsp; <button class="btn" type="submit" onclick='deleteTicket("${id}")'>Cancel Ticket </button>
               </span>
    
                   `; 
                    }
                }
                document.getElementById('shwTicket').innerHTML = disp;
                event.preventDefault();
            }
        }
    }
}

function deleteTicket(id){
    var req = new XMLHttpRequest();
	var url = 'http://localhost:5000/customer/'+id;
	console.log("URL:::", url);
	req.open('DELETE', url, true);
	req.setRequestHeader('content-type', 'application/json');
	req.send();
	req.onreadystatechange = function () {
		if (req.readyState == 4) {
			if (req.status == 200) {
				// getdata();
                alert("Successfully cancelled the ticket")
			}
			else {
				console.log("Faliedddddddddddddd");
			}
		}
	}  
}

function GeneratePdf() {

  var element = document.getElementById('shwTicket');

  html2pdf(element);

}

