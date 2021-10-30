import data from "../mockups/data"

const initialState = {
    dataLoaded : data,
    }
    
export const reducer = (state = initialState, action) =>{
      console.log(action.payload)
      switch(action.type){
          case "UPDATE":
             return {
            ...state,
            dataLoaded: action.payload,
          }   
          case "NEW_REC":
            return{...state,
            dataLoaded: state.dataLoaded.concat(action.payload)}  
        default: return state;
        }  
          
    }
    
    
    
    export default reducer;