import React, { useState } from 'react';

interface Student {
    imie: string;
    nazwisko: string;
    rocznik: number;
}

interface DodawanieProps {
    addStudent: (student: Student) => void;
}

const Dodawanie: React.FC<DodawanieProps> = ({ addStudent }) => {
    const [student, setStudent] = useState<Student>({
        imie: "",
        nazwisko: "",
        rocznik: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setStudent((prevStudent) => ({
            ...prevStudent,
            [name]: name === "rocznik" ? parseInt(value) || 0 : value,
        }));
    };

    const handleSubmit = () => {
        if (!student.imie || !student.nazwisko || student.rocznik <= 0) {
            alert("Proszę wypełnić wszystkie pola poprawnymi danymi!");
            return;
        }
        addStudent(student);
        setStudent({ imie: "", nazwisko: "", rocznik: 0 });
    };

    return (
        <>
            <input
                type="text"
                name="imie"
                placeholder="Imię"
                value={student.imie}
                onChange={handleChange}
            />
            <input
                type="text"
                name="nazwisko"
                placeholder="Nazwisko"
                value={student.nazwisko}
                onChange={handleChange}
            />
            <input
                type="number"
                name="rocznik"
                placeholder="Rocznik"
                value={student.rocznik}
                onChange={handleChange}
            />
            <button onClick={handleSubmit}>Dodaj</button>
        </>
    );
};

export default Dodawanie;
