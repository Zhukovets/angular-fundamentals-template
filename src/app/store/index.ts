import { ActionReducerMap } from "@ngrx/store";
import { CoursesState, coursesReducer } from "./courses/courses.reducer";
import { CoursesEffects } from "./courses/courses.effects";

export interface State {
  courses: CoursesState;
}
export const reducers: ActionReducerMap<State> = {
  courses: coursesReducer,
};
export const effects = [CoursesEffects];
