// @ts-nocheck
import { Action, createReducer, on } from "@ngrx/store";
import { Course } from "@app/types/courseTypes";
import { Author } from "@app/types/authorTypes";
import * as CoursesActions from "./courses.actions";

// Add your code here
export let coursesFeatureKey = "courses";

export interface CoursesState {
  allCourses: Course[] | null;
  course: Course | null;
  isAllCoursesLoading: boolean;
  isSingleCourseLoading: boolean;
  isSearchState: boolean;
  errorMessage: string;
  authors: Author[];
  isAuthorsLoading: boolean;
}

export const initialState: CoursesState = {
  allCourses: null,
  course: null,
  isAllCoursesLoading: false,
  isSingleCourseLoading: false,
  isSearchState: false,
  errorMessage: "",
  authors: [],
  isAuthorsLoading: false,
};

export let coursesReducer = createReducer(
  initialState,

  on(CoursesActions.requestAllCourses, (state) => ({
    ...state,
    isAllCoursesLoading: true,
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
    course: course,
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
    isSearchState: true,
    isAllCoursesLoading: true,
    errorMessage: "",
  })),

  on(CoursesActions.requestFilteredCoursesSuccess, (state, { courses }) => ({
    ...state,
    allCourses: courses,
    isAllCoursesLoading: false,
    errorMessage: "",
  })),

  on(CoursesActions.requestFilteredCoursesFail, (state, { error }) => ({
    ...state,
    isAllCoursesLoading: false,
    errorMessage: error,
  })),

  on(CoursesActions.requestDeleteCourse, (state) => ({
    ...state,
    errorMessage: "",
  })),

  on(CoursesActions.requestDeleteCourseSuccess, (state, { id }) => ({
    ...state,
    errorMessage: "",
  })),

  on(CoursesActions.requestDeleteCourseFail, (state, { error }) => ({
    ...state,
    errorMessage: error,
  })),

  on(CoursesActions.requestEditCourse, (state) => ({
    ...state,
    isAllCoursesLoading: true,
    errorMessage: "",
  })),

  on(CoursesActions.requestEditCourseSuccess, (state, { course }) => ({
    ...state,
    course,
    isAllCoursesLoading: false,
    errorMessage: "",
  })),

  on(CoursesActions.requestEditCourseFail, (state, { error }) => ({
    ...state,
    isAllCoursesLoading: false,
    errorMessage: error,
  })),

  on(CoursesActions.requestCreateCourse, (state) => ({
    ...state,
    isAllCoursesLoading: true,
    errorMessage: "",
  })),

  on(CoursesActions.requestCreateCourseSuccess, (state, { course }) => ({
    ...state,
    isAllCoursesLoading: false,
    errorMessage: "",
  })),

  on(CoursesActions.requestCreateCourseFail, (state, { error }) => ({
    ...state,
    isAllCoursesLoading: false,
    errorMessage: error,
  })),

  // Authors actions
  on(CoursesActions.requestAllAuthors, (state) => ({
    ...state,
    isAuthorsLoading: true,
    errorMessage: "",
  })),

  on(CoursesActions.requestAllAuthorsSuccess, (state, { authors }) => ({
    ...state,
    authors: authors,
    isAuthorsLoading: false,
    errorMessage: "",
  })),

  on(CoursesActions.requestAllAuthorsFail, (state, { error }) => ({
    ...state,
    isAuthorsLoading: false,
    errorMessage: error,
  })),

  on(CoursesActions.requestCreateAuthor, (state) => ({
    ...state,
    isAuthorsLoading: true,
    errorMessage: "",
  })),

  on(CoursesActions.requestCreateAuthorSuccess, (state, { author }) => ({
    ...state,
    authors: [...state.authors, author],
    isAuthorsLoading: false,
    errorMessage: "",
  })),

  on(CoursesActions.requestCreateAuthorFail, (state, { error }) => ({
    ...state,
    isAuthorsLoading: false,
    errorMessage: error,
  }))
);

export let reducer = (state: CoursesState, action: Action): CoursesState => {
  return coursesReducer(state, action);
};
