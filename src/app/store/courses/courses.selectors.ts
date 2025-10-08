import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { coursesFeatureKey, CoursesState } from '@app/store/courses/courses.reducer';
import { Course } from '@app/features/courses/courses.model';

const selectCoursesState = createFeatureSelector<CoursesState>(coursesFeatureKey);

const selectProp = <K extends keyof CoursesState>(prop: K): MemoizedSelector<object, CoursesState[K]> =>
  createSelector(selectCoursesState, (state) => state[prop]);

export const isAllCoursesLoadingSelector = selectProp('isAllCoursesLoading');
export const isSearchingStateSelector = selectProp('isSearchState');
export const isSingleCourseLoadingSelector = selectProp('isSingleCourseLoading');
export const getAllCourses = selectProp('allCourses') as MemoizedSelector<object, Course[]>;
export const getCourses = getAllCourses;
export const getCourse = selectProp('course') as MemoizedSelector<object, Course | null>;
export const getErrorMessage = selectProp('errorMessage');
