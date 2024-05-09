import React, { useEffect, useState } from 'react'
import axios from 'axios';
const useFetch = (url) => {
    const [loading,setLoading]=useState(false);
    const [data,setData]= useState(null);
    const [error,setError]=useState(null);

    useEffect(()=>{
         loading(true);
         axios.post(url,data)
         .then((response)=>setData(response.data.data))
         .catch(err=>setError(err))
         .finally(()=>{
            setLoading(false)
         })
    },[url])

    return {loading,error,data}
};


export default useFetch;