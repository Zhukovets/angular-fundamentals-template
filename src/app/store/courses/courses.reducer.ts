import { Course } from "@app/models/course.model";
import { Action, createReducer, on } from "@ngrx/store";
import {
  requestAllCourses,
  requestAllCoursesFail,
  requestAllCoursesSuccess,
  requestCreateCourse,
  requestCreateCourseFail,
  requestCreateCourseSuccess,
  requestDeleteCourse,
  requestDeleteCourseFail,
  requestDeleteCourseSuccess,
  requestEditCourse,
  requestEditCourseFail,
  requestEditCourseSuccess,
  requestFilteredCourses,
  requestFilteredCoursesFail,
  requestFilteredCoursesSuccess,
  requestSingleCourse,
  requestSingleCourseFail,
  requestSingleCourseSuccess,
} from "./courses.actions";

// Add your code here
export const coursesFeatureKey = "courses";

export interface CoursesState {
  // Add your code here
  allCourses: Course[] | null;
  filteredCourses: Course[] | null;
  course: Course | null;
  selectedCourseId: string | null;
  searchTitle: string | null;
  isAllCoursesLoading: boolean;
  isSingleCourseLoading: boolean;
  isSearchState: boolean;
  isDeleting: boolean;
  isCreating: boolean;
  errorMessage: string | null;
}

export const initialState: CoursesState = {
  // Add your code here
  allCourses: null,
  filteredCourses: null,
  course: null,
  selectedCourseId: null,
  searchTitle: null,
  isAllCoursesLoading: false,
  isSingleCourseLoading: false,
  isSearchState: false,
  isDeleting: false,
  isCreating: false,
  errorMessage: null,
};

export const coursesReducer = createReducer(
  initialState,

  on(requestAllCourses, (state) => ({
    ...state,
    isAllCoursesLoading: true,
    errorMessage: null,
  })),

  on(requestAllCoursesSuccess, (state, { courses }) => ({
    ...state,
    allCourses: courses,
    isAllCoursesLoading: false,
    errorMessage: null,
  })),

  on(requestAllCoursesFail, (state, { error }) => ({
    ...state,
    isAllCoursesLoading: false,
    errorMessage: error.message,
  })),

  on(requestSingleCourse, (state, { id }) => ({
    ...state,
    isSingleCourseLoading: true,
    selectedCourseId: id,
    errorMessage: null,
  })),

  on(requestSingleCourseSuccess, (state, { course }) => ({
    ...state,
    course: course,
    isSingleCourseLoading: false,
    errorMessage: null,
  })),

  on(requestSingleCourseFail, (state, { error }) => ({
    ...state,
    isSingleCourseLoading: false,
    errorMessage: error.message,
  })),

  on(requestFilteredCourses, (state, { title }) => ({
    ...state,
    isSearchState: true,
    searchTitle: title,
    errorMessage: null,
  })),

  on(requestFilteredCoursesSuccess, (state, { courses }) => ({
    ...state,
    filteredCourses: courses,
    isSearchState: false,
    errorMessage: null,
  })),

  on(requestFilteredCoursesFail, (state, { error }) => ({
    ...state,
    isSearchState: false,
    errorMessage: error.message,
  })),

  on(requestDeleteCourse, (state, { id }) => ({
    ...state,
    selectedCourseId: id,
    isDeleting: true,
    errorMessage: null,
  })),

  on(requestDeleteCourseSuccess, (state, { course }) => ({
    ...state,
    allCourses: state.allCourses
      ? state.allCourses.filter((c: Course) => c.id !== course.id)
      : null,
    isDeleting: false,
    errorMessage: null,
  })),

  on(requestDeleteCourseFail, (state, { error }) => ({
    ...state,
    isDeleting: false,
    errorMessage: error.message,
  })),

  on(requestEditCourse, (state, { body, id }) => ({
    ...state,
    isSingleCourseLoading: true,
    errorMessage: null,
  })),

  on(requestEditCourseSuccess, (state, { course }) => ({
    ...state,
    isSingleCourseLoading: false,
    allCourses: state.allCourses
      ? state.allCourses.map((c) => (c.id === course.id ? course : c))
      : null,
    course,
    errorMessage: null,
  })),

  on(requestEditCourseFail, (state, { error }) => ({
    ...state,
    isSingleCourseLoading: false,
    errorMessage: error.message,
  })),

  on(requestCreateCourse, (state, { course }) => ({
    ...state,
    course: course,
    isCreating: true,
    errorMessage: null,
  })),

  on(requestCreateCourseSuccess, (state, { course }) => ({
    ...state,
    allCourses: state.allCourses ? [...state.allCourses, course] : [course],
    isCreating: false,
    errorMessage: null,
  })),

  on(requestCreateCourseFail, (state, { error }) => ({
    ...state,
    isCrating: false,
    errorMessage: error.message,
  }))
);

export const reducer = (state: CoursesState, action: Action): CoursesState =>
  coursesReducer(state, action);
