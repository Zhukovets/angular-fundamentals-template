import { Action, createReducer, on } from "@ngrx/store";
import * as CoursesActions from "./courses.actions";
import { Course, CoursesError } from "@app/features/courses/courses.model";

export const coursesFeatureKey = "courses";

export interface CoursesState {
  allCourses: Course[];
  course: Course | null;
  isAllCoursesLoading: boolean;
  isSingleCourseLoading: boolean;
  isSearchState: boolean;
  errorMessage: CoursesError | string | null;
}

export const initialState: CoursesState = {
  allCourses: [],
  course: null,
  isAllCoursesLoading: false,
  isSingleCourseLoading: false,
  isSearchState: false,
  errorMessage: "",
};

const startLoading = (
  state: CoursesState,
  ...keys: Array<keyof Pick<CoursesState, "isAllCoursesLoading" | "isSingleCourseLoading" | "isSearchState">>
) => ({
  ...state,
  ...keys.reduce((acc, k) => ({ ...acc, [k]: true }), {} as Partial<CoursesState>),
  errorMessage: "",
});

const fail = (state: CoursesState, payload: { error: CoursesError | string }) => ({
  ...state,
  isAllCoursesLoading: false,
  isSingleCourseLoading: false,
  isSearchState: false,
  errorMessage: payload.error,
});

const successAllCourses = (state: CoursesState, courses: Course[]) => ({
  ...state,
  allCourses: courses,
  isAllCoursesLoading: false,
  isSearchState: false,
  errorMessage: "",
});

const successSingleCourse = (state: CoursesState, course: Course) => ({
  ...state,
  course,
  isSingleCourseLoading: false,
  errorMessage: "",
});

const successFilteredCourses = (state: CoursesState, courses: Course[]) => ({
  ...state,
  allCourses: courses,
  isAllCoursesLoading: false,
  isSearchState: true,
  errorMessage: "",
});

const updateCourseInList = (state: CoursesState, course: Course) => ({
  ...state,
  allCourses: state.allCourses.map((existingCourse) =>
    existingCourse.id === course.id ? course : existingCourse
  ),
  course: course,
  isAllCoursesLoading: false,
  errorMessage: "",
});

const removeCourseFromList = (state: CoursesState, id: string | number) => ({
  ...state,
  allCourses: state.allCourses.filter((existingCourse) => existingCourse.id !== String(id)),
  isAllCoursesLoading: false,
  errorMessage: "",
});

const addCourseToList = (state: CoursesState, course: Course) => ({
  ...state,
  allCourses: [course, ...state.allCourses],
  isAllCoursesLoading: false,
  errorMessage: "",
});

const reducerInternal = createReducer(
  initialState,

  on(CoursesActions.requestAllCourses, (state) => startLoading(state, "isAllCoursesLoading")),
  on(CoursesActions.requestSingleCourse, (state) => startLoading(state, "isSingleCourseLoading")),
  on(CoursesActions.requestFilteredCourses, (state) => startLoading(state, "isAllCoursesLoading", "isSearchState")),
  on(CoursesActions.requestDeleteCourse, (state) => startLoading(state, "isAllCoursesLoading")),
  on(CoursesActions.requestEditCourse, (state) => startLoading(state, "isAllCoursesLoading")),
  on(CoursesActions.requestCreateCourse, (state) => startLoading(state, "isAllCoursesLoading")),

  on(CoursesActions.requestAllCoursesSuccess, (state, { courses }) => successAllCourses(state, courses)),
  on(CoursesActions.requestSingleCourseSuccess, (state, { course }) => successSingleCourse(state, course)),
  on(CoursesActions.requestFilteredCoursesSuccess, (state, { courses }) => successFilteredCourses(state, courses)),

  on(CoursesActions.requestDeleteCourseSuccess, (state, { id }) => removeCourseFromList(state, id)),
  on(CoursesActions.requestEditCourseSuccess, (state, { course }) => updateCourseInList(state, course)),
  on(CoursesActions.requestCreateCourseSuccess, (state, { course }) => addCourseToList(state, course)),

  on(
    CoursesActions.requestAllCoursesFail,
    CoursesActions.requestSingleCourseFail,
    CoursesActions.requestFilteredCoursesFail,
    CoursesActions.requestDeleteCourseFail,
    CoursesActions.requestEditCourseFail,
    CoursesActions.requestCreateCourseFail,
    (state, { error }) => fail(state, { error })
  )
);

export const coursesReducer = (state: CoursesState | undefined, action: Action): CoursesState =>
  reducerInternal(state, action);

export const reducer = (state: CoursesState | undefined, action: Action): CoursesState => coursesReducer(state, action);
