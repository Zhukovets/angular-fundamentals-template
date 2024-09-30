 const baseUrl: string = 'http://localhost:4000';

// Courses
 const coursesUrl: string = baseUrl + '/courses';
 const coursesAllUrl: string = baseUrl + '/courses/all';
 const coursesFilterUrl: string = baseUrl + '/courses/filter';
 const coursesAddUrl: string = baseUrl + '/courses/add';

 // Authors
 const authorAddUrl: string = baseUrl + '/authors/add';
 const  authorsAllUrl: string = baseUrl + '/authors/all';
 const  authorByIdUrl: string = baseUrl + '/authors';

 // User
 const  usersUrl: string = baseUrl + '/users/me';

export {baseUrl, coursesAllUrl, coursesFilterUrl, coursesAddUrl,authorsAllUrl,coursesUrl,authorAddUrl,authorByIdUrl,usersUrl};