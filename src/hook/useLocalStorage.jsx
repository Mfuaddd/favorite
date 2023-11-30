import React, { useEffect, useState } from 'react'

function useLocalStorage(key,val) {
    const [data, setData] = useState(localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : val)
    
    function setVal(x) {
        localStorage.setItem(key,JSON.stringify(x))
        setData(x)
    }
    return [data,setVal]
}

export default useLocalStorage