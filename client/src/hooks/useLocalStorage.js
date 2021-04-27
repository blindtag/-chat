import {useEffect, useState} from 'react';

//Create a prefix to avoid mix-ups with other localStorage files
const PREFIX ='whatsapp-clone-';

export default function useLocalStorage(key, initialValue) {
    const prefixedKey = PREFIX + key;
    //Use setState as a function to get data from localStorage and parse as JSON
    const [value, setValue] = useState(()=>{
        const jsonValue = localStorage.getItem(prefixedKey);
        //Return when it is a non-zero value
        if(jsonValue != null) return JSON.parse(jsonValue);
        //If initialValue is parsed as a function call it, else return it 
        if(typeof initialValue === 'function'){
            return initialValue();
        }else{
            return initialValue;
        }
    });
    //Get the value and save it in localStorage
    useEffect(()=>{
        localStorage.setItem(prefixedKey, JSON.stringify(value))
    }, [prefixedKey, value])
    return [value, setValue];
}
