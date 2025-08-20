import { Action, createReducer, on } from '@ngrx/store';
import * as CoursesActions from './courses.actions';
import { ICourseWithAuthors } from '@app/interfaces/courses/course-item.interface';
import { IAuthor } from '@app/interfaces/courses/author-item.interface';

export const coursesFeatureKey = 'courses';

export interface CoursesState {
    allCourses: ICourseWithAuthors[];
    course: ICourseWithAuthors | null;
    authors: IAuthor[];
    isAllCoursesLoading: boolean;
    isSingleCourseLoading: boolean;
    isAuthorsLoading: boolean;
    isSearchState: boolean;
    errorMessage: string | null;
}

export const initialState: CoursesState = {
    allCourses: [],
    course: null,
    authors: [],
    isAllCoursesLoading: false,
    isSingleCourseLoading: false,
    isAuthorsLoading: false,
    isSearchState: false,
    errorMessage: null,
};

export const coursesReducer = createReducer(
    initialState,

    on(CoursesActions.requestAllCourses, (state) => ({
        ...state,
        isAllCoursesLoading: true,
        errorMessage: null,
    })),
    on(CoursesActions.requestAllCoursesSuccess, (state, { courses }) => ({
        ...state,
        allCourses: courses,
        isAllCoursesLoading: false,
        isSearchState: false,
        errorMessage: null,
    })),
    on(CoursesActions.requestAllCoursesFail, (state, { error }) => ({
        ...state,
        isAllCoursesLoading: false,
        errorMessage: error,
    })),
    on(CoursesActions.requestSingleCourse, (state) => ({
        ...state,
        isSingleCourseLoading: true,
        errorMessage: null,
    })),
    on(CoursesActions.requestSingleCourseSuccess, (state, { course }) => ({
        ...state,
        course,
        isSingleCourseLoading: false,
        errorMessage: null,
    })),
    on(CoursesActions.requestSingleCourseFail, (state, { error }) => ({
        ...state,
        isSingleCourseLoading: false,
        errorMessage: error,
    })),
    on(CoursesActions.requestFilteredCourses, (state) => ({
        ...state,
        isAllCoursesLoading: true,
        isSearchState: true,
        errorMessage: null,
    })),
    on(CoursesActions.requestFilteredCoursesSuccess, (state, { courses }) => ({
        ...state,
        allCourses: courses,
        isAllCoursesLoading: false,
        errorMessage: null,
    })),
    on(CoursesActions.requestFilteredCoursesFail, (state, { error }) => ({
        ...state,
        isAllCoursesLoading: false,
        errorMessage: error,
    })),
    on(CoursesActions.requestDeleteCourse, (state) => ({
        ...state,
        isAllCoursesLoading: true,
        errorMessage: null,
    })),
    on(CoursesActions.requestDeleteCourseSuccess, (state, { courseId }) => ({
        ...state,
        allCourses: state.allCourses.filter(course => course.id !== courseId),
        isAllCoursesLoading: false,
        errorMessage: null,
    })),
    on(CoursesActions.requestDeleteCourseFail, (state, { error }) => ({
        ...state,
        isAllCoursesLoading: false,
        errorMessage: error,
    })),
    on(CoursesActions.requestEditCourse, (state) => ({
        ...state,
        isSingleCourseLoading: true,
        errorMessage: null,
    })),
    on(CoursesActions.requestEditCourseSuccess, (state, { course }) => ({
        ...state,
        isSingleCourseLoading: false,
        course,
        allCourses: state.allCourses.map(c => c.id === course.id ? course : c),
        errorMessage: null,
    })),
    on(CoursesActions.requestEditCourseFail, (state, { error }) => ({
        ...state,
        isSingleCourseLoading: false,
        errorMessage: error,
    })),
    on(CoursesActions.requestCreateCourse, (state) => ({
        ...state,
        isSingleCourseLoading: true,
        errorMessage: null,
    })),
    on(CoursesActions.requestCreateCourseSuccess, (state, { course }) => ({
        ...state,
        isSingleCourseLoading: false,
        allCourses: [...state.allCourses, course],
        errorMessage: null,
    })),
    on(CoursesActions.requestCreateCourseFail, (state, { error }) => ({
        ...state,
        isSingleCourseLoading: false,
        errorMessage: error,
    })),
    on(CoursesActions.requestAllAuthors, (state) => ({
        ...state,
        isAuthorsLoading: true,
        errorMessage: null,
    })),
    on(CoursesActions.requestAllAuthorsSuccess, (state, { authors }) => ({
        ...state,
        authors,
        isAuthorsLoading: false,
        errorMessage: null,
    })),
    on(CoursesActions.requestAllAuthorsFail, (state, { error }) => ({
        ...state,
        isAuthorsLoading: false,
        errorMessage: error,
    })),
    on(CoursesActions.requestCreateAuthor, (state) => ({
        ...state,
        isAuthorsLoading: true,
        errorMessage: null,
    })),
    on(CoursesActions.requestCreateAuthorSuccess, (state, { author }) => ({
        ...state,
        authors: [...state.authors, author],
        isAuthorsLoading: false,
        errorMessage: null,
    })),
    on(CoursesActions.requestCreateAuthorFail, (state, { error }) => ({
        ...state,
        isAuthorsLoading: false,
        errorMessage: error,
    })),
    on(CoursesActions.requestDeleteAuthor, (state) => ({
        ...state,
        isAuthorsLoading: true,
        errorMessage: null,
    })),
    on(CoursesActions.requestDeleteAuthorSuccess, (state, { authorId }) => ({
        ...state,
        authors: state.authors.filter(author => author.id !== authorId),
        isAuthorsLoading: false,
        errorMessage: null,
    })),
    on(CoursesActions.requestDeleteAuthorFail, (state, { error }) => ({
        ...state,
        isAuthorsLoading: false,
        errorMessage: error,
    })),
    on(CoursesActions.clearSingleCourse, (state) => ({
        ...state,
        course: null,
    }))
);

export const reducer = (state: CoursesState | undefined, action: Action): CoursesState => {
    return coursesReducer(state, action);
};