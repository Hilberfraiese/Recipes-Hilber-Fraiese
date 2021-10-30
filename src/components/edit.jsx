import React, { useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import "./create.css"
import { update } from '../actions';
import  {useDispatch} from "react-redux"


function Edit(props) {
const {rec}= props;
const {DetailOff} = props;
const dispatch = useDispatch()
const recipes = useSelector((state) => state.dataLoaded)
const [newre,setNewre] = useState(rec[0])    
const [review, setReview] = useState([{id:1, state: false},{id:2,state:false},{id:3,state:false},{id:4,state:false},{id:5,state:false}])


const handleSubmit = (e)=>{
 recipes.map(rec=>{
   if(rec.id === newre.id){
     recipes[rec.id] = newre} 
 }) 
 dispatch(update(recipes))
 alert("Se modifico la receta")
 DetailOff();
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
            {newre.ingredients.map((e, count = 0)=>(
             <div key = {e.id}>
              {count++} 
           
              <input
                name="ingredients"
                type="text"
                onChange={handleInputChangeArr}
                value={e.name}
                required
                className="inputIng"
                id={e.id}
              />
              {count++ !== newre.ingredients.length?      
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
            <>
              <a key={rev.id} className="numcheck">{rev.id}</a>
              <input
                className="review"
                name="review"
                type="checkbox"
                onClick={e=> handleClick(e)}
                value={rev.id}
                checked={rev.state}
                required
              />
            </> 
            ))}
          </div>
          <br />
          <div className="contButton">
          <button 
            className= "buttonCancel"
            type="submit"
            color = "inherit"
            variant="contained"
            onClick={DetailOff}
          >
            Cancel
          </button>
          <button 
            className= "buttonUpdate"
            type="submit"
            color = "inherit"
            variant="contained"
            onClick={handleSubmit}
          >
            Update
          </button>
          </div>
        </form>  
        </div>
    );
}

export default Edit;