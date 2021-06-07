import React, {useEffect, useState, useRef} from 'react'
import { Typography } from '@material-ui/core';

export default function Reloj(){
    const [tiempo, setTiempo] = useState("")

    useInterval(() => {
        let date = new Date()
        let hrs = date.getHours();
        let mins = date.getMinutes();
        let secs = date.getSeconds();
        let period = "AM";
        hrs = hrs < 10 ? "0" + hrs : hrs;
        mins = mins < 10 ? "0" + mins : mins;
        secs = secs < 10 ? "0" + secs : secs;

        setTiempo(`${hrs}:${mins}:${secs} ${period}`)
    },1000)

    function useInterval(callback, delay) {
        const savedCallback = useRef();
      
        // Remember the latest function.
        useEffect(() => {
          savedCallback.current = callback;
        }, [callback]);
      
        // Set up the interval.
        useEffect(() => {
          function tick() {
            savedCallback.current();
          }
          if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
          }
        }, [delay]);
      }
    
    return (
        
            <Typography align="center" variant="h6" >
                {tiempo}
            </Typography>
        
    )
}