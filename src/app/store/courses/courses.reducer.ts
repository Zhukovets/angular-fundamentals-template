import { Action, createReducer, on } from '@ngrx/store';
import * as CoursesActions from './courses.actions';

export const coursesFeatureKey = 'courses';

export interface CoursesState {
    allCourses: any[];
    course: any | null;
    isAllCoursesLoading: boolean;
    isSingleCourseLoading: boolean;
    isSearchState: boolean;
    errorMessage: any;
}

export const initialState: CoursesState = {
    allCourses: [],
    course: null,
    isAllCoursesLoading: false,
    isSingleCourseLoading: false,
    isSearchState: false,
    errorMessage: null,
};

const reducerLogic = createReducer(
    initialState,

    on(CoursesActions.requestAllCourses, (state) => ({ 
        ...state, 
        isAllCoursesLoading: true, 
        isSearchState: false,
        errorMessage: null 
    })),
    on(CoursesActions.requestFilteredCourses, (state) => ({ 
        ...state, 
        isAllCoursesLoading: true, 
        isSearchState: true,
        errorMessage: null 
    })),
    on(CoursesActions.requestSingleCourse, (state) => ({ 
        ...state, 
        isSingleCourseLoading: true, 
        errorMessage: null 
    })),
    on(
        CoursesActions.requestDeleteCourse, 
        CoursesActions.requestEditCourse, 
        CoursesActions.requestCreateCourse, 
        (state) => ({ ...state, errorMessage: null })
    ),

    on(CoursesActions.requestAllCoursesSuccess, CoursesActions.requestFilteredCoursesSuccess, (state, { courses }) => ({
        ...state,
        isAllCoursesLoading: false,
        allCourses: courses,
    })),

    on(CoursesActions.requestSingleCourseSuccess, (state, { course }) => ({
        ...state,
        isSingleCourseLoading: false,
        course: course,
    })),
    
    on(CoursesActions.requestCreateCourseSuccess, (state, { course }) => ({
        ...state,
        allCourses: [...state.allCourses, course],
    })),

    on(CoursesActions.requestEditCourseSuccess, (state, { course }) => ({
        ...state,
        allCourses: state.allCourses.map((c) => (c.id === c.id ? course : c)),
    })),

    on(CoursesActions.requestDeleteCourseSuccess, (state) => ({
        ...state,
    })),

    on(CoursesActions.requestAllCoursesFail, CoursesActions.requestFilteredCoursesFail, (state, { error }) => ({
        ...state,
        isAllCoursesLoading: false,
        errorMessage: error,
    })),

    on(CoursesActions.requestSingleCourseFail, (state, { error }) => ({
        ...state,
        isSingleCourseLoading: false,
        errorMessage: error,
    })),
    
    on(
        CoursesActions.requestDeleteCourseFail,
        CoursesActions.requestEditCourseFail,
        CoursesActions.requestCreateCourseFail,
        (state, { error }) => ({ ...state, errorMessage: error })
    )
);

export const coursesReducer = reducerLogic;