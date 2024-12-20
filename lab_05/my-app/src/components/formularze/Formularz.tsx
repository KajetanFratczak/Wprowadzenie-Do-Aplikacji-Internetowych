import React, {useState} from 'react';

const Formularz = () => {
    const [tekst, setTekst] = useState("");

    function setValue(e: React.ChangeEvent<HTMLInputElement>)
    {
        setTekst(e.target.value);
    }

    return (
        <>
        <input type='text' value={tekst} onChange={setValue}></input>
        <div>{tekst}</div>
        </>
    );
};

export default Formularz;