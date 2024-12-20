import React, { useEffect, useState } from 'react';

const Odliczanie = () => {
    const [licznik, setLicznik] = useState(15);
    const [przycisk, setPrzycisk] = useState("START");
    const [isActive, setIsActive] = useState(false);

    const isCountingActive = licznik > 0;

    useEffect(() => {
        // Ustawianie napisu na przycisku
        setPrzycisk(() =>
            isCountingActive ? (isActive ? "STOP" : "START") : "Odliczanie zakończone"
        );

        if (isActive && isCountingActive) {
            const intervalId = setInterval(() => {
                setLicznik((prevLicznik) => (prevLicznik - 0.1 >= 0 ? prevLicznik - 0.1 : 0));
            }, 100);

            return () => clearInterval(intervalId);
        }
    }, [isActive, licznik]);

    const toggleCounting = () => {
        setIsActive((prev) => !prev);
    };

    return (
        <>
            <div>Licznik: {licznik.toFixed(1)} sek</div>
            <button onClick={toggleCounting} disabled={!isCountingActive}>
                {przycisk}
            </button>
        </>
    );
};

export default Odliczanie;