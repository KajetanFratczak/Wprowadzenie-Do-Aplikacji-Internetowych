function getRandomItem(arr) 
{
  const randomIndex = Math.floor(Math.random() * arr.length);
  const item = arr[randomIndex];
  return item;
}

// Funkcja wybierająca ćwiczenia dla konkretnej partii mięśniowej
function addExercisesForMuscleGroup(dzien, partia, rep_range, ciezar, counter) 
{
  const partia_miesniowa = exercises.find((group) => group.name === partia);

  if (partia_miesniowa) 
  {
    for (let i = 0; i < counter; i++) 
      {
        const nazwa_cwiczenia = getRandomItem(partia_miesniowa.exercises);
        dzien.exercises.push({
          nazwa: nazwa_cwiczenia,
          reps: rep_range,
          waga: ciezar,
        });
    }
  } 
  else 
  {
    console.error("Nieznana partia mięśniowa:", partia);
  }
}

function generatePlan() 
{
  const poziom_zaaw = document.getElementById("poziom_zaaw").value;
  const cel = document.getElementById("cel").value;
  const plan_generator = document.getElementById("plan_generator");

  let liczba_dni = 0;
  let muscle_groups = [];
  if (poziom_zaaw === "poczatkujacy") 
  {
    liczba_dni = 3;
    muscle_groups = [
      { group: "Klatka i Triceps" },
      { group: "Biceps i Plecy" },
      { group: "Barki i Nogi" },
    ];
  } 
  else if (poziom_zaaw === "srednio_zaawansowany") 
  {
    liczba_dni = 4;
    muscle_groups = [
      { group: "Klatka i Triceps" },
      { group: "Nogi" },
      { group: "Barki i Biceps" },
      { group: "Plecy i Brzuch" },
    ];
  } 
  else 
  {
    liczba_dni = 5;
    muscle_groups = [
      { group: "Nogi" },
      { group: "Klatka i Triceps" },
      { group: "Plecy" },
      { group: "Barki" },
      { group: "Biceps i Brzuch" },
    ];
  }

  const workout_plan = [];
  let ciezar;
  let rep_range;
 
  if (cel == "sila") 
  {
    ciezar = "80% max ciezaru";
    rep_range = "6 - 8";
  }
  else if (cel == "wytrzymalosc") 
  {
    ciezar = "60% max ciezaru";
    rep_range = "10 - 12";
  }
  let workout_day = 0;
  for (let day = 1; day <= 7; day++) 
  {
    if (
      (liczba_dni == 3 && (day == 1 || day == 3 || day == 5 || day == 7)) ||
      (liczba_dni == 4 && (day == 3 || day == 5 || day == 7)) ||
      (liczba_dni == 5 && (day == 3 || day == 7))
    ) 
    {
      workout_plan.push({ day: `Dzień ${day}`, type: "Rest Day" });
    } 
    else 
    {
      const partie = muscle_groups[workout_day].group;
      const dzien = {
        day: `Dzień ${day} ${partie}`,
        exercises: [],
        type: "Workout Day",
      };

      // Dodaj ćwiczenia na podstawie partii mięśniowej
      if (partie.includes("Biceps"))
        addExercisesForMuscleGroup(dzien, "biceps", rep_range, ciezar, 3);
      if (partie.includes("Triceps"))
        addExercisesForMuscleGroup(dzien, "triceps", rep_range, ciezar, 3);
      if (partie.includes("Nogi")) 
      {
        addExercisesForMuscleGroup(dzien, "quadriceps", rep_range, ciezar, 1);
        addExercisesForMuscleGroup(dzien, "hamstring_glutes", rep_range, ciezar, 1);
        addExercisesForMuscleGroup(dzien, "calves", rep_range, ciezar, 1);
      }
      if (partie.includes("Plecy"))
        addExercisesForMuscleGroup(dzien, "back", rep_range, ciezar, 3);
      if (partie.includes("Brzuch"))
        addExercisesForMuscleGroup(dzien, "abs", rep_range, ciezar, 3);
      if (partie.includes("Klatka"))
        addExercisesForMuscleGroup(dzien, "chest", rep_range, ciezar, 3);
      if (partie.includes("Barki"))
        addExercisesForMuscleGroup(dzien, "shoulders", rep_range, ciezar, 3);

      workout_plan.push(dzien);
      workout_day++;
    }
  } 
  displayPlan(workout_plan, plan_generator);
}

function displayPlan(plan, container) 
{
  // Czyścimy zawartość kontenera DOM
  container.innerHTML = "";

  plan.forEach(function (day) {
    const dzien = document.createElement("div");

    const nazwa_dnia = document.createElement("h3");
    nazwa_dnia.className = "nazwa_dnia";
    nazwa_dnia.textContent = day.day + ": " + day.type;
    dzien.appendChild(nazwa_dnia);

    if (day.exercises && day.exercises.length > 0) 
    {
      const szczegoly_treningu = document.createElement("div");
      szczegoly_treningu.style.display = "none"; // Ukrywamy poszczególne ćwiczenia na początku - można kliknąć i je odkryć

      day.exercises.forEach(function (exercise) 
      {
        const szczegoly_cwiczenia = document.createElement("p");
        szczegoly_cwiczenia.textContent = exercise.nazwa + " : " + exercise.reps + " powtórzeń, " + exercise.waga;
        szczegoly_treningu.appendChild(szczegoly_cwiczenia);
      });

      nazwa_dnia.onclick = function () 
      {
        if (szczegoly_treningu.style.display === "none") 
        {
          szczegoly_treningu.style.display = "block";
        } 
        else 
        {
          szczegoly_treningu.style.display = "none";
        }
      };

      nazwa_dnia.onmouseover = function ()
      {
        nazwa_dnia.style.cursor = "pointer";
      }
      

      dzien.appendChild(szczegoly_treningu);
    }

    container.appendChild(dzien);
  });
}
