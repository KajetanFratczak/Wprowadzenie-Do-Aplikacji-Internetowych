import React, {useState} from 'react';

const Studenci = () => {

    interface Student
    {
        imie: string,
        nazwisko: string,
        rocznik: number;
    }

    const [Students, setStudents] = useState<Student[]>([
        {imie: "Kajetan", nazwisko: "Frątczak", rocznik: 2005},
        {imie: "Konrad", nazwisko: "Szymański", rocznik: 2005},
        {imie: "Kacper", nazwisko: "Urbański", rocznik: 2004}
    ]);

    return (
        <>
        <table>
            <thead>
                <tr>
                    <th >Imię</th>
                    <th>Nazwisko</th>
                    <th>Rocznik</th>
                </tr>
            </thead>
            <tbody>
                {Students.map((student, index) => (
                    <tr key={index}>
                        <td>{student.imie}</td>
                        <td>{student.nazwisko}</td>
                        <td>{student.rocznik}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    );
};

export default Studenci;