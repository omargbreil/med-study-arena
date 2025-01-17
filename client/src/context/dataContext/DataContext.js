import axios from "axios";
import {createContext} from "react";
import { useEffect , useState } from 'react';

export const DataContext= createContext(null);


export function DataContextProvider(props) 
{
    const [tracks, setTracks] = useState([]);
    const [courses, setCourses] = useState([]);



    async function getData(dataType,callBack) 
    {
        try {

            
        let {data} = await axios.get(`${process.env.REACT_APP_prourl}/arena/v1/${dataType}`);
        callBack(data.result);
            
        } catch (error) {
            
            console.log(error);
        }
        
    }

    useEffect(() => 
    {
        getData('track',setTracks);
        getData('course',setCourses);
    },[]);


    
return (
    <>
         <DataContext.Provider value={{tracks,courses}}>
                {props.children}
        </DataContext.Provider>
    
    </>
) 

            
        
    
    
}