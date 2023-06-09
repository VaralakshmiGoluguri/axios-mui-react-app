import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
function ViewPost() {
  const navigate = useNavigate();
  const params = useParams();
  const [searchPost, setSearchPost] = useState({});
  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
      .then((data) => {
        setSearchPost(data.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <h2>UserId: {params.id}</h2>
      <h1>Title: {searchPost.title}</h1>
      <h3>Body: {searchPost.body}</h3>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
}

export default ViewPost;
