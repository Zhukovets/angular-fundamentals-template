// Add your code here
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { coursesFeatureKey, CoursesState } from './courses.reducer';

export interface AppState {
    courses: CoursesState;
}

export const selectFeature = createFeatureSelector<AppState, CoursesState>(coursesFeatureKey);

export const isAllCoursesLoadingSelector = createSelector(selectFeature, (state: CoursesState) => state.isAllCoursesLoading);
export const isSearchingStateSelector = createSelector(selectFeature, (state: CoursesState) => state.isSearchState);
export const isSingleCourseLoadingSelector = createSelector(selectFeature, (state: CoursesState) => state.isSingleCourseLoading);
export const getCourses = createSelector(selectFeature, (state: CoursesState) => state.allCourses);
export const getAllCourses = createSelector(selectFeature, (state: CoursesState) => state.allCourses);
export const getCourse = createSelector(selectFeature, (state: CoursesState) => state.course);
export const getErrorMessage = createSelector(selectFeature, (state: CoursesState) => state.errorMessage);