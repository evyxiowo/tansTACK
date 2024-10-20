export interface userData{
    id: number,
    name: string,
    username: string,
    email: string,
}

export interface CreatePostRequestBody {
    title: string;
    body: string;
    userId: number;
}

export interface PostResponseData{

    id: number,
    title: string;

    body: string
    userId: number;

}
