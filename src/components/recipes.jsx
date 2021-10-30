import React,{useState, useEffect} from 'react';
import "./recipes.css"
import Tables from "./table"
import Select from 'react-select';
import { useSelector} from "react-redux";



  
function Recipes() {
const recipes = useSelector((state) => state.dataLoaded)
const [filtered,setFiltered] = useState(recipes)
const [inputvalue, setInputvalue]= useState("")
const [state, setState] = useState({value: "all", label:"all"})
const [place, setPlace] = useState("All")
const options = [{value: "all", label:"All"},
                 {value: "active", label:"Active"},
                 {value: "inactive", label:"Inactive"},]

const handleChange = (value) =>{
 setState(value)
 setPlace("Cooked before: "+state.value)
}

function inputChange(e){
setInputvalue(e.target.value)
let filter = recipes.filter(e=> e.name.toLowerCase().includes(inputvalue.toLowerCase()))
setFiltered(filter)
}

useEffect(() => {
}, [state,inputvalue]);
console.log(filtered)
    return (
        <div> 
            <div className= "title">
                <h2> Kitchen Recipes</h2>
            </div>
            <div className="input-container">
                <input 
                type="text" 
                placeholder="Search"  
                className="input-search"
                value={inputvalue} 
                onChange={e=>inputChange(e)}/>
                <div className="selectContainer">
                <Select
                 label= {place}
                 placeholder={<div>Coocked before <a>{place}</a></div>}
                 
                 options={options}
                 onChange={handleChange}
                 theme={(theme) => ({
                    ...theme,
                    borderRadius: 9,
                    colors: {
                    ...theme.colors,
                      primary25: '#98DBDC',
                      primary: '#CBCBCB',
                    },
                  })}
                />
                </div>
            </div>
        <Tables select = {state} filtered = {filtered}/>
        </div>
    );
}

export default Recipes;

