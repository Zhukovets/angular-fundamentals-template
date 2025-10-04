import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CoursesState, coursesFeatureKey } from "./courses.reducer";

const selectCoursesState =
  createFeatureSelector<CoursesState>(coursesFeatureKey);

const selectField = <K extends keyof CoursesState>(key: K) =>
  createSelector(selectCoursesState, (state) => state[key]);

export const isAllCoursesLoadingSelector = selectField("isAllCoursesLoading");
export const isSearchingStateSelector = selectField("isSearchState");
export const isSingleCourseLoadingSelector = selectField(
  "isSingleCourseLoading"
);
export const getCourses = selectField("allCourses");
export const getAllCourses = selectField("allCourses");
export const getCourse = selectField("course");
export const getErrorMessage = selectField("errorMessage");
