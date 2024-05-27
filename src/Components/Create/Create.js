import React, {
  Fragment,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import "./Create.css";
import Header from "../Header/Header";
import { FirebaseContext, AuthContext } from "../../store/Context";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const nameRef = useRef(null);

  const [nameError, setNameError] = useState("");
  const [catError, setCatError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [imgError, setImgError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    } else {
      setImage(null);
    }
  };

  const date1 = new Date() + "+00:00";
  const date = new Date(date1);

  const handleSubmit = async () => {
    try {
      if (name === "") {
        setNameError("Field is empty");
        return;
      }

      if (category === "") {
        setCatError("Field is empty");
        return;
      }

      if (price.toString() === "") {
        setPriceError("Field is empty");
        return;
      }

      const reg = /^[0-9]+$/;
      if (!price.toString().match(reg)) {
        setPriceError("Price must contain positive numbers");
        return;
      }

      if(price <= 0){
        setPriceError('only positive value');
        return;
      }
  
      if(image === ''){
        setImgError('Field is empty');
        return
      }

      const storage = getStorage(firebase);
      const storageRef = ref(storage, `/images/${image.name}`);
      await uploadBytes(storageRef, image);
      const url = await getDownloadURL(storageRef);
      const firestore = getFirestore(firebase);
      await addDoc(collection(firestore, "products"), {
        name,
        category,
        price,
        url,
        userId: user.uid,
        createdAt: date.toDateString(),
      });
      navigate("/");
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  useEffect(()=>{
    nameRef.current.focus()
  },[])

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            ref={nameRef}
            name="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {nameError && <div style={{ color: "red" }}>{nameError}</div>}
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          {catError && <div style={{ color: "red" }}>{catError}</div>}
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="fname"
            name="Price"
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
          />
          <br />
          {priceError && <div style={{ color: "red" }}>{priceError}</div>}
          <br />
          <img
            alt="Posts"
            width="200px"
            height="200px"
            src={image ? URL.createObjectURL(image) : ""}
          ></img>
          <br />
          {imgError && <div style={{ color: "red" }}>{imgError}</div>}
          <input onChange={handleImageChange} type="file"/>
          {/* <br />
          <input
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            type="file"
          /> */}
          <br />
          <button onClick={handleSubmit} className="uploadBtn">
            upload and Submit
          </button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
