// @ts-nocheck
// Add your code here
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { coursesFeatureKey, CoursesState } from "./courses.reducer";

// Select the courses feature state
export let selectCoursesState =
  createFeatureSelector<CoursesState>(coursesFeatureKey);

// Selectors for loading states
export let isAllCoursesLoadingSelector = createSelector(
  selectCoursesState,
  (state: CoursesState) => {
    console.log("isAllCoursesLoadingSelector  state:", state);
    return state.isAllCoursesLoading;
  }
);

export const isSearchingStateSelector = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.isSearchState
);

export const isSingleCourseLoadingSelector = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.isSingleCourseLoading
);

// Selector for getting all courses
export const getAllCourses = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.allCourses
);

// Alias for getAllCourses
export const getCourses = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.allCourses
);

// Selector for getting a specific course
export const getCourse = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.course
);

// Selector for getting the error message
export const getErrorMessage = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.errorMessage
);

// Authors selectors
export const getAuthors = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.authors
);

export const isAuthorsLoadingSelector = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.isAuthorsLoading
);
