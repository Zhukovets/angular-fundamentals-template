import { createAction, props } from '@ngrx/store';
import { CoursesConstants } from '@app/store/courses/courses.constants';
import { Course } from '@app/shared/models/course.model';

// Add your code here
export const requestAllCourses = createAction(CoursesConstants.REQUEST_ALL_COURSES);
export const requestAllCoursesSuccess = createAction(CoursesConstants.REQUEST_ALL_COURSES_SUCCESS, props<{courses: Course[]}>());
export const requestAllCoursesFail = createAction(CoursesConstants.REQUEST_ALL_COURSES_FAIL, props<{error: String}>());

export const requestSingleCourse = createAction(CoursesConstants.REQUEST_SINGLE_COURSE, props<{id: String}>());
export const requestSingleCourseSuccess = createAction(CoursesConstants.REQUEST_SINGLE_COURSE_SUCCESS, props<{course: Course}>());
export const requestSingleCourseFail = createAction(CoursesConstants.REQUEST_SINGLE_COURSE_FAIL, props<{error: String}>());

export const requestFilteredCourse = createAction(CoursesConstants.REQUEST_FILTERED_COURSES, props<{title: String}>());
export const requestFilteredCourseSuccess = createAction(CoursesConstants.REQUEST_FILTERED_COURSES_SUCCESS, props<{courses: Course[]}>());
export const requestFilteredCourseFail = createAction(CoursesConstants.REQUEST_FILTERED_COURSES_FAIL, props<{error: String}>());

export const requestDeleteCourse = createAction(CoursesConstants.REQUEST_DELETE_COURSE, props<{id: String}>());
export const requestDeleteCourseSuccess = createAction(CoursesConstants.REQUEST_DELETE_COURSE_SUCCESS);
export const requestDeleteCourseFail = createAction(CoursesConstants.REQUEST_DELETE_COURSE_FAIL, props<{error: String}>());

export const requestEditCourse = createAction(CoursesConstants.REQUEST_EDIT_COURSE, props<{id: String, course: Course}>());
export const requestEditCourseSuccess = createAction(CoursesConstants.REQUEST_EDIT_COURSE_SUCCESS, props<{course: Course}>());
export const requestEditCourseFail = createAction(CoursesConstants.REQUEST_EDIT_COURSE_FAIL, props<{error: String}>());

export const requestCreateCourse = createAction(CoursesConstants.REQUEST_CREATE_COURSE, props<{course: Course}>());
export const requestCreateCourseSuccess = createAction(CoursesConstants.REQUEST_CREATE_COURSE_SUCCESS, props<{course: Course}>());
export const requestCreateCourseFail = createAction(CoursesConstants.REQUEST_CREATE_COURSE_FAIL, props<{error: String}>());