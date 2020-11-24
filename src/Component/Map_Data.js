/*global kakao */
import React ,{Component} from "react";
import axios from 'axios';
import Dock from "react-dock";
import {X} from "react-bootstrap-icons";
import DockDetail from "./Dock_Detail";
const { kakao } = window;
class Map_data extends Component{
    constructor(props){
        super(props);
        this.state = {
            markers : [],
            markerObject : [],
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

    load_data = async () =>{  
        try {
            return await axios.post("http://localhost:8080/load_map")
        }catch(e){
            console.error(e);
        }
    };
    markInsert = async () => {
        const datas = (await this.load_data())['data'];
        datas.map(
            data => this.state.markers.push({
                id:data[0],
                name:data[1],
                lat:data[2],
                long:data[3],
                detail:data[4],
                type:data[5]
            })
        )
        console.log("Marker Insert");
        return this.state.markers;
    }
    setMarker = async() => {
        const marker_List = await this.markInsert();
        marker_List.map(
            data => {
                const marker = new kakao.maps.Marker({
                    title : data['id'],
                    map : this.state.map,
                    position: new kakao.maps.LatLng(data["lat"],data["long"])
                })
                kakao.maps.event.addListener(marker,"click",() => {
                    if (this.state.isVisible == false){
                        this.onClickVisible();    
                    }
                    // console.log(marker.getTitle())
                    this.setState({nowSelected_Marker : marker.getTitle()})
                    console.log(this.state.nowSelected_Marker)
                });
                marker.setMap(this.state.map)
                console.log("Marker Setting : "+data["name"]+" "+data["lat"]+" "+data["long"])
                this.state.markerObject.push(marker);
            }
        )
    }
    componentDidMount(){
        const script = document.createElement('script');
        script.async = true;
        script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=c384f2a1aaa557ebd2e8e21d9c633dad"
        document.head.appendChild(script);
        
        script.onload = () => {
            kakao.maps.load(()=>{
                let el = document.getElementById('MyMap');
                this.setState({map:new kakao.maps.Map(el,{
                    center: new kakao.maps.LatLng(37.600, 126.955),
                    level:3
                })})
            })
        }
        this.setMarker();
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
                        <DockDetail marker_id={this.state.nowSelected_Marker} visible = {this.state.isVisible}/>
                    </div>
                </Dock>
            </div>
        )
    }
}
export default Map_data;