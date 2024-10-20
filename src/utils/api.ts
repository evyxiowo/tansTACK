import { CreatePostRequestBody } from "./type";

 export const query = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await res.json()
    return data;
 }

 export const getPosts = async () => {
   const res = await fetch('https://jsonplaceholder.typicode.com/posts')
   const data = await res.json()
   return data;
 }

 export const createPost = async (body:
   CreatePostRequestBody) => {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
         method: 'POST',
         body: JSON.stringify(body),
         headers: {
            'Content-type': 'application/json; charset=UTF-8',
         },
      })
      return res.json()
   }
 
 