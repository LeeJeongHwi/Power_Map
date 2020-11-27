import React,{useEffect,useState} from "react";

const DetailName = (props) => {
    const {building} = props;
    useEffect(()=>{
        if (Object.keys(building).length!=0){
            console.log("DetailName Mount");
            console.log(building)
        }
    },[building])
    const divStyle = {
        backgroundColor : "lightGrey"
    }
    return (
        <div style={divStyle}>
            <h3>{building.name}</h3>
            <h5>{building.detail}</h5>
        </div>
    )
}
export default DetailName;