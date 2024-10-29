// Add your code here
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoursesState } from './courses.reducer'; 

export const selectCoursesState = createFeatureSelector<CoursesState>('courses');


export const isAllCoursesLoadingSelector = createSelector(
    selectCoursesState,
    (state: CoursesState) => state.isAllCoursesLoading
);

export const isSearchingStateSelector = createSelector(
    selectCoursesState,
    (state: CoursesState) => state.isSearchState
);

export const isSingleCourseLoadingSelector = createSelector(
    selectCoursesState,
    (state: CoursesState) => state.isSingleCourseLoading
);

export const getCourses = createSelector(
    selectCoursesState,
    (state: CoursesState) => state.allCourses
);

export const getAllCourses = createSelector(
    selectCoursesState,
    (state: CoursesState) => state.allCourses  // not sure what should be the difference between courses and allcourses
);

export const getCourse = createSelector(
    selectCoursesState,
    (state: CoursesState) => state.course
);

export const getErrorMessage = createSelector(
    selectCoursesState,
    (state: CoursesState) => state.errorMessage
);

export const coursesQuery = {
    isAllCoursesLoadingSelector,
    isSingleCourseLoadingSelector,
    isSearchingStateSelector,
    getCourses,
    getAllCourses,
    getCourse,
    getErrorMessage,
  };