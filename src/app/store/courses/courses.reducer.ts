import { Course } from '@app/shared/models/course';
import { Action, createReducer, on } from '@ngrx/store';
import * as CourseActions from './courses.actions';

// Add your code here
export const coursesFeatureKey = 'courses';

export interface CoursesState {
    // Add your code here
    allCourses: Course[],
    course: Course,
    isAllCoursesLoading: boolean,
    isSingleCourseLoading: boolean,
    isSearchState: boolean,
    errorMessage: String
}

export const initialState: CoursesState = {
    // Add your code here
    allCourses: [],
    course: {} as Course,
    isAllCoursesLoading: false,
    isSingleCourseLoading: false,
    isSearchState: false,
    errorMessage: ''
};

export const coursesReducer = createReducer(
    initialState,
    on(CourseActions.requestAllCourses, (state) => ({ ...state })),
    on(CourseActions.requestAllCoursesSuccess, (state, { courses }) => ({
        ...state,
        allCourses: courses
    })),
    on(CourseActions.requestAllCoursesFail, (state, { error }) => ({
        ...state,
        errorMessage: error
    })),

    on(CourseActions.requestSingleCourse, (state, { id }) => ({ ...state })),
    on(CourseActions.requestSingleCourseSuccess, (state, { course }) => ({
        ...state,
        course: course
    })),
    on(CourseActions.requestSingleCourseFail, (state, { error }) => ({
        ...state,
        errorMessage: error
    })),

    on(CourseActions.requestFilteredCourse, (state, { title }) => ({ ...state })),
    on(CourseActions.requestFilteredCourseSuccess, (state, { courses }) => ({
        ...state,
        courses: courses
    })),
    on(CourseActions.requestFilteredCourseFail, (state, { error }) => ({
        ...state,
        errorMessage: error
    })),

    on(CourseActions.requestDeleteCourse, (state, { id }) => ({ ...state })),
    on(CourseActions.requestDeleteCourseSuccess, (state) => ({ ...state })),
    on(CourseActions.requestDeleteCourseFail, (state, { error }) => ({
        ...state,
        errorMessage: error
    })),

    on(CourseActions.requestEditCourse, (state, { id, course }) => ({ ...state })),
    on(CourseActions.requestEditCourseSuccess, (state, { course }) => ({ ...state, course })),
    on(CourseActions.requestEditCourseFail, (state, { error }) => ({
        ...state,
        errorMessage: error
    })),

    on(CourseActions.requestCreateCourse, (state, { course }) => ({ ...state })),
    on(CourseActions.requestCreateCourseSuccess, (state, { course }) => ({ ...state, course })),
    on(CourseActions.requestCreateCourseFail, (state, { error }) => ({
        ...state,
        errorMessage: error
    })),
);

export const reducer = (state: CoursesState, action: Action): CoursesState => coursesReducer(state, action);