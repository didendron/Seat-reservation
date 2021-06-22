

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {  useSelector } from "react-redux";
import './Board.css';
import {  allSeats, selectSeats } from "./seatsSlice";

function Board(props){

    
    const dispatch=useDispatch();
    const seats=useSelector(allSeats);
    
    const loadExampleSeats=()=>{
        for(let i=0;i<seats.length;i++){
            for(let j=0;j<seats[i].length;j++){
                if(seats[i][j]!=null&&seats[i][j].selected){
                const id=seats[i][j].cords.y*15+seats[i][j].cords.x;
                const element=document.getElementById(id);
                element.style.backgroundColor='orange';
            }
            }
        }
        
    }


    useEffect(()=>{
        loadExampleSeats();
    });

    

    const handleClick=(event,seat)=>{
        if(seat.reserved) return;

        if(!seat.selected){
            event.target.style.backgroundColor = "orange";
        }else{
            event.target.style.backgroundColor = "white";
        }
        dispatch(selectSeats(seat));
        
        
        
    }
    const handleSubmit=(event)=>{
        event.preventDefault();
        props.history.push("/summary")
    }

   

        return(
            <div className="mycontainer">
            {seats.map((row,i)=>
                 <div className="squares" key={i+1000}>
                     {row.map((element,j)=>
                            (seats[i][j]!=null)?
                            (<div className={seats[i][j].reserved?"blackSquare":"square"} 
                            key={i*15+j} id={i*15+j} onClick={(e)=>handleClick(e,seats[i][j])}></div>)
                            : (<div className="hiddenSquare" key={i*15+j} ></div>)
                            )}

                </div>

            )}
            <div className="row">
                
                    <div className="col-sm-1"><div className="square"></div></div>
                    <div className="col-sm-2 d-flex align-items-center">Miejsca dostępne</div>
                    <div className="col-sm-1"><div className="blackSquare"></div></div>
                    <div className="col-sm-3 d-flex align-items-center ">Miejsca zarezerwowane</div>
                    <div className="col-sm-1"><div className="orangeSquare"></div></div>
                    <div className="col-sm d-flex align-items-center ">Twój wybór</div>
                    <div className="col-sm d-flex align-items-center">
                        <button type="submit" className="btn btn-secondary btn-lg "
                        onClick={(e)=>handleSubmit(e)} >Rezerwuj</button>
                    </div>
                
            </div>
            </div>
           
           
        );
    

}

export default Board;