import React, {useEffect, useState} from 'react';
import {Switch, makeStyles, Drawer} from "@material-ui/core"
import Rating from "@material-ui/lab/Rating";
import "./detail.css"
import Edit from "./edit.jsx"

function Detail(props) {
  const {DetailOff} = props
  const {rec} = props

  console.log(DetailOff) 
  console.log(rec) 
    const [edit, setEdit] = useState(false)
    const [state, setState] = useState(rec[0].state)

    function handleChange(){
      if(state === true){
          rec[0].state=false
          setState(false) 
      }else{
          setState(true)
          rec[0].state=true}
    }
    
    function setEditar(){
      setEdit(true)
    }

    useEffect(() => {
    }, [state]);

    return (
        <div>
        { edit === false?(
        <div className="containerDetails">
           <h2>{rec[0].name}</h2>
           <h3 className="subtitle">Ingredients</h3>
           {rec[0].ingredients.map(e=>(
               <li key={e.id}>{e.name}</li>
           ))}
           <h3 className="subtitle">Preparation</h3>
           <text>{rec[0].preparation}</text>
           <br/>
           <h3 className="subtitle">Reviews</h3>
           <Rating
             readOnly
             name={rec[0].name}
             value={rec[0].review}
             size="small"
           />
           <br/>
           <h3 className="subtitle">Cooked before</h3>
           <Switch
             color="primary"         
             checked={state}
             onChange={e => handleChange()}
             name="state"
           />
           <button className="buttonDetail" onClick={e=>setEditar()}>Edit</button>
        </div>):(
          <Edit  rec = {rec} DetailOff = {DetailOff}/>  
        )}
        </div>
    );
}

export default Detail;