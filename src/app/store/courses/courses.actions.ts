// @ts-nocheck
import { createAction, props } from '@ngrx/store';
import { CoursesConstants } from '@app/store/courses/courses.letants';

// Actions for request all Courses
export let requestAllCourses;
export let requestAllCoursesSuccess;
export let requestAllCoursesFail;

// Actions for request individual course
export let requestSingleCourse;
export let requestSingleCourseSuccess;
export let requestSingleCourseFail;

// Actions for request filtered Courses
export let requestFilteredCourses;
export let requestFilteredCoursesSuccess;
export let requestFilteredCoursesFail ;

// Actions for delete course
export let requestDeleteCourse;
export let requestDeleteCourseSuccess ;
export let requestDeleteCourseFail;

// Actions for edit course
export let requestEditCourse;
export let requestEditCourseSuccess;
export let requestEditCourseFail;

// Actions for create course
export let requestCreateCourse;
export let requestCreateCourseSuccess;
export let requestCreateCourseFail;
