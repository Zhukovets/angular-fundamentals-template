import { createReducer, on } from "@ngrx/store";
import * as CoursesActions from "./courses.actions";
import { Course } from "@app/shared/models/course.model";

export const coursesFeatureKey = "courses";

// Define the CoursesState interface
export interface CoursesState {
  allCourses: Course[];
  course: any | null;
  isAllCoursesLoading: boolean;
  isSingleCourseLoading: boolean;
  isSearchState: boolean;
  errorMessage: string | null;
}

// Initial State
export const initialState: CoursesState = {
  allCourses: [],
  course: null,
  isAllCoursesLoading: false,
  isSingleCourseLoading: false,
  isSearchState: false,
  errorMessage: null,
};

// Reducer function
export const coursesReducer = createReducer(
  initialState,

  // Handle all courses request
  on(CoursesActions.requestAllCourses, (state) => ({
    ...state,
    isAllCoursesLoading: true,
    errorMessage: null,
  })),
  on(CoursesActions.requestAllCoursesSuccess, (state, { courses }) => ({
    ...state,
    allCourses: courses,
    isAllCoursesLoading: false,
    errorMessage: null,
  })),
  on(CoursesActions.requestAllCoursesFail, (state, { error }) => ({
    ...state,
    isAllCoursesLoading: false,
    errorMessage: error,
  })),

  // Handle single course request
  on(CoursesActions.requestSingleCourse, (state) => ({
    ...state,
    isSingleCourseLoading: true,
    errorMessage: null,
  })),
  on(CoursesActions.requestSingleCourseSuccess, (state, { course }) => {
    console.log("Course:", course); // Dodaj console.log tutaj
    return {
      ...state,
      course,
      isSingleCourseLoading: false,
      errorMessage: null,
    };
  }),
  on(CoursesActions.requestSingleCourseFail, (state, { error }) => ({
    ...state,
    isSingleCourseLoading: false,
    errorMessage: error,
  })),

  // Handle delete course
  on(CoursesActions.requestDeleteCourseSuccess, (state) => ({
    ...state,
    errorMessage: null,
  })),
  on(CoursesActions.requestDeleteCourseFail, (state, { error }) => ({
    ...state,
    errorMessage: error,
  })),

  // Handle edit course
  on(CoursesActions.requestEditCourseSuccess, (state, { course }) => ({
    ...state,
    course,
    errorMessage: null,
  })),
  on(CoursesActions.requestEditCourseFail, (state, { error }) => ({
    ...state,
    errorMessage: error,
  })),

  // Handle create course
  on(CoursesActions.requestCreateCourseSuccess, (state, { course }) => ({
    ...state,
    course,
    errorMessage: null,
  })),
  on(CoursesActions.requestCreateCourseFail, (state, { error }) => ({
    ...state,
    errorMessage: error,
  }))
);
