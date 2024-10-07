import { createAction, props } from '@ngrx/store';
import { CoursesConstants } from '@app/store/courses/courses.constants';
import { Course } from '@app/models/course.model';

//all courses
export const requestAllCourses = createAction(
    CoursesConstants.REQUEST_ALL_COURSES
);
export const requestAllCoursesSuccess = createAction(
  CoursesConstants.REQUEST_ALL_COURSES_SUCCESS, 
  props<{ courses: Course[] }>()
);
export const requestAllCoursesFail = createAction(
  CoursesConstants.REQUEST_ALL_COURSES_FAIL, 
  props<{ error: string }>()
);

//individual course by id
export const requestSingleCourse = createAction(
  CoursesConstants.REQUEST_SINGLE_COURSE, 
  props<{ id: string }>()
);
export const requestSingleCourseSuccess = createAction(
  CoursesConstants.REQUEST_SINGLE_COURSE_SUCCESS, 
  props<{ course: Course }>()
);
export const requestSingleCourseFail = createAction(
  CoursesConstants.REQUEST_SINGLE_COURSE_FAIL, 
  props<{ error: string }>()
);

//filtered courses
export const requestFilteredCourses = createAction(
  CoursesConstants.REQUEST_FILTERED_COURSES, 
  props<{ title: string }>()
);
export const requestFilteredCoursesSuccess = createAction(
  CoursesConstants.REQUEST_FILTERED_COURSES_SUCCESS, 
  props<{ courses: Course[] }>()
);
export const requestFilteredCoursesFail = createAction(
  CoursesConstants.REQUEST_FILTERED_COURSES_FAIL, 
  props<{ error: string }>()
);

//deleting a course
export const requestDeleteCourse = createAction(
  CoursesConstants.REQUEST_DELETE_COURSE, 
  props<{ id: string }>()
);
export const requestDeleteCourseSuccess = createAction(
    CoursesConstants.REQUEST_DELETE_COURSE_SUCCESS,
    props<{ id: string }>()
);
export const requestDeleteCourseFail = createAction(
  CoursesConstants.REQUEST_DELETE_COURSE_FAIL, 
  props<{ error: string }>()
);

//editing a course
export const requestEditCourse = createAction(
  CoursesConstants.REQUEST_EDIT_COURSE, 
  props<{ id: string; course: Course }>()
);
export const requestEditCourseSuccess = createAction(
  CoursesConstants.REQUEST_EDIT_COURSE_SUCCESS, 
  props<{ course: Course }>()
);
export const requestEditCourseFail = createAction(
  CoursesConstants.REQUEST_EDIT_COURSE_FAIL, 
  props<{ error: string }>()
);

//creating a new course
export const requestCreateCourse = createAction(
  CoursesConstants.REQUEST_CREATE_COURSE, 
  props<{ course: Course }>()
);
export const requestCreateCourseSuccess = createAction(
  CoursesConstants.REQUEST_CREATE_COURSE_SUCCESS, 
  props<{ course: Course }>()
);
export const requestCreateCourseFail = createAction(
  CoursesConstants.REQUEST_CREATE_COURSE_FAIL, 
  props<{ error: string }>()
);
