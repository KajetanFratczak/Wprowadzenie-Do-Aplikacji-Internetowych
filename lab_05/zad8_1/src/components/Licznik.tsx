import React, { useState, useEffect } from 'react';

const Licznik = () => {
    const [count, setCount] = useState<number>(() => {
        const savedCount = localStorage.getItem('licznik');
        return savedCount ? parseInt(savedCount, 10) : 0;
    });

    const increment = () => {
        setCount((prevCount) => prevCount + 1);
    };

    useEffect(() => {
        localStorage.setItem('licznik', count.toString());
    }, [count]);

    return (
        <div>
            <p className='count-display'>Wartość licznika: {count}</p>
            <button onClick={increment}>Dodaj</button>
        </div>
    );
};

export default Licznik;