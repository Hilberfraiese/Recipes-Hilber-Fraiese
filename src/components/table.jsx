import React, {useEffect, useState} from 'react';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Switch, Drawer} from "@material-ui/core"
import { useSelector} from "react-redux";
import { makeStyles } from '@material-ui/core';
import Rating from "@material-ui/lab/Rating";
import Detail from "./detail"
import "./create.css"

const useStyle = makeStyles({
 onSwitch:{
     textColor: "black",
     fontFamily: "Poppins",
     cursor: "pointer"
 },
 offSwitch:{
    
     color:"grey",
     fontFamily: "Poppins",
     cursor: "pointer"
 },
 titleTable:{
    fontSize:"12px",
    fontFamily: "Poppins",
    color:"grey",
    fontWeight: 500
 },
 drawer:{
    width: 464,
    flexShrink: 0, 
 },
 drawePaper:{
     width:464,
 } 
})

function Tables(props) {
    const {filtered} = props;
    const {select} = props;
    console.log(filtered)
    console.log(select)
    const [datos,setDatos] = useState([])
    const [detail, setDetail] = useState(false)
    const classes = useStyle();
    const [rec, setRec] = useState()

    

    function DetailOn(e){  
     setDetail(true)
     let temp = filtered.filter((f)=> f.id === Number(e.target.id))  
     setRec(temp)
     }

     function DetailOff(){
        setDetail(false)
       }
  
    if(select.value === "all" && datos.length !== filtered.length){
        setDatos(filtered)
   
    }else{
        let datoac = filtered.filter((e)=> e.state === true)
        let datoin = filtered.filter((e)=> e.state === false)
        if(select.value === "active" && datos.length !== datoac.length){
            setDatos(datoac)  
          }else if( select.value === "inactive" && datos.length !== datoin.length){
            setDatos(datoin)
          }
    }  

 
   function handleChange(id, e){
     const newDatos = datos.map((dat)=>{
         if(dat.id === id){
             dat.state= e.target.checked
         }
         return dat;
     })
     setDatos(newDatos)
    }

    useEffect(() => {
    }, [datos]);
    return (
        <div>
           <TableContainer>
               <Table size="small">
                <TableHead>
                    <TableRow >
                        <TableCell className={classes.titleTable}>Recipe Name </TableCell>
                        <TableCell className={classes.titleTable}>Reviews </TableCell>
                        <TableCell className={classes.titleTable}>Cooked before </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody >
                { datos?.map(rec=>(
                    rec.state === true?(
                    <TableRow key={rec.id}  className={classes.onSwitch} >
                     <TableCell className={classes.onSwitch} id={rec.id} onClick ={e=> DetailOn(e)}>{rec.name}</TableCell>
                     <TableCell> 
                       <Rating
                         readOnly
                         name={rec.name}
                         value={rec.review}
                         size="small"
                         />
                      </TableCell>
                     <TableCell>
                      <Switch
                       color="primary"
                       checked={rec.state}
                       onChange={e => handleChange(rec.id, e)}
                       name="state"
                      />   
                     </TableCell>
                    </TableRow> ):(
                     <TableRow key={rec.id} className={classes.offSwitch}>
                     <TableCell className={classes.offSwitch} id={rec.id} onClick ={e=> DetailOn(e)}>{rec.name}</TableCell>
                     <TableCell className={classes.offSwitch}>
                     <Rating
                         readOnly
                         name={rec.name}
                         value={rec.review}
                         size="small"
                         />
                     </TableCell>
                     <TableCell >
                      <Switch
                       color="primary"         
                       checked={rec.state}
                       onChange={e => handleChange(rec.id, e)}
                       name="state"
                      />   
                     </TableCell>
                    </TableRow>   
                    )   
                ))} 
                </TableBody>
               </Table> 
            </TableContainer>
            <Drawer 
              className ={classes.drawer}
              variant="temporary"
              classes={{
              paper: classes.drawePaper,
              }}
              anchor="right"
              open={detail}
              >
               <div className="closeButton" onClick={e=> DetailOff()}>x</div>
                <Detail rec={rec} DetailOff = {DetailOff} />
             </Drawer> 
        </div>
    );
}


export default Tables