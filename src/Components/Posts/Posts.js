import React, { useContext, useEffect, useState } from "react";

import Heart from "../../assets/Heart";
import "./Post.css";
import { FirebaseContext } from "../../store/Context";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { PostContext } from "../../store/PostContext";
import { useNavigate } from "react-router-dom";

function Posts() {
  const { firebase } = useContext(FirebaseContext);
  const { setPostDetails } = useContext(PostContext);
  const [products, setProducts] = useState([]);  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const firestore = getFirestore(firebase);
        const querySnapshot = await getDocs(collection(firestore, "products"));
        const allPost = querySnapshot.docs.map((product) => {
          return {
            ...product.data(),
            id: product.id,
          };
        });
        setProducts(allPost);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, [firebase]);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((product) => (
              <div key={product.id} className="card" onClick={() => {
                setPostDetails(product)
                navigate("/view");
                }}>
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img
                    src={product.url}
                    alt={product.name || "Product Image"}
                  />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price}</p>
                  <span className="kilometer">{product.category}</span>
                  <p className="name"> {product.name}</p>
                </div>
                <div className="date">
                  <span>{product.createdAt}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>

          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/pexels-mike-bird-244553.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 150000</p>
              <span className="kilometer">Wheels</span>
              <p className="name"> Allows</p>
            </div>
            <div className="date">
              <span>10/5/2022</span>
            </div>
          </div>
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/download.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 100000</p>
              <span className="kilometer">cycle</span>
              <p className="name"> Firefox</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
