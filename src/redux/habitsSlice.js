import { createSlice } from "@reduxjs/toolkit";

const loadHabits = () => {
  try {
    const data = localStorage.getItem("habits");
    return data
      ? JSON.parse(data)
      : [
        { id: 1, title: "Випити каву зранку", completedToday: false },
        { id: 2, title: "Читати книгу 20 хвилин", completedToday: true },
        { id: 3, title: "Руханка 15 хвилин", completedToday: false },
      ];
  } catch (error) {
    return [];
  }
};

const saveHabits = (items) => {
  try {
    localStorage.setItem("habits", JSON.stringify(items));
  } catch (error) {
    console.error(error);
  }
};

const initialState = {
  items: loadHabits(),
  filter: "ALL"
};

const habitsSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    addHabit: {
      reducer: (state, action) => {
        state.items.push(action.payload);
        saveHabits(state.items);
      },
      prepare: (title) => ({
        payload: {
          id: Date.now(),
          title,
          completedToday: false,
        },
      }),
    },
    toggleHabit: (state, action) => {
      const habit = state.items.find((item) => item.id === action.payload);
      if (habit) {
        habit.completedToday = !habit.completedToday;
        saveHabits(state.items);
      }
    },
    deleteHabit: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveHabits(state.items);
    },
    setFilter: (state, action) => { 
      state.filter = action.payload
    }
  },
});

export const { addHabit, toggleHabit, deleteHabit, setFilter } = habitsSlice.actions;
export default habitsSlice.reducer;
