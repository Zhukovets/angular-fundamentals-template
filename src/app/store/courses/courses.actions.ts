

// Add your code here
import { createAction, props } from '@ngrx/store';
import { CoursesConstants } from '@app/store/courses/courses.constants';
import { Course } from './course.model';

// Add your code here
export const requestAllCourses = createAction(
    CoursesConstants.REQUEST_ALL_COURSES
  );
  
  export const requestAllCoursesSuccess = createAction(
    CoursesConstants.REQUEST_ALL_COURSES_SUCCESS,
    props<{ courses: Course[] }>()   //Should I create a model of Course in a separate file?
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
    props<{ course: Course }>()
  );

  export const requestSingleCourseFail = createAction(
    CoursesConstants.REQUEST_SINGLE_COURSE_FAIL,
    props<{ error: any }>()  
  );

  export const requestFilteredCourses = createAction(
    CoursesConstants.REQUEST_FILTERED_COURSES,
    props<{ searchValue: string }>()
  );

  export const requestFilteredCoursesSuccess = createAction(
    CoursesConstants.REQUEST_FILTERED_COURSES_SUCCESS,
    props<{ courses: Course[] }>()
);
export const requestFilteredCoursesFail = createAction(
    CoursesConstants.REQUEST_FILTERED_COURSES_FAIL,
    props<{ error: any }>()
);


export const requestDeleteCourse = createAction(
    CoursesConstants.REQUEST_DELETE_COURSE,
    props<{ courseId: string }>()
  );
  
  export const requestDeleteCourseSuccess = createAction(
    CoursesConstants.REQUEST_DELETE_COURSE_SUCCESS
  );
  
  export const requestDeleteCourseFail = createAction(
    CoursesConstants.REQUEST_DELETE_COURSE_FAIL,
    props<{ error: any }>()  
  );

  export const requestEditCourse = createAction(
    CoursesConstants.REQUEST_EDIT_COURSE,
    props<{ id: string, course: Course }>()  
  );
  
  export const requestEditCourseSuccess = createAction(
    CoursesConstants.REQUEST_EDIT_COURSE_SUCCESS,
    props<{ course: Course }>() 
);
  
  export const requestEditCourseFail = createAction(
    CoursesConstants.REQUEST_EDIT_COURSE_FAIL,
    props<{ error: any }>()  
  );

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
    props<{ error: any }>()  
  );

  export const requestSpecificCourse = createAction(
    CoursesConstants.REQUEST_SPECIFIC_COURSE,
    props<{ courseId: string }>()
  );
  
  export const requestSpecificCourseSuccess = createAction(
    CoursesConstants.REQUEST_SPECIFIC_COURSE_SUCCESS,
    props<{ course: Course }>()
  );
  
  export const requestSpecificCourseFail = createAction(
    CoursesConstants.REQUEST_SPECIFIC_COURSE_FAIL,
    props<{ error: any }>()
  );
  