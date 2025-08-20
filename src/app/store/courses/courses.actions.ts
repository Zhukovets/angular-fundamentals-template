import {createAction, props} from '@ngrx/store';
import {CoursesConstants} from '@app/store/courses/courses.constants';
import {ICourseWithAuthors, newCourse} from '@app/interfaces/courses/course-item.interface';
import {IAuthor, INewAuthor} from "@app/interfaces/courses/author-item.interface";

// Add your code here
export const requestAllCourses = createAction(
    CoursesConstants.REQUEST_ALL_COURSES
);

export const requestAllCoursesSuccess = createAction(
    CoursesConstants.REQUEST_ALL_COURSES_SUCCESS,
    props<{ courses: ICourseWithAuthors[] }>()
);

export const requestAllCoursesFail = createAction(
    CoursesConstants.REQUEST_ALL_COURSES_FAIL,
    props<{ error: any }>()
);

export const requestSingleCourse = createAction(
    CoursesConstants.REQUEST_SINGLE_COURSE,
    props<{ id: string }>()
);

export const requestSingleCourseSuccess = createAction(
    CoursesConstants.REQUEST_SINGLE_COURSE_SUCCESS,
    props<{ course: ICourseWithAuthors }>()
);

export const requestSingleCourseFail = createAction(
    CoursesConstants.REQUEST_SINGLE_COURSE_FAIL,
    props<{ error: any }>()
);

export const requestFilteredCourses = createAction(
    CoursesConstants.REQUEST_FILTERED_COURSES,
    props<{ title: string }>()
);

export const requestFilteredCoursesSuccess = createAction(
    CoursesConstants.REQUEST_FILTERED_COURSES_SUCCESS,
    props<{ courses: ICourseWithAuthors[] }>()
);

export const requestFilteredCoursesFail = createAction(
    CoursesConstants.REQUEST_FILTERED_COURSES_FAIL,
    props<{ error: any }>()
);

export const requestDeleteCourse = createAction(
    CoursesConstants.REQUEST_DELETE_COURSE,
    props<{ id: string }>()
);

export const requestDeleteCourseSuccess = createAction(
    CoursesConstants.REQUEST_DELETE_COURSE_SUCCESS,
    props<{ courseId: string }>()
);

export const requestDeleteCourseFail = createAction(
    CoursesConstants.REQUEST_DELETE_COURSE_FAIL,
    props<{ error: any }>()
);

export const requestEditCourse = createAction(
    CoursesConstants.REQUEST_EDIT_COURSE,
    props<{ id: string; course: newCourse }>()
);

export const requestEditCourseSuccess = createAction(
    CoursesConstants.REQUEST_EDIT_COURSE_SUCCESS,
    props<{ course: ICourseWithAuthors }>()
);

export const requestEditCourseFail = createAction(
    CoursesConstants.REQUEST_EDIT_COURSE_FAIL,
    props<{ error: any }>()
);

export const requestCreateCourse = createAction(
    CoursesConstants.REQUEST_CREATE_COURSE,
    props<{ course: newCourse }>()
);

export const requestCreateCourseSuccess = createAction(
    CoursesConstants.REQUEST_CREATE_COURSE_SUCCESS,
    props<{ course: ICourseWithAuthors }>()
);

export const requestCreateCourseFail = createAction(
    CoursesConstants.REQUEST_CREATE_COURSE_FAIL,
    props<{ error: any }>()
);

export const requestAllAuthors = createAction(
    CoursesConstants.REQUEST_ALL_AUTHORS
);

export const requestAllAuthorsSuccess = createAction(
    CoursesConstants.REQUEST_ALL_AUTHORS_SUCCESS,
    props<{ authors: IAuthor[] }>()
);

export const requestAllAuthorsFail = createAction(
    CoursesConstants.REQUEST_ALL_AUTHORS_FAIL,
    props<{ error: any }>()
);

export const requestCreateAuthor = createAction(
    CoursesConstants.REQUEST_CREATE_AUTHOR,
    props<{ author: INewAuthor }>()
);

export const requestCreateAuthorSuccess = createAction(
    CoursesConstants.REQUEST_CREATE_AUTHOR_SUCCESS,
    props<{ author: IAuthor }>()
);

export const requestCreateAuthorFail = createAction(
    CoursesConstants.REQUEST_CREATE_AUTHOR_FAIL,
    props<{ error: any }>()
);

export const requestDeleteAuthor = createAction(
    CoursesConstants.REQUEST_DELETE_AUTHOR,
    props<{ id: string }>()
);

export const requestDeleteAuthorSuccess = createAction(
    CoursesConstants.REQUEST_DELETE_AUTHOR_SUCCESS,
    props<{ authorId: string }>()
);

export const requestDeleteAuthorFail = createAction(
    CoursesConstants.REQUEST_DELETE_AUTHOR_FAIL,
    props<{ error: any }>()
);

export const clearSingleCourse = createAction(
    '[Courses] Clear Single Course'
);

