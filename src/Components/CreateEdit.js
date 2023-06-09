import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function CreateEdit() {
  const navigate=useNavigate();
  const params = useParams();
  const [formData, setFormData] = useState({});
  useEffect(() => {
    if (params.id) {
      axios
        .get(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
        .then((data) => {
          setFormData(data.data);
        })
        .catch((error) => console.log(error));
    }
  }, [params.id]);
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    if (!params.id) {
      console.log("post created");
      axios
        .post("https://jsonplaceholder.typicode.com/posts", formData)
        .then((response) => {
          console.log(response.status);
        });
        // navigate('/')
    } else {
      console.log("successfully updated the post");
      axios
        .patch(
          `https://jsonplaceholder.typicode.com/posts/${params.id}`, formData)
        .then((response) => {
          console.log(response.status);
        });
        // navigate('/')
    }
    setFormData({});
    // navigate('/')
  };

  return (
    <div>
      <h1>Create Post</h1>
      <form>
        <label>
          Enter UserId:
          <input
            type="text"
            name="userId"
            value={formData.userId || ""}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Enter Title:
          <input
            type="text"
            name="title"
            value={formData.title || ""}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Enter Body:{" "}
          <textarea
            name="body"
            value={formData.body || ""}
            onChange={handleChange}
          />
        </label>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
      <button onClick={() => setFormData({})}>Reset</button>
    </div>
  );
}

export default CreateEdit;
