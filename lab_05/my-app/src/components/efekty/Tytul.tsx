import React, {useState, useEffect} from 'react';
import NowyKoszyk from '../koszyk/NowyKoszyk';

const Tytul = () => {

    const [tytul, setTytul] = useState("");

    useEffect(() => {
        document.title = tytul || "Aplikacja React"; // Ustaw "Aplikacja React", jeśli `tytul` jest pusty;
    }, [tytul]);

    return (
        <>
        <input type='text' placeholder="Wpisz tytuł strony" value={tytul} onChange={(e) => setTytul(e.target.value)}></input>
        </>
    );
};

export default Tytul;