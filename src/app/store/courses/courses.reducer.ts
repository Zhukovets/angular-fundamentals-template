// @ts-nocheck
import { Action } from '@ngrx/store';

// Add your code here
export let coursesFeatureKey

export interface CoursesState {
    allCourses: unknown; // If necessary, replace the type
    course: unknown; // If necessary, replace the type
    isAllCoursesLoading: boolean;
    isSingleCourseLoading: boolean;
    isSearchState: boolean;
    errorMessage: string;
}

export const initialState: CoursesState = {
    allCourses: null,
    course: null,
    isAllCoursesLoading: false,
    isSingleCourseLoading: false,
    isSearchState: false,
    errorMessage: ''
};

export let coursesReducer; // Add your code here

export let reducer = (state: CoursesState, action: Action): CoursesState => coursesReducer(state, action);
