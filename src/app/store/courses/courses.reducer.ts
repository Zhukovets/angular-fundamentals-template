import { Action, createReducer, on } from '@ngrx/store';
import * as CoursesActions from './courses.actions';

export const coursesFeatureKey = 'courses';

export interface CoursesState {
  allCourses: any[];
  course: any | null;
  isAllCoursesLoading: boolean;
  isSingleCourseLoading: boolean;
  isSearchState: boolean;
  errorMessage: string | null;
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
    errorMessage: "",
  })),
  on(CoursesActions.requestAllCoursesSuccess, (state, { courses }) => ({
    ...state,
    allCourses: courses,
    isAllCoursesLoading: false,
    errorMessage: "",
  })),
  on(CoursesActions.requestAllCoursesFail, (state, { error }) => ({
    ...state,
    isAllCoursesLoading: false,
    errorMessage: error,
  })),

  on(CoursesActions.requestSingleCourse, (state) => ({
    ...state,
    isSingleCourseLoading: true,
    errorMessage: "",
  })),
  on(CoursesActions.requestSingleCourseSuccess, (state, { course }) => ({
    ...state,
    course,
    isSingleCourseLoading: false,
    errorMessage: "",
  })),
  on(CoursesActions.requestSingleCourseFail, (state, { error }) => ({
    ...state,
    isSingleCourseLoading: false,
    errorMessage: error,
  })),

  on(CoursesActions.requestFilteredCourses, (state) => ({
    ...state,
    isAllCoursesLoading: true,
    isSearchState: true,
    errorMessage: "",
  })),
  on(CoursesActions.requestFilteredCoursesSuccess, (state, { courses }) => ({
    ...state,
    allCourses: courses,
    isAllCoursesLoading: false,
    isSearchState: true,
    errorMessage: "",
  })),
  on(CoursesActions.requestFilteredCoursesFail, (state, { error }) => ({
    ...state,
    isAllCoursesLoading: false,
    isSearchState: true,
    errorMessage: error,
  })),

  on(CoursesActions.requestDeleteCourse, (state) => ({
    ...state,
    errorMessage: "",
  })),
  on(CoursesActions.requestDeleteCourseSuccess, (state, { id }) => ({
    ...state,
    allCourses: state.allCourses.filter((c) => c.id !== id),
    errorMessage: "",
  })),
  on(CoursesActions.requestDeleteCourseFail, (state, { error }) => ({
    ...state,
    errorMessage: error,
  })),

  on(CoursesActions.requestEditCourse, (state) => ({
    ...state,
    errorMessage: "",
  })),
  on(CoursesActions.requestEditCourseSuccess, (state, { course }) => ({
    ...state,
    allCourses: state.allCourses.map((c) => (c.id === course.id ? course : c)),
    course,
    errorMessage: "",
  })),
  on(CoursesActions.requestEditCourseFail, (state, { error }) => ({
    ...state,
    errorMessage: error,
  })),

  on(CoursesActions.requestCreateCourse, (state) => ({
    ...state,
    errorMessage: "",
  })),
  on(CoursesActions.requestCreateCourseSuccess, (state, { course }) => ({
    ...state,
    allCourses: [...state.allCourses, course],
    course,
    errorMessage: "",
  })),
  on(CoursesActions.requestCreateCourseFail, (state, { error }) => ({
    ...state,
    errorMessage: error,
  }))
);

export const coursesReducer = reducerLogic;

export const reducer = (state: CoursesState | undefined, action: Action): CoursesState =>
  reducerLogic(state, action);
 