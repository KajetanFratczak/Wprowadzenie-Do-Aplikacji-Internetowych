import React, { useState } from 'react';
import Przycisk from './Przycisk';

const NowyLicznik = () => {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count+1);
    }

    return (
        <div>
            <p className='count-display'>{count}</p>
            <Przycisk increment={increment}></Przycisk>
        </div>
    );
};

export default NowyLicznik;