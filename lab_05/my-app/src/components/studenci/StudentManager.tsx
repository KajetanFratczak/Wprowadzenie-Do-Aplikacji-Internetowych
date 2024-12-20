import React, { useState } from 'react';
import Dodawanie from './Dodawanie';

const StudentManager = () => {
    interface Student {
        imie: string;
        nazwisko: string;
        rocznik: number;
    }

    const [students, setStudents] = useState<Student[]>([
        { imie: "Kajetan", nazwisko: "Frątczak", rocznik: 2005 },
        { imie: "Konrad", nazwisko: "Szymański", rocznik: 2005 },
        { imie: "Kacper", nazwisko: "Urbański", rocznik: 2004 },
    ]);

    const addStudent = (student: Student) => {
        setStudents([...students, student]);
    };

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th>Rocznik</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={index}>
                            <td>{student.imie}</td>
                            <td>{student.nazwisko}</td>
                            <td>{student.rocznik}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Dodawanie addStudent={addStudent} />
        </>
    );
};

export default StudentManager;
