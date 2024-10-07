// Add your code here
import { createSelector, createFeatureSelector } from "@ngrx/store";
import { CoursesState } from "./courses.reducer";

// Feature Selector
export const selectCoursesState =
  createFeatureSelector<CoursesState>("courses");

// Selectors
export const isAllCoursesLoadingSelector = createSelector(
  selectCoursesState,
  (state) => state.isAllCoursesLoading
);

export const isSearchingStateSelector = createSelector(
  selectCoursesState,
  (state) => state.isSearchState
);

export const isSingleCourseLoadingSelector = createSelector(
  selectCoursesState,
  (state) => state.isSingleCourseLoading
);

export const getAllCourses = createSelector(
  selectCoursesState,
  (state) => state.allCourses
);

export const getCourse = createSelector(
  selectCoursesState,
  (state) => state.course
);

export const getErrorMessage = createSelector(
  selectCoursesState,
  (state) => state.errorMessage
);
