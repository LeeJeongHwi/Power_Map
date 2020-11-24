import React, { useEffect,useState } from "react";

const BuildingName = (props) => {
    const {datas} = props;
    const [measure_Data,setData] = useState([]);
    useEffect(()=>{
        setData(datas['data'])
    },[datas])
    return (
        <div>
            <ul></ul>
        </div>
    )
}
export default BuildingName;