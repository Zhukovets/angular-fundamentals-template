export interface IApiResponse<T> {
    successful: boolean;
    result: T;
}