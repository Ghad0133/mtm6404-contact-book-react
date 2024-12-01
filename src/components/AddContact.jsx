import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import db from "../firebaseConfig";

function AddContact() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "contacts"), form);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add Contact</h1>
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
      <button type="submit">Add</button>
    </form>
  );
}

export default AddContact;
