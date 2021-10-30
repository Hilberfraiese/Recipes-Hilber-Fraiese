import React, { useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import "./create.css"
import { newRecipe } from '../actions';
import  {useDispatch} from "react-redux"
import {Switch} from "@material-ui/core"



function Create(props) {
const {sidebarOff}=props
const dispatch = useDispatch()
const recipes = useSelector((state) => state.dataLoaded)
const [newre,setNewre] = useState({id:recipes.length, name:"", ingredients:[{id:1, name:""},{id:2,name:""}], preparation:"",review:"",state:true})    
const [review, setReview] = useState([{id:1, state: false},{id:2,state:false},{id:3,state:false},{id:4,state:false},{id:5,state:false}])
const [state, setState] = useState(true)

const handleSubmit = (e)=>{
 const env= newre;
 setNewre(({id:recipes.length+1 , name:"", ingredients:[{id:1, name:""},{id:2,name:""}], preparation:"",review:"",state:true}))
 setReview([{id:1, state: false},{id:2,state:false},{id:3,state:false},{id:4,state:false},{id:5,state:false}])
 dispatch(newRecipe(env))
 alert("Se creo la receta")
 sidebarOff();
}

const handleInputChange = (e) => {
   setNewre({
      ...newre,
     [e.target.name]: e.target.value,
   });
};

 const handleInputChangeArr = (e) => {
    let ingredients = newre.ingredients;
        ingredients[e.target.id-1].name = e.target.value  
    setNewre({
      ...newre,
      [e.target.name]: ingredients,
    });
  };

 const deleteIng = (e) =>{
   let filtered = newre.ingredients.filter((re) => re.id !== Number(e.target.id))
    setNewre({
      ...newre,
      [e.target.name]: filtered
    });
 }

 const addIng = (e) =>{
   let add = newre.ingredients
   add.push({id:newre.ingredients.length+1,name:""})
   setNewre({
      ...newre,
      [e.target.name]: add
   });

 }

 const handleClick = (e)=>{
  let revi = review;  
  let num = Number(e.target.value)
    revi.map(rev=>{
       if(num === rev.id){
        rev.state=true;
       }else{
        rev.state=false;
       }
     })

  setReview(revi)
  setNewre({...newre,[e.target.name]: num});
  
 }


 const handleChange= (e)=>{
   const temp = newre;
   temp.state === true? temp.state=false: temp.state=true
   setNewre(temp);
   setState(temp.state)
   console.log(newre)
  }

  useEffect(() => {
  }, [newre, review]);

    return (
        <div >
          <h2 className="titleInput">New Recipe</h2>
          <form onSubmit={handleSubmit}>
          <div>
            <label className="titleInput">Recipe name</label>
            <br />
            <textarea
            rows="2"
              name="name"
              type="text"
              onChange={handleInputChange}
              value={newre.name}
              placeholder="Name                                                                                                      E.g. Slow cooker beef and rice hot pot"
              className="inputName"
              required
            />
          </div>
          <br />
          <div>
            <label className="titleInput">Ingredients</label>
            <br />
            <div>
            {newre.ingredients.map((e)=>(
             <div key={e.id}>
             <a className="numIng">{e.id}</a> 
              <input
                name="ingredients"
                type="text"
                onChange={handleInputChangeArr}
                value={e.name}
                required
                className="inputIng"
                id={e.id}
  
              />
              {e.id !== newre.ingredients.length?      
              <button type= "button" name="ingredients" value={e.name} id={e.id} className="material-icons" onClick={e=> deleteIng(e)}>delete_outline</button>:
              <button type="button" name="ingredients" value={e.name} id={e.id} className="material-icons" onClick={e=> addIng(e)}>add_circle_outline</button>
            }
         
           </div>
            ))}
            </div>
          </div>
          <br />
          <div>
            <label className="titleInput">Preparation</label>
            <br />
            <textarea
              name="preparation"
              onChange={handleInputChange}
              value={newre.preparation}
              type = "text"
              placeholder="insert preparation"
              required
              className="inputTexta"
            />
          </div>
          <br />
          <div>
            <label className="titleInput">Reviews</label>
            <br />
            {review.map(rev=>(
            < div key = {rev.id}>
              <a className="numcheck">{rev.id}</a>
              <input
                className="review"
                name="review"
                type="checkbox"
                onClick={e=> handleClick(e)}
                value={rev.id}
                checked={rev.state}
                required
              />
            </div> 
            ))}
          </div>
          <br />
          <h3 className="subtitle">Cooked before</h3>
           <Switch
             color="primary"         
             checked={state}
             onChange={e =>  handleChange(e)}
             name="state"
           />
           <br />
          <button 
            className= "buttonCreate"
            type="submit"
            color = "inherit"
            variant="contained"
            onClick={handleSubmit}
          >
            Create
          </button>
        </form>  
        </div>
    );
}

export default Create;