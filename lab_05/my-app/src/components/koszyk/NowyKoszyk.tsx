import React from 'react';
import Produkt from './Produkt';

const Produkty = ["Jabłko", "Gruszka", "Banan", "Ananas", "Kokos"];

const NowyKoszyk = () => {
    return (
        <>
            {Produkty.map((nazwa, index) => (<Produkt key={index} nazwa={nazwa}></Produkt>))} 
        </>
    );
};

export default NowyKoszyk;