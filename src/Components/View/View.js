import React, { useEffect, useState } from "react";

import "./View.css";
import { useContext } from "react";
import { PostContext } from "../../store/PostContext";
import { FirebaseContext } from "../../store/Context";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

function View() {

  const { firebase } = useContext(FirebaseContext);
  const { postDetails } = useContext(PostContext);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {

    const fetchUserDetails = async () => {
      try {
        const { userId }= postDetails;
        const firestore = getFirestore(firebase);
        const q = query(
          collection(firestore, "users"),
          where("id", "==", userId)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUserDetails(doc.data());
        });
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, [firebase, postDetails]);

  if (!postDetails) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails.url} alt= {postDetails.name || "Product Image"} />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.category}</span>
          <p>{postDetails.name}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        {userDetails && (
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails.username}</p>
            <p>{userDetails.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default View;
