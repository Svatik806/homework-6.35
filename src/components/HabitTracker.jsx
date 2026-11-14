import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllHabits,
  selectCompletedTodayCount,
  selectFilteredHabits,
} from "../redux/habitsSelectors";
import { addHabit, deleteHabit, setFilter, toggleHabit } from "../redux/habitsSlice";

const HabitTracker = () => {
  const dispatch = useDispatch();

  const habits = useSelector(selectAllHabits);
  const completedCount = useSelector(selectCompletedTodayCount);
  const filteredHabits = useSelector(selectFilteredHabits)
  const currentFilter = useSelector(state => state.habits.filter)

  const [text, setText] = useState("");

  const handleAdd = (event) => {
    event.preventDefault();
    if (!text.trim()) return;

    dispatch(addHabit(text));
    setText("");
  };

  const filters = [
    { key: "ALL", label: "Всі" },
    { key: "ACTIVE", label: "Активні" },
    { key: "COMPLETED", label: "Виконані" },
  ]

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md border border-gray-200 mt-10">
      <h1 className="text-xl font-bold text-gray-800 mb-1">Трекер звичок</h1>
      <p className="text-sm text-gray-600 mb-4">
        Виконано сьогодні:{" "}
        <span className="font-semibold text-green-600">
          {completedCount} із {habits.length}
        </span>
      </p>

      <div className="flex gap-2 mb-4">
        {filters.map(({ key, label }) => {
          const isActive = currentFilter === key

          return (
            <button key={key} onClick={() => dispatch(setFilter(key))} className={`px-3 py-1 text-sm rounded border transition-colors ${isActive ? "bg-blue-600 text-white border-blue-600 font-medium" : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
              }`}>{label}</button>
          )
        })}
      </div>

      <form className="flex gap-2 mb-4" onClick={handleAdd}>
        <input
          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          placeholder="Нова звичка..."
          onChange={(event) => setText(event.target.value)}
          value={text}
          type="text"
          maxLength={39}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-sm text-white font-medium rounded hover:bg-blue-700 transition-colors cursor-pointer"
          type="submit"
        >
          Додати
        </button>
      </form>

      {filteredHabits.length === 0 ? (
        <p className="text-sm text-gray-400 py-2">Список звичок порожній</p>
      ) : (
        <ul className="space-y-2">
          {filteredHabits.map((habit) => (
            <li
              key={habit.id}
              className={`flex items-center justify-between p-3 rounded border transition-colors ${habit.completedToday
                ? "bg-green-50 border-green-200"
                : "bg-white border-gray-300 hover:bg-gray-50"
                }`}
            >
              <div
                className="flex items-center gap-3 cursor-pointer flex-1 select-none"
                onClick={() => dispatch(toggleHabit(habit.id))}
              >
                <div
                  className={`flex items-center justify-center transition-colors w-5 h-5 ${habit.completedToday
                    ? "bg-green-600 text-white"
                    : "border-2 bg-white border-gray-300"
                    }`}
                >
                  {habit.completedToday && (
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <div>
                  <p
                    className={`text-sm font-medium ${habit.completedToday
                      ? "text-green-900 line-through"
                      : "text-gray-800"
                      }`}
                  >
                    {habit.title}
                  </p>
                </div>
              </div>

              <button
                onClick={() => dispatch(deleteHabit(habit.id))}
                className="text-gray-400 hover:text-red-600 text-sm px-2 py-1 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HabitTracker;
