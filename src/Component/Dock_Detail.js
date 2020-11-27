import React, {useState,useEffect,useRef,useCallback} from "react";
import axios from "axios";
import DetailName from "./Detail_Name";
import DetailGraph from "./Detail_Graph";
import DetailToday from "./Detail_Today";
const DockDetail = (props) => {
    const {nowMarker} = props;
    const [measure,setMeasure] = useState([]);
    const [building,setBuilding] = useState({});
    useEffect(()=>{
        const me_Data = [];
        let building_name = "";
        let building_Detail = "";
        const fetchall = async() => {
            const response = await axios.get("http://localhost:8080/load_measure",{
                params:{
                    id:nowMarker
                }
            });
            if (response.data){
                await response.data.map((data)=>{
                    me_Data.push({
                        id : data[0],
                        hour : data[4],
                        measure : data[5],
                        predict : data[6]
                    })
                    if (building_name!=data[1]){
                        building_name=data[1]
                    }
                    if (building_Detail!=data[2]){
                        building_Detail=data[2]
                    }
                    
                })
           }
           setMeasure(me_Data);
           setBuilding({
               name:building_name,
               detail:building_Detail
           })
        }
        fetchall();
    },[nowMarker])
    // useEffect(()=>{
    //     //Just Effect...
    // },[measure])

    return (
        <div id ="detail_box">
            <div id="buildingName">
                <h1>Marker_ID : {nowMarker}</h1>
                <DetailName building={building}/>
                <DetailGraph measure={measure}/>
                <DetailToday />
            </div>
        </div>
    )
}

export default DockDetail;