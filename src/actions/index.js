

export function newRecipe(param){
    console.log("param", param)
        return function (dispatch) {
          dispatch({ type: "NEW_REC", payload: param });
        };
}

export function update(param){
  console.log("param", param)
     return function(dispatch){
       dispatch({type:"UPDATE", payload: param})
     }
}
