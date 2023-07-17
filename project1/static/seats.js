document.body.onload=async()=>{
    let basket = await(await fetch('/static/basket.json')).json();
    let seats = await(await fetch('/static/seatsOut.json')).json();
    let geography = await(await fetch('/static/geography.json')).json();

    //Calculate the total fare frm the basket
    let numberPassengers = basket.Passengers.length;
    let outfare = basket.JourneyPairs[0].OutboundSlot.Flight.FlightFares[0].Prices.Adult.Price;
    let retfare = basket.JourneyPairs[0].ReturnSlot.Flight.FlightFares[0].Prices.Adult.Price;
    let total = ((outfare+retfare) * numberPassengers);
    document.getElementById('basketTotal').innerText = total.toFixed(2);
    

    //Find outbound flight details
    let departAirport = basket.JourneyPairs[0].OutboundSlot.Flight.DepartureIata;
    let arriveAirport = basket.JourneyPairs[0].OutboundSlot.Flight.ArrivalIata;

    //Create list of passengers
    for(let i=0;i<basket.Passengers.length;i++){
        let pd = document.createElement('div');
        pd.innerHTML = `
        
        <img src="static/passengers-adult.png" id="icon">
        Adult ${i+1} `;
        pd.id = `passenger_${i}`;
        let seat = document.createElement('span');
        seat.innerHTML = 'none';
        seat.id = `passengerSeat_${i}`;
        pd.append(seat);
        document.getElementById('passengerList').append(pd);
        
        pd.onclick = ()=>{
            document.querySelector('.currentPassenger').classList.remove('currentPassenger');
            pd.classList.add('currentPassenger');  
        }
    }
    document.getElementById('passenger_0').classList.add('currentPassenger');
    

    // Airports long form
    for (let i=0;i<geography.Airports.length;i++){
        if(geography.Airports[i].Iata == departAirport){
            var longdeport = geography.Airports[i].Name;
        }
        if(geography.Airports[i].Iata == arriveAirport){
            var longarrport = geography.Airports[i].Name;
        }
   }

   // date format
   const datedepart = new Date(basket.JourneyPairs[0].OutboundSlot.Flight.LocalDepartureTime);
   const datearrival = new Date(basket.JourneyPairs[0].OutboundSlot.Flight.LocalArrivalTime);
   const datedepart2 = new Date(basket.JourneyPairs[0].ReturnSlot.Flight.LocalDepartureTime);
   const datearrival2 = new Date(basket.JourneyPairs[0].ReturnSlot.Flight.LocalArrivalTime);

   
    document.getElementById('outbound').innerHTML = `
    <h3>${longdeport} to ${longarrport}</h3>
    <div class="plane2">${basket.JourneyPairs[0].OutboundSlot.Flight.CarrierCode}${basket.JourneyPairs[0].OutboundSlot.Flight.FlightNumber}&emsp;&emsp;
    <img src="static/Plane-Grey.png" class="plane" >
    <div class="line"></div>
    </div>  
    <div class="plane2">Departure: ${datedepart.toDateString()} | ${datedepart.toLocaleTimeString()}</div>
    <div class="plane2">Arrival: ${datearrival.toLocaleTimeString()}</div>
    <h4>Your fares</h4>
    <div class="plane2"> Adult
    <span class="amount">${numberPassengers} x £${outfare}</span>
    </div>
    <h4>Your flights options</h4>
    <div id="seatno1"></div>
    <div id="seatno2"></div>
    <h4>Your Cabin bag</h4>
    <div class="plane2"> Small cabin bag
    <span class="amount">${numberPassengers} x Included</span>
    </div>
    `;

    document.getElementById('inbound').innerHTML = `
    <h3>${longarrport} to ${longdeport}</h3>
    <div class="plane2">${basket.JourneyPairs[0].ReturnSlot.Flight.CarrierCode}${basket.JourneyPairs[0].ReturnSlot.Flight.FlightNumber}&emsp;&emsp;
    <img src="static/Plane-Grey.png" class="plane" >
    <div class="line"></div>
    </div> 
    <div class="plane2">Departure: ${datedepart2.toDateString()} | ${datedepart2.toLocaleTimeString()}</div>
    <div class="plane2">Arrival: ${datearrival2.toLocaleTimeString()}</div>
    <h4>Your fares</h4>
    <div class="plane2"> Adult
    <span class="amount">${numberPassengers} x £${retfare}</span>
    </div>
    <h4>Your flights options</h4>
    <h4>Your Cabin bag</h4>
    <div class="plane2"> Small cabin bag
    <span class="amount">${numberPassengers} x Included</span>
    `;
    console.log(basket);
    console.log(seats);

    document.getElementById('room1').innerHTML=`
    <fieldset>
    <legend>${seats.Rows[0].Blocks[0].Seats[0].PriceBand} £${seats.Rows[0].Blocks[0].Seats[0].Price}</legend>
    <div class="room1data">
        <div class="leftbag">
        <img src="static/orange-bag.png" id="bagicon">
        </div>
        <div class ="rightword">
            
            <li><img src="static/GreenTickIcon.png" id="tickicon">
            <span>1 small under seat cabin bag</span></li>
            <li><img src="static/GreenTickIcon.png" id="tickicon">
            <span>1 large cabin bag</span></li>
            <li><img src="static/GreenTickIcon.png" id="tickicon">
            <span>Speedy Boarding</span></li>
            <li><img src="static/GreenTickIcon.png" id="tickicon">
            <span>Dedicated Bag Drop</span></li>
            
        </div>
    </div>
    </fieldset>
    `;
    document.getElementById('room2').innerHTML=`
    <fieldset>
    <legend>${seats.Rows[1].Blocks[0].Seats[0].PriceBand} £${seats.Rows[1].Blocks[0].Seats[0].Price}</legend>
    <div class="room1data">
        <div class="leftbag">
        <img src="static/orange-bag.png" id="bagicon">
        </div>
        <div class ="rightword">
            
                <li><img src="static/GreenTickIcon.png" id="tickicon">
                <span>1 small under seat cabin bag</span></li>
                <li><img src="static/GreenTickIcon.png" id="tickicon">
                <span>1 large cabin bag</span></li>
                <li><img src="static/GreenTickIcon.png" id="tickicon">
                <span>Speedy Boarding</span></li>
                <li><img src="static/GreenTickIcon.png" id="tickicon">
                <span>Dedicated Bag Drop</span></li>
            
        </div>
    </div>
    </fieldset>
    `;
    document.getElementById('room3').innerHTML=`
    <fieldset>
    <legend>${seats.Rows[3].Blocks[0].Seats[0].PriceBand} £${seats.Rows[3].Blocks[0].Seats[0].Price}</legend>
    <div class="room1data">
        <div class="leftbag">
        <img src="static/orange-bag.png" id="bagicon1">
        </div>
        <div class ="rightword">
            
                <li><img src="static/GreenTickIcon.png" id="tickicon">
                <span>1 small under seat cabin bag</span></li>
                <li><img src="static/GreenTickIcon.png" id="tickicon">
                <span>Choose where you want to sit, window, middle or aisle</span></li>
            
        </div>
    </div>
    </fieldset>
    `;
    document.getElementById('room4').innerHTML=`
    <fieldset>
    <legend>${seats.Rows[9].Blocks[0].Seats[0].PriceBand} £${seats.Rows[9].Blocks[0].Seats[0].Price}</legend>
    <div class="room1data">
        <div class="leftbag">
        <img src="static/orange-bag.png" id="bagicon">
        </div>
        <div class ="rightword">
            
                <li><img src="static/GreenTickIcon.png" id="tickicon">
                <span>1 small under seat cabin bag</span></li>
                <li><img src="static/GreenTickIcon.png" id="tickicon">
                <span>1 large cabin bag</span></li>
                <li><img src="static/GreenTickIcon.png" id="tickicon">
                <span>Speedy Boarding</span></li>
                <li><img src="static/GreenTickIcon.png" id="tickicon">
                <span>Dedicated Bag Drop</span></li>
            
        </div>
    </div>
    </fieldset>
    `;
    document.getElementById('room5').innerHTML=`
    <fieldset>
    <legend>${seats.Rows[11].Blocks[0].Seats[0].PriceBand} £${seats.Rows[11].Blocks[0].Seats[0].Price}</legend>
    <div class="room1data">
        <div class="leftbag">
        <img src="static/orange-bag.png" id="bagicon1">
        </div>
        <div class ="rightword">
            
            <li><img src="static/GreenTickIcon.png" id="tickicon">
            <span>1 small under seat cabin bag</span></li>
            <li><img src="static/GreenTickIcon.png" id="tickicon">
            <span>Choose where you want to sit, window, middle or aisle</span></li>
            
        </div>
    </div>
    </fieldset>
    `;

    document.getElementById("skip").innerHTML=`
    <a herf="#" id="skiplink1">Skip seats</a>
    <a herf="#" id="skiplink2">Continue</a>
    `;
    document.getElementById('anotherone').innerHTML=`
    <div id="anotheronetwo">Where Would you like to sit?
    <a herf="#" id="skiplink3">Skip seats</a>
    <a herf="#" id="skiplink4">Continue</a>
    
    </div>
    <div id="anotheronethree">${departAirport} to ${arriveAirport} , ${datedepart.toDateString()}
    </div>
    
    `;
    
   document.getElementById('pricebd').onclick = ()=>{
        document.getElementById('overlay').style.display = 'inline';
   }
    for(let r=0;r<seats.Rows.length;r++){
        for(let b=0;b<seats.Rows[r].Blocks.length;b++){
            for(let s=0; s < seats.Rows[r].Blocks[b].Seats.length;s++){
                let seat_id = `${seats.Rows[r].Blocks[b].Seats[s].SeatNumber}`;
                let seat_div = document.getElementById(seat_id);
                if (seat_div){
                    if (seats.Rows[r].Blocks[b].Seats[s].IsAvailable){
                        seat_div.classList.add('available');
                    }else{
                        seat_div.classList.add('unavailable');
                    }
                    seat_div.onclick = ()=>{
                        clickOnSeat(seat_div)
                        let p0 = document.getElementById('passengerSeat_0').innerText;
                        if(seats.Rows[r].Blocks[b].Seats[s].SeatNumber == p0){
                            document.getElementById('seatno1').innerHTML=`
                            ${seats.Rows[r].Blocks[b].Seats[s].PriceBand}&ensp;${p0}<span id="amount1">${seats.Rows[r].Blocks[b].Seats[s].Price}</span>
                            `;
                            
                        }
                        let p1 = document.getElementById('passengerSeat_1').innerText;
                        if(seats.Rows[r].Blocks[b].Seats[s].SeatNumber == p1){
                            document.getElementById('seatno2').innerHTML=`
                            ${seats.Rows[r].Blocks[b].Seats[s].PriceBand}&ensp;${p1}<span id="amount2">${seats.Rows[r].Blocks[b].Seats[s].Price}</span>
                            `;
                            
                            
                        } 
                        if(p0 !== "none"){
                            if(p1 !== "none"){
                                document.getElementById('skiplink1').style.display='none';
                                document.getElementById('skiplink2').style.display='inline-block';
                                document.getElementById('skiplink3').style.display='none';
                                document.getElementById('skiplink4').style.display='inline-block';
                            }

                        } 
                        let bt = document.getElementById('basketTotal').innerText;
                        let price1 = document.getElementById('amount1').innerText;
                        let price2 = document.getElementById('amount2').innerText;
                        document.getElementById('basketTotal').innerHTML= (parseFloat(bt) + parseFloat(price1) + parseFloat(price2)).toFixed(2)
                        ;
                        
                        let tax = basket.JourneyPairs[0].ReturnSlot.Flight.FlightTaxes.TaxAmount + basket.JourneyPairs[0].OutboundSlot.Flight.FlightTaxes.TaxAmount;
                        let fare = total.toFixed(2) - tax;
                        let seatprice = parseFloat(price1) + parseFloat(price2);
                        let finaltotal = tax + fare + seatprice;
                        
                        document.getElementById('overlay').innerHTML=`
                            <h4>Price Breakdown</h4>
                            <div class="plane2">Total air fare(s) <span class="amount3">£${fare}</span></div>
                            <div class="plane2">Goverment taxes <span class="amount3">£${tax}</span></div>
                            <div class="plane2">Seats <span class="amount3">£${seatprice}</span></div>
                            <div class="plane2">Basket total <span class="amount3">£${finaltotal}</span></div>
                        `;
                    }
                }
            }
        }
    }
}


function clickOnSeat(seat_div){
        if (seat_div.classList.contains('unavailable')){
            alert('That seat is taken');
             return;
        }
        if (seat_div.classList.contains('occupied')){
            alert('You cannot book the same seat twice');
            return;
        }
        let passenger = document.querySelector('.currentPassenger span').innerText;
        let prevSeat = document.getElementById(passenger);
        if (prevSeat){
            prevSeat.classList.remove('occupied');
        }
        seat_div.classList.add('occupied');
        document.querySelector('.currentPassenger span').innerHTML = seat_div.id;
        
    }
   
    

