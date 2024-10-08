import { createSelector, createFeatureSelector } from "@ngrx/store";
import { CoursesState, coursesFeatureKey } from "./courses.reducer";

export const selectCoursesState =
  createFeatureSelector<CoursesState>(coursesFeatureKey);

export const selectIsAllCoursesLoading = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.isAllCoursesLoading
);

export const selectIsSearchingState = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.isSearchState
);

export const selectIsSingleCourseLoading = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.isSingleCourseLoading
);

export const getCourses = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.allCourses
);

export const getAllCourses = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.allCourses
);

export const getCourse = createSelector(
  selectCoursesState,
  (state: CoursesState) => {
    const selectedCourseId = state.selectedCourseId;
    return state.allCourses
      ? state.allCourses.find((course) => course.id === selectedCourseId)
      : null;
  }
);

export const getErrorMessage = createSelector(
  selectCoursesState,
  (state: CoursesState) => state.errorMessage
);
