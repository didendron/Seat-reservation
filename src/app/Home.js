import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { numberOfSelectedSeats,isRowOfSeats,allSeats,
    changeNumberOfSeats, changeStatusOfSeats, selectSeats, clearSelection } from "./seatsSlice";


function Home(props){

    const dispatch=useDispatch();
    const numOfSelectedSeats=useSelector(numberOfSelectedSeats);
    const rowOfSeats=useSelector(isRowOfSeats);
    const seats=useSelector(allSeats);

    useEffect(()=>{
        dispatch(clearSelection());
      },[dispatch]);

    const handleSubmit=(event)=>{
        event.preventDefault();
        chooseExampleSeats();
        props.history.push("/board");
    }

    const chooseExampleSeats=()=>{
        var array=[]
        if(rowOfSeats){
            for(let i=0;i<15-numOfSelectedSeats;i++){
                for(let j=0;j<10-numOfSelectedSeats;j++){
                    for(let k=0;k<numOfSelectedSeats;k++){
                        if(seats[i+k][j]!=null&&!seats[i+k][j].reserved){
                            array.push(seats[i+k][j])   
                        }  
                    }
                    if(array.length===Number(numOfSelectedSeats)){
                        saveSelectedSeats(array);
                        return;
                    }else{
                        array=[]
                    }
                    for(let k=0;k<numOfSelectedSeats;k++){
                        if(seats[i][j+k]!=null&&!seats[i][j+k].reserved){
                            array.push(seats[i][j+k])
                        }  
                    }
                    if(array.length===Number(numOfSelectedSeats)){
                        saveSelectedSeats(array);
                        return;
                    }else{
                        array=[]
                    }
                }
            }
        }
        else{
            for(let i=0;i<15;i++){
                for(let j=0;j<10;j++){
                    if(seats[i][j]!=null&&!seats[i][j].reserved){
                        array.push(seats[i][j])   
                    }  
                    if(array.length===Number(numOfSelectedSeats)){
                        saveSelectedSeats(array);
                        return;
                    }

                }
            }

        }
    }
    const saveSelectedSeats=(array)=>{
        array.forEach(element => {
            dispatch(selectSeats(element))
        });
    }

    const handleNumberChange=(event)=>{
        dispatch(changeNumberOfSeats(event.target.value))
        
    }

    const handleCheckboxChange=(event)=>{
        dispatch(changeStatusOfSeats())
        
    }

        return(
            <div className="container">
            <div className="row justify-content-around">
            <div className="col-sm-3 " >
          
            
            <form className="col mt-5 ">
                <div className="form-group row">
                    <label htmlFor="placesNumber" className=" col col-form-label" >Liczba miejsc:</label>
                    <div className="col " >
                        <input type="text" className="form-control" id="placesNumber" onChange={(e)=>handleNumberChange(e)}/>
                    </div>
                </div>
                <div className="checkbox mt-4 col">
                    <label>
                        <input type="checkbox" onChange={(e)=>handleCheckboxChange(e)}/> Czy miejsca mają być obok siebie?
                    </label>
                </div>

                <div className="mt-4 col">
                    <button type="submit" className="btn btn-primary w-100" 
                    onClick={(e)=>handleSubmit(e)}>Wybierz miejsca</button>
                </div>

            </form>
            </div>
            </div>
            </div>
        );
    

}

export default Home;