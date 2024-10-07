import { Action, createReducer, on } from '@ngrx/store';
import { Course } from '@app/models/course.model';
import * as CoursesActions from './courses.actions';

export interface CoursesState {
    allCourses: Course[];
    course: Course | null;
    isAllCoursesLoading: boolean;
    isSingleCourseLoading: boolean;
    isSearchState: boolean;
    errorMessage: string | null;
  }
  
  export const initialState: CoursesState = {
    allCourses: [],
    course: null,
    isAllCoursesLoading: false,
    isSingleCourseLoading: false,
    isSearchState: false,
    errorMessage: "",
  };
  
  export const coursesFeatureKey = 'courses';
  
  
  export const coursesReducer = createReducer(
    initialState,
  
    // action requestAllCourses 
    on(CoursesActions.requestAllCourses, (state): CoursesState => ({
      ...state,
      isAllCoursesLoading: true,
      errorMessage: "",
    })),
  
    on(CoursesActions.requestAllCoursesSuccess, (state, { courses }): CoursesState => ({
      ...state,
      allCourses: courses,
      isAllCoursesLoading: false,
      errorMessage: "",
    })),
  
    on(CoursesActions.requestAllCoursesFail, (state, { error }): CoursesState => ({
      ...state,
      isAllCoursesLoading: false,
      errorMessage: error,
    })),
  
    // action requestSingleCourse 
    on(CoursesActions.requestSingleCourse, (state): CoursesState => ({
      ...state,
      isSingleCourseLoading: true,
      errorMessage: "",
      course: null,
    })),
  
    on(CoursesActions.requestSingleCourseSuccess, (state, { course }): CoursesState => ({
      ...state,
      isSingleCourseLoading: false,
      course,
      errorMessage: "",
    })),
  
    on(CoursesActions.requestSingleCourseFail, (state, { error }): CoursesState => ({
      ...state,
      isSingleCourseLoading: false,
      errorMessage: error,
    })),
  
    // action requestCreateCourse 
    on(CoursesActions.requestCreateCourse, (state): CoursesState => ({
      ...state,
      isSingleCourseLoading: true,
      errorMessage: "",
    })),
  
    on(CoursesActions.requestCreateCourseSuccess, (state, { course }): CoursesState => ({
      ...state,
      isSingleCourseLoading: false,
      allCourses: state.allCourses ? [...state.allCourses, course] : [course],
      errorMessage: "",
    })),
  
    on(CoursesActions.requestCreateCourseFail, (state, { error }): CoursesState => ({
      ...state,
      isSingleCourseLoading: false,
      errorMessage: error,
    })),
  
    // action requestEditCourse 
    on(CoursesActions.requestEditCourse, (state): CoursesState => ({
      ...state,
      isSingleCourseLoading: true,
      errorMessage: "",
    })),
  
    on(CoursesActions.requestEditCourseSuccess, (state, { course }): CoursesState => ({
      ...state,
      isSingleCourseLoading: false,
      allCourses: state.allCourses
        ? state.allCourses.map(c => (c.id === course.id ? course : c))
        : [course],
      errorMessage: "",
    })),
  
    on(CoursesActions.requestEditCourseFail, (state, { error }): CoursesState => ({
      ...state,
      isSingleCourseLoading: false,
      errorMessage: error,
    })),
  
    // action requestDeleteCourse 
    on(CoursesActions.requestDeleteCourse, (state): CoursesState => ({
      ...state,
      isSingleCourseLoading: true,
      errorMessage: "",
    })),
  
    on(CoursesActions.requestDeleteCourseSuccess, (state, { id }): CoursesState => ({
        ...state,
        allCourses: state.allCourses.filter(course => course.id !== id),
        isAllCoursesLoading: false,
        errorMessage: "",
    })),
      
  
    on(CoursesActions.requestDeleteCourseFail, (state, { error }): CoursesState => ({
      ...state,
      isSingleCourseLoading: false,
      errorMessage: error,
    })),
  
    // action requestFilteredCourses 
    on(CoursesActions.requestFilteredCourses, (state): CoursesState => ({
      ...state,
      isAllCoursesLoading: true,
      isSearchState: true,
      errorMessage: "",
    })),
  
    on(CoursesActions.requestFilteredCoursesSuccess, (state, { courses }): CoursesState => ({
      ...state,
      allCourses: [...courses],
      isAllCoursesLoading: false,
      isSearchState: false,
      errorMessage: "",
    })),
  
    on(CoursesActions.requestFilteredCoursesFail, (state, { error }): CoursesState => ({
      ...state,
      isAllCoursesLoading: false,
      isSearchState: false,
      errorMessage: error,
    }))
  );
  
  export const reducer = (state: CoursesState | undefined, action: Action): CoursesState => {
    return coursesReducer(state, action);
  };