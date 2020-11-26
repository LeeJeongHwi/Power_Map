import React, {Component} from "react";
import axios from "axios";
import DetailName from "./Detail_Name";
import DetailGraph from "./Detail_Graph";
import DetailToday from "./Detail_Today";
class DockDetails extends Component {
    constructor(props){
        super(props)
        this.state = {
            measure : [],
            predict : []
        }
    }
    async componentDidUpdate(prevProps) {
        console.log("Marker Update")
        try{
            const temp = [];
            const responses = await axios.get("http://localhost:8080/load_measure",{
                params:{
                    id:this.props.nowMarker
                }
            });
            if (responses.data){
                responses.data.map((data)=>{
                    const mlist = temp.concat({
                        id : data[0],
                        name : data[1],
                        detail : data[2],
                        hour : data[5],
                        measure : data[6]
                    })
                    temp = mlist;
                })
            }
            if (this.props.measure != prevProps.measure){
                this.setState({measure:temp});
            }
        }catch(err){
            console.log(err);
        }
    }
    render(){
        return (
            <div id ="detail_box">
                <div id="buildingName">
                    <h1>Marker_ID : {this.props.nowMarker}</h1>
                    <DetailName />
                    <DetailGraph />
                    <DetailToday />
                    <p>{this.state.measure}</p>
                </div>
            </div>
        )
    }
}
export default DockDetails;