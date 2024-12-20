import React, { useState } from 'react';

const Licznik = () => {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count+1);
    }

    return (
        <div>
            <p className='count-display'>{count}</p>
            <button onClick={increment}>Dodaj</button>
        </div>
    );
};

export default Licznik;