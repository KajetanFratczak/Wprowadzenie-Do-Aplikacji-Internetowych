import { useEffect } from "react";
import React, { useState } from 'react';

const Licznik = () => {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count+1);
    }

    useEffect(() => {
        console.log("Hello World");
    }, []); // Pusta tablica zależności oznacza, że ten efekt uruchomi się tylko raz, po zamontowaniu komponentu.

    useEffect(() => {
        console.log(`Licznik zwiększył się do ${count}`);
    }, [count]);

    return (
        <div>
            <p className='count-display'>{count}</p>
            <button onClick={increment}>Dodaj</button>
        </div>
    );
};

export default Licznik;