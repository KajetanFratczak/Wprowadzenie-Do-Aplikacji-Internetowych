import React, {useState} from 'react';

const Aktualizacja = () => {
    const [produkt, setProdukt] = useState({ nazwa: "Pomidor", cena: 50 });
    
    const zmienCene = () =>{
        setProdukt((prev) => ({...prev, cena: 100}));
    }

    return (
        <>
        <div>Aktualnie {produkt.nazwa} kosztuje {produkt.cena}</div>
        <button onClick={zmienCene}>Zmień cenę</button>
        </>
    );
};

export default Aktualizacja;