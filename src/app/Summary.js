import { useSelector } from "react-redux";
import { allSeats } from "./seatsSlice";


function Summary(){

    const seats=useSelector(allSeats);

    return(
       <div className="container ml-5 mt-5">
           <h3>
               Twoja rezerwacja przebiegła pomyślnie!
           </h3>
           <p className="fs-3 mt-3">
               Wybrałeś miejsca:
           </p>
           <ul className="fs-3">

           {seats.map((row,i)=>
                 <div key={i+1000} >
                     {row.map((element,j)=>
                            (seats[i][j]!=null&&seats[i][j].selected)?
                            (<li key={i*15+j}>rząd {j}, miejsce {i} ({seats[i][j].id})</li>):null)
                            }
                </div>

            )}

           </ul>
           <h5 className="mt-5">
               Dziękujemy! W razie problemów prosimy o kontakt z działem administracji.
           </h5>
       </div> 
    );
}

export default Summary;