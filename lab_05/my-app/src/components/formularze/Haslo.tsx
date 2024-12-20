import React, {useState} from 'react';

const Haslo = () => {

    const [haslo, setHaslo] = useState("");
    const [powtorzHaslo, setPowtorzHaslo] = useState("");
    
    const sprawdzHaslo = () =>{
        if(!haslo && !powtorzHaslo)
        {
            return "Proszę wprowadzić hasło";
        }
        if(haslo != powtorzHaslo)
        {
            return "Hasła nie są zgodne";
        }
        else
        {
            return "";
        }
    }

    return (
        <>
        <input type='text' value={haslo} placeholder='Hasło' onChange={(e) => setHaslo(e.target.value)}></input>
        <input type='text' value={powtorzHaslo} placeholder="Powtórz Hasło" onChange={(e) => setPowtorzHaslo(e.target.value)}></input>
        <div>{sprawdzHaslo()}</div>
        </>
    );
};

export default Haslo;