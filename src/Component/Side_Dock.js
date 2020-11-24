import React ,{Component, useState,useRef} from "react";
import Dock from "react-dock";
import {X} from "react-bootstrap-icons"

const SideDock = (props) => {
    const {markerID, visible} = props;
    const [positions,setPosition] = useState("left");
    const [dimModes,setDimMode] = useState("none");
    const [fluid,setFluid] = useState(true);
    const [customAnimation,setCustomAnimation] = useState(false);
    const [slow,setSlow] = useState(false);
    const [size,setSize] = useState(0.25);

    const style = {
        remove : {
            position:"absolute",
            zIndex : 1,
            right : "10px",
            top : "10px",
            cursor : "pointer"
        }
    }
    const onClickVisibie = () => {
        console.log("visible");
        visible = !visible;
    }
    return(
        <div>
        <Dock position={positions} dimMode={dimModes} isVisible={visible} fluid={fluid}
              onVisibleChange={onClickVisibie}>
            <div>
                <X size={30} onClickVisible={onClickVisibie} style={style.remove}></X>
                <br></br>
                <h1>{markerID}</h1>
            </div>
        </Dock>
        </div>
    )
}
export default SideDock;