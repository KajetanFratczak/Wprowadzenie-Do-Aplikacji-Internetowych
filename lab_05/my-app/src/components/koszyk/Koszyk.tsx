// rsc -> Enter tworzy podstawową strukturę programu  (op)

import React from 'react';
import Produkt from './Produkt';

const Koszyk = () => {
    return (
        <>
            <Produkt nazwa="Jabłko"></Produkt>
            <Produkt nazwa="Gruszka"></Produkt>
            <Produkt nazwa="Banan"></Produkt>
            <Produkt nazwa="Ananas"></Produkt>
            <Produkt nazwa="Kokos"></Produkt>
        </>
    );
};

export default Koszyk;