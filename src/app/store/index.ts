import {ActionReducerMap} from "@ngrx/store";
import {coursesReducer, CoursesState} from "@app/store/courses/courses.reducer";
import {CoursesEffects} from "@app/store/courses/courses.effects";

export interface State {
    courses: CoursesState
}

export const reducers: ActionReducerMap<State> = {
    courses: coursesReducer
};
export const effects = [
    CoursesEffects
];