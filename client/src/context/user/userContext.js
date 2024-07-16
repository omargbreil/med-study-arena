import {createContext} from "react";
import { useEffect , useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export const UserContext= createContext(null);


export function UserContextProvider(props) 
{
    const [token, setToken] = useState(null);
    const [decode, setDecode] = useState(null);



    async function getToken() 
    {
        try {
          let token =localStorage.getItem('userToken');
          setToken(token);
          let decoded = jwtDecode(token);
          console.log("Decoded Token", decoded);
          setDecode(decoded);
        } catch (error) {
          console.error("Error decoding Token:", error);
        }
      }


      /* - SMOOTH REFRESH OR  GET OUR LOCAL stroage  USER TOKEN WHEN WE REFRESH BY COMPONENT DID MOUNT - */

  useEffect(() => {

    if (localStorage.getItem('userToken')) {

      getToken();

    };
  }, []);



    
return (
    <>
         <UserContext.Provider value={{token,decode,getToken,setDecode,setToken}}>
                {props.children}
        </UserContext.Provider>
    
    </>
) 

            
        
    
    
}