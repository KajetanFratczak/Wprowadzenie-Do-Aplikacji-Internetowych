import React from 'react';

const Ternary = () => {

    let a = true;
    let b = false;

    return (
        <>
        <div>{a ? "Stwierdzenie a jest prawdziwe" : "Stwierdzenie a jest fałszywe"}</div>
        <div>{b ? "Stwierdzenie b jest prawdziwe" : "Stwierdzenie b jest fałszywe"}</div>
        </>
    );
};

export default Ternary;