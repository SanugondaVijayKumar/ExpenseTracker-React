import React, { useRef } from "react";
import "./UpdateProfile.css";

const UpdateProfile = () => {
  const fullnameInputRef = useRef();
  const photourlInputRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const enteredFullName = fullnameInputRef.current.value;
      const enteredPhotoURL = photourlInputRef.current.value;
      const idToken = localStorage.getItem("token");
      const obj = {
        idToken: idToken,
        displayName: enteredFullName,
        photoUrl: enteredPhotoURL,
        deleteAttribute: [],
        returnSecureToken: false,
      };

      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCEQS_IScnEU4fKaC2xhl5QvjZ1St0cJX4",
        {
          body: JSON.stringify(obj),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log("data=", data);
      alert("successfully updated the user details");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        Winners never quit, Quitters never win.
        <p>
          Your profile is <strong>64%</strong> completed. A complete profile has
          higher chances of landing a job.Complete now.
        </p>
      </div>
      <form onSubmit={submitHandler}>
        <button className="cancel">Cancel</button>
        <h3>Contact details</h3>
        <label>Full Name:</label>
        <input type="text" ref={fullnameInputRef}></input>
        <label>Profile photo URL:</label>
        <input type="text" ref={photourlInputRef}></input>
        <button>Update</button>
      </form>
    </>
  );
};

export default UpdateProfile;
