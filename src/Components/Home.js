import axios from "axios";
import React,{ useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const deletePost = (postToBeDeleted) => {
    // eslint-disable-next-line no-restricted-globals
    const a = window.confirm('Are you sure wanna delete this post')
    console.log(a)
    if(a===true){
    console.log("post deleted");
    axios
      .delete(
        `https://jsonplaceholder.typicode.com/posts/${postToBeDeleted.id}`,{data:{
          postToBeDeleted}}
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
      console.log('deleted post',postToBeDeleted.id)
      const newposts = posts.filter(item => item.id !== postToBeDeleted.id);
      console.log('updated', newposts)
      setPosts( newposts );
    }
    else{
      console.log('Post is not deleted')
    }
    navigate('/')
  };

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts?_limit=30")
      .then((data) => {
        setPosts(data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <button onClick={() => navigate("createedit")}>Add New Post</button>
      <div>
        <table>
          <tr>
            <th>User Id</th>
            <th>Title</th>
            <th>Body</th>
            <th>Modifications</th>
          </tr>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.userId}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
              <td>
                <button onClick={() => navigate(`viewpost/${post.id}`)}>
                  View
                </button>
                <button onClick={() => navigate(`createedit/${post.id}`)}>
                  Edit
                </button>
                <button onClick={() => deletePost(post)}>Delete</button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default Home;
