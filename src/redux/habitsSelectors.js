import { createSelector } from "@reduxjs/toolkit";

const selectHabitsItems = (state) => state.habits.items;
const selectHabitsFilter = (state) => state.habits.filter;

export const selectAllHabits = createSelector(
  [selectHabitsItems],
  (items) => items
);

export const selectCompletedTodayCount = createSelector(
  [selectHabitsItems],
  (items) => items.filter((item) => item.completedToday).length
);

export const selectFilteredHabits = createSelector(
  [selectHabitsItems, selectHabitsFilter],
  (items, filter) => {
    switch (filter) {
      case "ACTIVE":
        return items.filter((item) => !item.completedToday);
      case "COMPLETED":
        return items.filter((item) => item.completedToday);
      default:
        return items;
    }
  }
);
