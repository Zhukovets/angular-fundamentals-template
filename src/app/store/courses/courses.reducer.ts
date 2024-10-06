import { Action, createReducer, on } from '@ngrx/store';
import * as CoursesActions from './courses.actions'
import { Course } from '@app/models/course.model';

export const coursesFeatureKey = 'courses';

// Add your code here

export interface CoursesState {
    allCourses: Course[];
    course: Course | null;
    isAllCourseLoading: boolean;
    isSingleCourseLoading: boolean;
    isSearchState: boolean;
    errorMessage: Error | null;
    // Add your code here
}

export const initialState: CoursesState = {
    allCourses: [],
    course: null,
    isAllCourseLoading: false,
    isSingleCourseLoading: false,
    isSearchState: false,
    errorMessage: null,
    // Add your code here
};

export const coursesReducer = createReducer(
    initialState,

    on(CoursesActions.requestAllCourses, (state) => ({
        ...state,
        isAllCourseLoading: true,
        errorMessage: null
    })),
    on(CoursesActions.requestAllCoursesSuccess, (state, {courses}) => ({
        ...state,
        allCourses: courses,
        isAllCourseLoading: false,
        errorMessage: null
    })),
    on (CoursesActions.requestAllCoursesFail, (state, {error}) => ({
        ...state,
        isAllCourseLoading: true,
        errorMessage: error,
    })),

    on(CoursesActions.requestSingleCourse, (state) => ({
        ...state,
        isSingleCourseLoading: true,
        errorMessage: null,
    })),
    on(CoursesActions.requestSingleCourseSuccess, (state, {course}) => ({
        ...state,
        course: course,
        isSingleCourseLoading: false,
        errorMessage: null,
    
    })),
    on(CoursesActions.requestSingleCourseFail, (state, {error}) => ({
        ...state,
        isSingleCourseLoading: false,
        errorMessage: error,
    })),

    on(CoursesActions.requestFilteredCoursesSuccess, (state, { courses }) => ({
        ...state,
        allCourses: courses, // or wherever you want to store the filtered result
    })),

    on(CoursesActions.requestDeleteCourseSuccess, (state) => ({
        ...state,
        errorMessage: null,
    })),
    on(CoursesActions.requestDeleteCourseFail, (state, {error}) => ({
        ...state,
        errorMessage: error,
    })),

    on(CoursesActions.requestEditCourseSuccess, (state, { course }) => ({
        ...state,
        allCourses: state.allCourses.map(c => c.id === course.id ? course : c),
        errorMessage: null
    })),
    on(CoursesActions.requestEditCourseFail, (state, { error }) => ({
        ...state,
        errorMessage: error
    })),

    on(CoursesActions.requestCreateCourseSuccess, (state, { course }) => ({
        ...state,
        allCourses: [...state.allCourses, course],
        errorMessage: null
    })),
    on(CoursesActions.requestCreateCourseFail, (state, { error }) => ({
        ...state,
        errorMessage: error
    }))

); // Add your code here

export const reducer = (state: CoursesState, action: Action): CoursesState => coursesReducer(state, action);
