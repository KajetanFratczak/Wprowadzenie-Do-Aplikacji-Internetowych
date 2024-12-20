import React from 'react';

const Przycisk = ({increment}: any) => {
    return (
        <div>
            <button onClick={increment}>Dodaj</button>
        </div>
    );
};

export default Przycisk;