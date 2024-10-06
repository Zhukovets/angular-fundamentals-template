import {createAction, props} from '@ngrx/store';
import {CoursesConstants} from '@app/store/courses/courses.constants';
import {Author, CardItem, CreateAuthorResponse, CreateCourseRequest, UpdateCourseRequest} from "@app/models/card.model";

//Actions for request all Courses
export const requestAllCourses = createAction(
    CoursesConstants.REQUEST_ALL_COURSES
);

export const requestAllCoursesSuccess = createAction(
    CoursesConstants.REQUEST_ALL_COURSES_SUCCESS,
    props<{ courses: CardItem[] }>()
);

export const requestAllCoursesFail = createAction(
    CoursesConstants.REQUEST_ALL_COURSES_FAIL,
    props<{ error: string }>()
);

//Actions for single courses
export const requestSingleCourse = createAction(
    CoursesConstants.REQUEST_SINGLE_COURSE,
    props<{ id: string }>()
);

export const requestSingleCourseSuccess = createAction(
    CoursesConstants.REQUEST_SINGLE_COURSE_SUCCESS,
    props<{ course: CardItem }>()
);

export const requestSingleCourseFail = createAction(
    CoursesConstants.REQUEST_SINGLE_COURSE_FAIL,
    props<{ error: string }>()
);

//Actions for request filtered Courses
export const requestFilteredCourses = createAction(
    CoursesConstants.REQUEST_FILTERED_COURSES,
    props<{ title: string }>()
);

export const requestFilteredCoursesSuccess = createAction(
    CoursesConstants.REQUEST_FILTERED_COURSES_SUCCESS,
    props<{ courses: CardItem[] }>()
);

export const requestFilteredCoursesFail = createAction(
    CoursesConstants.REQUEST_FILTERED_COURSES_FAIL,
    props<{ error: string }>()
);

//Actions for delete course
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

//Actions for edit course
export const requestEditCourse = createAction(
    CoursesConstants.REQUEST_EDIT_COURSE,
    props<{ id: string, course: UpdateCourseRequest }>()
);

export const requestEditCourseSuccess = createAction(
    CoursesConstants.REQUEST_EDIT_COURSE_SUCCESS,
    props<{ course: CardItem }>()
);

export const requestEditCourseFail = createAction(
    CoursesConstants.REQUEST_EDIT_COURSE_FAIL,
    props<{ error: string }>()
);

//Actions for create course
export const requestCreateCourse = createAction(
    CoursesConstants.REQUEST_CREATE_COURSE,
    props<{ course: CreateCourseRequest }>()
);

export const requestCreateCourseSuccess = createAction(
    CoursesConstants.REQUEST_CREATE_COURSE_SUCCESS,
    props<{ course: CardItem }>()
);

export const requestCreateCourseFail = createAction(
    CoursesConstants.REQUEST_CREATE_COURSE_FAIL,
    props<{ error: string }>()
);

//Actions for getting authors
export const requestAllAuthors = createAction(
    CoursesConstants.REQUEST_ALL_AUTHORS
);

export const requestAllAuthorsSuccess = createAction(
    CoursesConstants.REQUEST_ALL_AUTHORS_SUCCESS,
    props<{ authors: Author[] }>()
);

export const requestAllAuthorsFail = createAction(
    CoursesConstants.REQUEST_ALL_AUTHORS_FAIL,
    props<{ error: string }>()
);

//Actions for creating author
export const requestCreateAuthor = createAction(
    CoursesConstants.REQUEST_CREATE_AUTHOR,
    props<{ name: string }>()
);

export const requestCreateAuthorSuccess = createAction(
    CoursesConstants.REQUEST_CREATE_AUTHOR_SUCCESS,
    props<{ author: Author }>()
);

export const requestCreateAuthorFail = createAction(
    CoursesConstants.REQUEST_CREATE_AUTHOR_FAIL,
    props<{ error: string }>()
);