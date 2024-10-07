// src/app/store/index.ts
import { ActionReducerMap } from "@ngrx/store";
import { coursesReducer, CoursesState } from "./courses.reducer";
import { CoursesEffects } from "./courses.effects";

// Define the global application state interface
export interface State {
  courses: CoursesState;
}

// Combine all reducers
export const reducers: ActionReducerMap<State> = {
  courses: coursesReducer,
};

// Combine all effects
export const effects = [CoursesEffects];
