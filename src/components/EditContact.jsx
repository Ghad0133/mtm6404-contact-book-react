import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import db from "../firebaseConfig";

function EditContact() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "" });

  useEffect(() => {
    const fetchContact = async () => {
      const docRef = doc(db, "contacts", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setForm(docSnap.data());
      } else {
        console.error("No such document!");
        navigate("/");
      }
    };
    fetchContact();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "contacts", id);
    await updateDoc(docRef, form);
    navigate(`/contact/${id}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit Contact</h1>
      <input
        type="text"
        placeholder="First Name"
        value={form.firstName}
        onChange={(e) => setForm({ ...form, firstName: e.target.value })}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={form.lastName}
        onChange={(e) => setForm({ ...form, lastName: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <button type="submit">Save</button>
      <a href={`/contact/${id}`}>Cancel</a>
    </form>
  );
}

export default EditContact;
