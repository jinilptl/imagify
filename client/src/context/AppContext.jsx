import { createContext,useEffect,useState } from "react";
import axios from "axios"
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

export const AppContext=createContext();

const AppContextProvider=({children})=>{
    
   
    const backendUrl= import.meta.env.BACKEND_URL;
    const navigate = useNavigate();

    console.log("backend url is",backendUrl);
    

   

    // const [user,setUser]=useState(false);

     // important line 
    const [user, setUser] = useState(
        localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
      );

    const [showlogin,setShowlogin]=useState(false);
    const[token,setToken]=useState(localStorage.getItem("token"))
    const [credit,setCredit]=useState(false)

       const loadCreditsData=async()=>{
        try {
            const {data}=await axios.get('http://localhost:4000/api/v1/user/credits',{headers:
                { Authorization: `Bearer ${token}`}
            })
            if(data.success){
               setUser(data.user);
               setCredit(data.credits)
            }else{
                toast.error(data.message)
            }
            
        } catch (error) {
            toast.error(error.message);
        }
       }



       const ImageGenerator=async(prompt)=>{
        try {

            const {data}=await axios.post("http://localhost:4000/api/v1/image/generate-image",{prompt},{headers:
                { Authorization: `Bearer ${token}`} })

                if(data.success){
                  loadCreditsData();
                  return data.resultImage;
                }else{
                    toast.error(data.message)
                    loadCreditsData();
                     if(data.creditBalance===0){
                        navigate('/buy');
                     }
                }
            
        } catch (error) {
            console.log("eror in the image generator contaxt ",error);
            toast.error(error.message)
        }
       }

       const logout=()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setToken('')
        setUser(null)
       }
       useEffect(()=>{
        if(token){
            loadCreditsData()
        }
       },[token])
   
    const value={
        user,setUser,showlogin,setShowlogin,backendUrl,token,setToken,credit,setCredit,
        loadCreditsData,logout,ImageGenerator
   };





    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;