/*global kakao */
import React ,{Component} from "react";
import axios from 'axios';
import Dock from "react-dock";
import {X} from "react-bootstrap-icons";
import DockDetail from "./Dock_Detail";
// import DockDetails from "./Dock_Detail_Class";
const { kakao } = window;
class Map_data extends Component{
    constructor(props){
        super(props);
        this.state = {
            markers : [],
            nowSelected_Marker : 0,
            map : null,
            //Dock
            positions: "left",
            dimModes : "none",
            isVisible: false,
            fluid: true,
            customAnimation: false,
            slow: false,
            size: 0.25
        };
    }
    onClickVisible = () => {
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
    async componentDidMount(){
        const script = document.createElement('script');
        script.async = true;
        script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=c384f2a1aaa557ebd2e8e21d9c633dad"
        document.head.appendChild(script);
        
        script.onload = () => {
            kakao.maps.load(()=>{
                let el = document.getElementById('MyMap');
                this.setState({map:new kakao.maps.Map(el,{
                    center: new kakao.maps.LatLng(37.60203, 126.9558),
                    level:3
                })})
            })
        }
        try{
            const response = await axios.post("http://localhost:8080/load_map")
            const m_Data = response.data.map((data)=>{
                const marker = new kakao.maps.Marker({
                    // title,
                    title : data[0],
                    map : this.state.map,
                    position : new kakao.maps.LatLng(data[2],data[3])
                });
                kakao.maps.event.addListener(marker,"click",()=>{
                    if (this.state.isVisible == false){
                        this.onClickVisible();
                    }
                    this.setState({nowSelected_Marker : marker.getTitle()})
                    console.log("Marker Clicked : ",this.state.nowSelected_Marker)
                });
                marker.setMap(this.state.map);
                console.log("Marker Setting : "+data[1]+" "+data[2]+" "+data[3])
            })
        }catch(err){
            console.log(err);
        }
    }
    render(){
        const mapStyle = {
            width : "100vw",
            height : "100vh"
        }
        return (
            <div>
                <div id="MyMap" style={mapStyle}></div>
                <Dock 
                  id = "dock_bar"
                  position={this.state.positions}
                  dimMode={this.state.dimModes}
                  isVisible = {this.state.isVisible}
                  onVisibleChange = {this.onClickVisible}
                  fluid = {this.state.fluid}
                >
                    <div>
                        <X size={30} onClick={this.onClickVisible} style = {this.style.remove}/>
                        <br></br>
                        {this.state.nowSelected_Marker &&
                            <DockDetail nowMarker ={this.state.nowSelected_Marker}/>
                        }
                    </div>
                </Dock>
            </div>
        )
    }
}
export default Map_data;