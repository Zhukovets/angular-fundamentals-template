import { Action, createReducer, on } from "@ngrx/store";
import * as CoursesActions from "./courses.actions";
import { Course, CoursesError } from "@app/features/courses/courses.model";
// Add your code here

const successAllCourses = (state: CoursesState, courses: Course[]) => ({
  ...state,
  allCourses: courses,
  isAllCoursesLoading: false,
});

const successSingleCourse = (state: CoursesState, course: Course) => ({
  ...state,
  course,
  isSingleCourseLoading: false,
});

const successFilteredCourses = (state: CoursesState, courses: Course[]) => ({
  ...state,
  allCourses: courses,
  isSearchState: false,
});

export const coursesFeatureKey = "courses";

export interface CoursesState {
  // Add your code here
  allCourses: Course[] | null;
  course: Course | null;
  isAllCoursesLoading: boolean;
  isSingleCourseLoading: boolean;
  isSearchState: boolean;
  errorMessage: CoursesError | string | null;
}

export const initialState: CoursesState = {
  // Add your code here
  allCourses: [],
  course: null,
  isAllCoursesLoading: false,
  isSingleCourseLoading: false,
  isSearchState: false,
  errorMessage: "",
};

const startLoading = (
  state: CoursesState,
  key: keyof Pick<
    CoursesState,
    "isAllCoursesLoading" | "isSingleCourseLoading" | "isSearchState"
  >
) => ({
  ...state,
  [key]: true,
  errorMessage: "",
});

const fail = (
  state: CoursesState,
  payload: { error: CoursesError | string }
) => ({
  ...state,
  isAllCoursesLoading: false,
  isSingleCourseLoading: false,
  isSearchState: false,
  errorMessage: payload.error,
});

const updateCourseInList = (state: CoursesState, course: Course) => ({
  ...state,
  course,
  allCourses:
    state.allCourses?.map((c) => (c.id === course.id ? course : c)) || [],
  errorMessage: "",
});

export const coursesReducer = (
  state: CoursesState | undefined,
  action: Action
): CoursesState => reducerInternal(state, action);

export const reducer = coursesReducer;

const reducerInternal = createReducer(
  initialState,

  on(CoursesActions.requestAllCourses, (s) =>
    startLoading(s, "isAllCoursesLoading")
  ),
  on(CoursesActions.requestSingleCourse, (s) =>
    startLoading(s, "isSingleCourseLoading")
  ),
  on(CoursesActions.requestFilteredCourses, (s) =>
    startLoading(s, "isAllCoursesLoading")
  ),
  on(CoursesActions.requestDeleteCourse, (s) =>
    startLoading(s, "isAllCoursesLoading")
  ),

  on(CoursesActions.requestAllCoursesSuccess, (s, { courses }) =>
    successAllCourses(s, courses)
  ),
  on(CoursesActions.requestSingleCourseSuccess, (s, { course }) =>
    successSingleCourse(s, course)
  ),
  on(CoursesActions.requestFilteredCoursesSuccess, (s, { courses }) =>
    successFilteredCourses(s, courses)
  ),

  on(CoursesActions.requestDeleteCourseSuccess, (s) => ({ ...s })),

  on(CoursesActions.requestEditCourseSuccess, (s, { course }) =>
    updateCourseInList(s, course)
  ),
  on(CoursesActions.requestCreateCourse, (s) =>
    startLoading(s, "isAllCoursesLoading")
  ),
  on(CoursesActions.requestEditCourse, (s) =>
    startLoading(s, "isAllCoursesLoading")
  ),
  on(CoursesActions.requestCreateCourseSuccess, (s, { course }) => ({
    ...s,
    allCourses: [...(s.allCourses ?? []), course],
    errorMessage: "",
  })),

  on(
    CoursesActions.requestAllCoursesFail,
    CoursesActions.requestSingleCourseFail,
    CoursesActions.requestFilteredCoursesFail,
    CoursesActions.requestDeleteCourseFail,
    CoursesActions.requestEditCourseFail,
    CoursesActions.requestCreateCourseFail,
    fail
  )
);
