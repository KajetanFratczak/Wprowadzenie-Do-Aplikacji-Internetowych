import React, {useState} from 'react';

const Logowanie = () => {
    const [login, setLogin] = useState("");
    const [haslo, setHaslo] = useState("");
    const [powtorzHaslo, setPowtorzHaslo] = useState("");
    
    const isDisabled = !login || !haslo || !powtorzHaslo;

    const handleLogin = () =>{
        if(haslo != powtorzHaslo)
        {
            alert("Hasła nie są zgodne");
        }
        else
        {
            alert("Zalogowano poprawnie");
        }
    };

    return (
        <>
        <input type='text' value={login} placeholder='Nazwa użytkownika' onChange={(e) => setLogin(e.target.value)}></input>
        <input type='text' value={haslo} placeholder='Hasło' onChange={(e) => setHaslo(e.target.value)}></input>
        <input type='text' value={powtorzHaslo} placeholder="Powtórz Hasło" onChange={(e) => setPowtorzHaslo(e.target.value)}></input>
        <button onClick={handleLogin} disabled={isDisabled}>Logowanie</button>
        </>
    );
};

export default Logowanie;