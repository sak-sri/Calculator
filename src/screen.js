import React from 'react'
import classes from './screen.module.css'
const Screen=(props)=>{
    let ans="Invalid Expression";
    if(props.error_val===false && props.exp.length!==0)
    {
        ans=props.exp;
    }
    else if(props.error_val===false && props.exp.length===0)
    {
        ans="Please Enter Values";
    }
    return(
        <div className={classes.Screen}>
            <div style={{position:'absolute',bottom:"0%",right:'0%'}}>
                {ans}
            </div>
        </div>
    )
}
export default Screen;