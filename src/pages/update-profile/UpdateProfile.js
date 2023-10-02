// import React, { useState } from "react";
// import "./UpdateProfile.css";

// const UpdateProfile = () => {
//   const [fullname, setFullname] = useState("");
//   const [photourl, setPhotourl] = useState("");

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     const idToken = localStorage.getItem("token");
//     try {
//       const obj = {
//         idToken: idToken,
//         displayName: fullname,
//         photoUrl: photourl,
//         deleteAttribute: [],
//         returnSecureToken: false,
//       };

//       const response = await fetch(
//         "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCEQS_IScnEU4fKaC2xhl5QvjZ1St0cJX4",
//         {
//           body: JSON.stringify(obj),
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       const data = await response.json();
//       console.log("data=", data);
//       alert("successfully updated the user details");
//       setFullname("");
//       setPhotourl("");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <>
//       <div>
//         Winners never quit, Quitters never win.
//         <p>
//           Your profile is <strong>64%</strong> completed. A complete profile has
//           higher chances of landing a job. Complete now.
//         </p>
//       </div>
//       <form onSubmit={submitHandler}>
//         <button className="cancel">Cancel</button>
//         <h3>Contact details</h3>
//         <label>Full Name:</label>
//         <input
//           type="text"
//           value={fullname}
//           onChange={(e) => setFullname(e.target.value)}
//         ></input>
//         <label>Profile photo URL:</label>
//         <input
//           type="text"
//           value={photourl}
//           onChange={(e) => setPhotourl(e.target.value)}
//         ></input>
//         <button>Update</button>
//       </form>
//     </>
//   );
// };

// export default UpdateProfile;

import React, { useState, useEffect } from "react";
import "./UpdateProfile.css";

const UpdateProfile = () => {
  const [fullname, setFullname] = useState("");
  const [photourl, setPhotourl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the user's information when the component mounts
    const fetchUserDetails = async () => {
      const idToken = localStorage.getItem("token");
      try {
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCEQS_IScnEU4fKaC2xhl5QvjZ1St0cJX4`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ idToken }),
          }
        );
        const data = await response.json();
        if (data.users && data.users.length > 0) {
          const user = data.users[0];
          setFullname(user.displayName || "");
          setPhotourl(user.photoUrl || "");
        }
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };

    fetchUserDetails();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const idToken = localStorage.getItem("token");
    try {
      const obj = {
        idToken: idToken,
        displayName: fullname,
        photoUrl: photourl,
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
      setFullname("");
      setPhotourl("");
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        Winners never quit, Quitters never win.
        <p>
          Your profile is <strong>64%</strong> completed. A complete profile has
          higher chances of landing a job. Complete now.
        </p>
      </div>
      <form onSubmit={submitHandler}>
        <button type="button" className="cancel">
          Cancel
        </button>
        <h3>Contact details</h3>
        <label>Full Name:</label>
        <input
          type="text"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        ></input>
        <label>Profile photo URL:</label>
        <input
          type="text"
          value={photourl}
          onChange={(e) => setPhotourl(e.target.value)}
        ></input>
        <button>Update</button>
      </form>
    </>
  );
};

export default UpdateProfile;
