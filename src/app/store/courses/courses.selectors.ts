import { createFeatureSelector, createSelector } from '@ngrx/store';
import { coursesFeatureKey, CoursesState } from './courses.reducer';

export const selectCoursesState = createFeatureSelector<CoursesState>(coursesFeatureKey);

export const isAllCoursesLoadingSelector = createSelector(
    selectCoursesState,
    (state) => state.isAllCoursesLoading
);

export const isSingleCourseLoadingSelector = createSelector(
    selectCoursesState,
    (state) => state.isSingleCourseLoading
);

export const isSearchingStateSelector = createSelector(
    selectCoursesState,
    (state) => state.isSearchState
);

export const getAllCourses = createSelector(
    selectCoursesState,
    (state) => state.allCourses
);

export const getCourse = createSelector(
    selectCoursesState,
    (state) => state.course
);

export const getCourses = getAllCourses;

export const getErrorMessage = createSelector(
    selectCoursesState,
    (state) => state.errorMessage
);

export const getAuthors = createSelector(
    selectCoursesState,
    (state) => state.authors
);

export const isAuthorsLoadingSelector = createSelector(
    selectCoursesState,
    (state) => state.isAuthorsLoading
);