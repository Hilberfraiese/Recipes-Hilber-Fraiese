import React, { useState } from 'react';
import Recipes from './recipes';
import "./main.css"
import Create from './create';
import {makeStyles, Drawer} from "@material-ui/core"

const estilos = makeStyles(theme =>({
    drawer:{
       width: 464,
       flexShrink: 0, 
    },
    drawePaper:{
        width:464,
    } 
 }))

function Main() {
    const [sidebar, setSidebar] = useState(false);
    const classes = estilos();
    

    function sidebarOn(e){  
        setSidebar(true)
    }
   
    function sidebarOff(){
          setSidebar(false)
    }

  

    return (
        <div className="content">
        <div className = "flex-row"> 
           <div className="logo">
            <img src="./tinkin.png" />   
           </div>
           <div className = "column1" >
            <img src="./salad.png" />
           </div>
           <div className ="column2">
            <Recipes/> 
           </div>
           {sidebar === false?
            <div className="fixed-action-btn">
                <a className="btn-floating btn-large #0C969D"  onClick={e=> sidebarOn()}>
                 <i className="medium material-icons">add</i>
                 <div className= "sidebarF"></div>
                </a>
            </div>:null}
             <Drawer 
              className ={classes.drawer}
              variant="temporary"
              classes={{
              paper: classes.drawePaper,
              }}
              anchor="right"
              open={sidebar}
              >
               <div className={"closeButton"} onClick={e=> sidebarOff()}>x</div>
               <Create sidebarOff={sidebarOff}/>
             </Drawer>
            
        </div>

        </div>
    );
}

export default Main;