import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState={
    allSeats:[
        [null,null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null,null,null]
    ],
    isRowOfSeats:false,
    numberOfSelectedSeats:0

}

export const fetchSeats=createAsyncThunk('seats/fetchSeats',async ()=>{
    
    const response= await fetch('http://localhost:5000/seats');
    const data=await response.json();
    
    return data;
}
)

export const seatsSlice=createSlice({

    name:"seats",
    initialState,
    reducers:{
        selectSeats:(state,action)=>{
            state.allSeats[action.payload.cords.y][action.payload.cords.x].selected=!action.payload.selected
        },
        clearSelection:(state)=>{
            state.allSeats.forEach((row,i)=>{
                row.forEach((element,j)=>{
                    if(state.allSeats[i][j]&&state.allSeats[i][j].selected){
                        state.allSeats[i][j].selected=false
                    }
                })
            })
            state.isRowOfSeats=false
            state.numberOfSelectedSeats=0 
        },
        changeStatusOfSeats:(state)=>{
            state.isRowOfSeats=!state.isRowOfSeats
        },
        changeNumberOfSeats:(state,action)=>{
            state.numberOfSelectedSeats=action.payload
        }
    },
    extraReducers:builder=>{
        builder
        .addCase(fetchSeats.pending, (state, action) => {
            
          })
        .addCase(fetchSeats.fulfilled,(state,action)=>{
            action.payload.forEach(seat => {
                 state.allSeats[seat.cords.y][seat.cords.x]=seat
                 state.allSeats[seat.cords.y][seat.cords.x].selected=false
                 state.isRowOfSeats=false
                 state.numberOfSelectedSeats=0
            });

        })
    }


});

export const allSeats=(state)=>state.seats.allSeats;
export const numberOfSelectedSeats=(state)=>state.seats.numberOfSelectedSeats;
export const isRowOfSeats=(state)=>state.seats.isRowOfSeats;
export const {selectSeats,clearSelection,changeStatusOfSeats,changeNumberOfSeats}=seatsSlice.actions;


export default seatsSlice.reducer;