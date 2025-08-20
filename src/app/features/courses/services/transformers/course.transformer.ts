import {ICourseApi} from "@app/interfaces/courses/api/course-item.api.interface";
import {ICourse, ICourseWithAuthors} from "@app/interfaces/courses/course-item.interface";
import {IAuthor} from "@app/interfaces/courses/author-item.interface";

export function transformCourse(course: ICourseApi): ICourse {
    return {
        id: course.id,
        title: course.title,
        description: course.description,
        creationDate: new Date (course.creationDate),
        duration: course.duration,
        authors: course.authors
    }
}

export function transformCourses(courses: ICourseApi[]): ICourse[] {
    return courses.map(transformCourse);
}

export function populateCoursesWithAuthors(courses: ICourse[], authors: IAuthor[]): ICourseWithAuthors[] {
    return courses.map(course => populateCourseWithAuthors(course, authors));
}

export function populateCourseWithAuthors(course: ICourse, authors: IAuthor[]): ICourseWithAuthors {
    const authorItems = course.authors.map(authorId => authors.find(author => author.id === authorId)!).filter(Boolean);
    return {
        ...course,
        authors: authorItems
    }
}

export function mapCourseWithAuthors(courseApi: ICourseApi, authors: IAuthor[]): ICourseWithAuthors {
    return populateCourseWithAuthors(transformCourse(courseApi), authors);
}

export function mapCoursesWithAuthors(coursesApi: ICourseApi[], authors: IAuthor[]): ICourseWithAuthors[] {
    return populateCoursesWithAuthors(transformCourses(coursesApi), authors);
}

