interface CardItem {
    id?: string;
    title: string;
    description: string;
    creationDate: string;
    duration: number;
    authors: string[];
}

interface Author {
    id: string;
    name: string;
}

interface LoginData {
    name?: string;
    email: string;
    password: string;
}

interface LoginResponse {
    "successful": boolean,
    "result": string
    "user": LoginData
}

interface RegisterResponse {
    "successful": boolean,
    "result": string
}

interface CoursesAllResponse {
    "successful": boolean,
    "result": CardItem[]
}

interface CourseResponse {
    "successful": boolean,
    "result": CardItem
}

interface AuthorsAllResponse {
    "successful": boolean,
    "result": Author[]
}

interface CreateCourseRequest {
    "title": string,
    "description": string,
    "duration": number,
    "authors": Author[]
}

interface CreateCourseResponse {
    "successful": boolean,
    "result": CardItem
}

interface UpdateCourseRequest {
    "title": string,
    "description": string,
    "duration": number,
    "authors": Author[]
}

interface UpdateCourseResponse {
    "successful": boolean,
    "result": CardItem
}

interface CreateAuthorResponse {
    "successful": boolean,
    "result": Author
}

interface AuthorResponse {
    "successful": boolean,
    "result": Author
}

interface UserResponse {
    "successful": boolean,
    "result": {
        email:string,
        id:string,
        name?: string ,
        password: string,
        role: string
    }
}

export {
    Author,
    CardItem,
    LoginData,
    LoginResponse,
    RegisterResponse,
    CoursesAllResponse,
    AuthorsAllResponse,
    CourseResponse,
    CreateCourseRequest,
    CreateCourseResponse,
    UpdateCourseRequest,
    UpdateCourseResponse,
    CreateAuthorResponse,
    UserResponse,
    AuthorResponse
};