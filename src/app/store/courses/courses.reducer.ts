import { Action, createReducer, on } from '@ngrx/store';
import * as CoursesActions from './courses.actions';

// Add your code here
export const coursesFeatureKey = 'courses';

export interface CoursesState {
    // Add your code here
    allCourses: any[];          
  course: any | null;          
  isAllCoursesLoading: boolean; 
  isSingleCourseLoading: boolean; 
  isSearchState: boolean;       
  errorMessage: string | null;  
}

export const initialState: CoursesState = {
    // Add your code here
    allCourses: [],
    course: null,
    isAllCoursesLoading: false,
    isSingleCourseLoading: false,
    isSearchState: false,
    errorMessage: null
};

export const coursesReducer = createReducer(
    initialState,

    on(CoursesActions.requestAllCourses, (state) => ({
        ...state,
        isAllCoursesLoading: true
    })),
    on(CoursesActions.requestAllCoursesSuccess, (state, { courses }) => ({
        ...state,
        allCourses: courses,
        isAllCoursesLoading: false,
        errorMessage: null
    })),
    on(CoursesActions.requestAllCoursesFail, (state, { error }) => ({
        ...state,
        isAllCoursesLoading: false,
        errorMessage: error
    })),

    on(CoursesActions.requestSingleCourse, (state) => ({
        ...state,
        isSingleCourseLoading: true
    })),
    on(CoursesActions.requestSingleCourseSuccess, (state, { course }) => ({
        ...state,
        course,
        isSingleCourseLoading: false,
        errorMessage: null
    })),
    on(CoursesActions.requestSingleCourseFail, (state, { error }) => ({
        ...state,
        isSingleCourseLoading: false,
        errorMessage: error
    })),

    on(CoursesActions.requestFilteredCourses, (state) => ({
        ...state,
        isSearchState: true
    })),
    on(CoursesActions.requestFilteredCoursesSuccess, (state, { courses }) => ({
        ...state,
        allCourses: courses,
        isSearchState: false,
        errorMessage: null
    })),
    on(CoursesActions.requestFilteredCoursesFail, (state, { error }) => ({
        ...state,
        isSearchState: false,
        errorMessage: error
    }))
);

export const reducer = (state: CoursesState, action: Action): CoursesState => coursesReducer(state, action);