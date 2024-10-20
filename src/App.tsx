import { useQuery, useMutation} from "@tanstack/react-query";
import { createPost, getPosts, query } from "./utils/api";
import { PostResponseData, userData } from "./utils/type";
import { useEffect, useState } from "react";

function App() {
  const USER_ID = 54754;
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const {
    data: usersData,
    error: usersError,
    isLoading: isUsersLoading,
  } = useQuery<userData[]>({
    queryKey: ["users"],
    queryFn: query,
  });

  const {
    data: postsData,
    error: postsError,
    isLoading: isPostsLoading,
    refetch: refetchGetPosts
  } = useQuery<PostResponseData[]>({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const {mutate: createPostMutation, isSuccess: isCreatePostSuccess} = useMutation({
    mutationFn: createPost
  })

  useEffect(() => {
    refetchGetPosts()
  }, [isCreatePostSuccess, refetchGetPosts])
  
  if (usersError) {
    return <div>Error: {String(usersError)}</div>;
  }

  return (
    <div>
<form onSubmit={(e) => {
  e.preventDefault();
  createPostMutation(
    {
      title,
      body,
      userId: USER_ID,
    }
  )

}}>
      <div>
        <input name="title" id="title" value={title}  onChange={(e)=>{
          setTitle(e.target.value)
        }}/>
      </div>
      <div>
        <input name="body" id="body" value={body}  onChange={(e)=>{
          setBody(e.target.value)
        }}/>
      </div>
      <button>Create</button>
      {/* {isUsersLoading ? (
        <p>Loading...</p>
      ) : (
        usersData?.map((user) => (
          <div
            key={user.id}
            style={{
              marginBottom: "1rem",
              border: "1px solid #ddd",
              padding: "1rem",
            }}
          >
            <div>
              <p><strong>Name:</strong> {user.name}</p>
            </div>
            <div>
              <p><strong>Username:</strong> {user.username}</p>
            </div>
            <div>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
          </div>
        ))
      )} */}
      </form>
      <div>
        {!isPostsLoading && postsData &&postsData.map((post) => (
          <div key={post.id}>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
