import {Action, createReducer, on} from '@ngrx/store';
import {Author, CardItem} from "@app/models/card.model";
import * as CoursesActions from '@app/store/courses/courses.actions'

export const coursesFeatureKey = 'courses';

export interface CoursesState {
    allCourses: CardItem[];
    course: CardItem;
    authors: Author[] ;
    isAllCoursesLoading: boolean;
    isSingleCourseLoading: boolean;
    isSearchState: boolean;
    errorMessage: string;
}

export const initialState: CoursesState = {
    allCourses: [],
    course: {} as CardItem,
    authors: [],
    isAllCoursesLoading: false,
    isSingleCourseLoading: false,
    isSearchState: false,
    errorMessage: '',
};

export const coursesReducer = createReducer(
    initialState,
    on(CoursesActions.requestAllCourses, state => ({
        ...state,
        isAllCoursesLoading: true,
        errorMessage:''
    })),
    on(CoursesActions.requestAllCoursesSuccess, (state, {courses}) => ({
        ...state,
        isAllCoursesLoading: false,
        allCourses: courses
    })),
    on(CoursesActions.requestAllCoursesFail, (state, {error}) => ({
        ...state,
        isAllCoursesLoading: false,
        errorMessage: error
    })),

    on(CoursesActions.requestSingleCourse, state => ({
        ...state,
        isSingleCourseLoading: true,
        errorMessage:''
    })),
    on(CoursesActions.requestSingleCourseSuccess, (state, {course}) => ({
        ...state,
        isSingleCourseLoading: false,
        course
    })),
    on(CoursesActions.requestSingleCourseFail, (state, {error}) => ({
        ...state,
        isSingleCourseLoading: false,
        errorMessage: error
    })),

    on(CoursesActions.requestFilteredCourses, (state) => ({
        ...state,
        isSearchState: true,
        isAllCoursesLoading: true,
        errorMessage:''
    })),
    on(CoursesActions.requestFilteredCoursesSuccess, (state, { courses }) => {
        return {
            ...state,
            isSearchState: false,
            isAllCoursesLoading: false,
            allCourses: courses
        };
    }),
    on(CoursesActions.requestFilteredCoursesFail, (state, {error}) => ({
        ...state,
        isSearchState: false,
        isAllCoursesLoading: false,
        errorMessage: error,
    })),

    on(CoursesActions.requestDeleteCourse, state => ({
        ...state,
        errorMessage:''
    })),
    on(CoursesActions.requestDeleteCourseSuccess, (state, {id}) => ({
        ...state,
        allCourses: state.allCourses.filter((course) => course.id !== id),
    })),
    on(CoursesActions.requestDeleteCourseFail, (state, {error}) => ({
        ...state,
        errorMessage: error
    })),

    //Edit
    on(CoursesActions.requestEditCourse, state => ({
        ...state,
        errorMessage:''
    })),
    on(CoursesActions.requestEditCourseSuccess, (state, { course }) => {
        const updatedCourse = state.allCourses.map(item =>
            item.id === course.id ? course : item
        );
        return {
            ...state,
            allCourses: updatedCourse,
            course: course
        };
    }),
    on(CoursesActions.requestEditCourseFail, (state, {error}) => ({
        ...state,
        errorMessage: error
    })),

    on(CoursesActions.requestAllAuthors, state => ({
        ...state,
        errorMessage:''
    })),
    on(CoursesActions.requestAllAuthorsSuccess, (state, {authors}) => ({
        ...state,
         authors
    })),
    on(CoursesActions.requestAllAuthorsFail, (state, {error}) => ({
        ...state,
        errorMessage: error
    })),

    on(CoursesActions.requestCreateCourse, state => ({
        ...state,
        errorMessage:''
    })),
    on(CoursesActions.requestCreateCourseSuccess, (state, {course}) => ({
        ...state,
        allCourses: [...state.allCourses, course]
    })),
    on(CoursesActions.requestCreateCourseFail, (state, {error}) => ({
        ...state,
        errorMessage: error
    })),

    on(CoursesActions.requestCreateAuthor, state => ({
        ...state,
        errorMessage:''
    })),
    on(CoursesActions.requestCreateAuthorSuccess, (state, {author}) => ({
        ...state,
        authors: [...state.authors, author]
    })),
    on(CoursesActions.requestCreateAuthorFail, (state, {error}) => ({
        ...state,
        errorMessage: error
    })),

);

//export const coursesReducer;
export const reducer = (state: CoursesState, action: Action): CoursesState => coursesReducer(state, action);
