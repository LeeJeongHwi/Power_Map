import React ,{Component, useState} from "react";
import Dock from "react-dock";
import {X} from "react-bootstrap-icons"

class SideDock extends Component{
    state = {
        positions: "left",
        dimModes : "none",
        isVisible: false,
        fluid: true,
        customAnimation: false,
        slow: false,
        size: 0.25
    }
    onClickVisible = () =>{
        this.setState({
            isVisible : !this.state.isVisible
        })
    }
    style = {
        remove : {
            position:"absolute",
            zIndex : 1,
            right : "10px",
            top : "10px",
            cursor :"pointer"
            
        }
    }
    render(){       
        return(
            <div>
                <button onClick={this.onClickVisible}>visible</button>
                <Dock 
                  position={this.state.positions}
                  dimMode={this.state.dimModes}
                  isVisible = {this.state.isVisible}
                  onVisibleChange = {this.onClickVisible}
                  fluid = {this.state.fluid}
                >
                    <div>
                        <X size={30} onClick={this.onClickVisible} style = {this.style.remove}/>
                        <br></br>
                    </div>
                </Dock>
            </div>
        )
    }
}
export default SideDock;