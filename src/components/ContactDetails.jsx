import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import db from "../firebaseConfig";

function ContactDetails() {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [contact, setContact] = useState(null); 

  
  useEffect(() => {
    const fetchContact = async () => {
      const docRef = doc(db, "contacts", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setContact(docSnap.data());
      }
    };
    fetchContact();
  }, [id]);

  
  const handleDelete = async () => {
    await deleteDoc(doc(db, "contacts", id));
    navigate("/"); 
  };

  
  if (!contact) return <p>Loading...</p>;

  return (
    <div className="details-container">
      <h1 className="details-title">
        {contact.firstName} {contact.lastName}
      </h1>
      <p className="details-email">
        Email: {contact.email || "No email provided"}
      </p>
      <div className="details-buttons">
        {}
        <button onClick={handleDelete} className="delete-btn">
          Delete
        </button>
        {}
        <a href={`/edit-contact/${id}`} className="edit-btn">
          Edit
        </a>
        {}
        <a href="/" className="back-btn">
          Back to Home
        </a>
      </div>
    </div>
  );
}

export default ContactDetails;
