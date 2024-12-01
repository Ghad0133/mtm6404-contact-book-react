import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../firebaseConfig";

function Home() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "contacts"));
        const contactsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched Contacts:", contactsData); 
        setContacts(
          contactsData.sort((a, b) => a.lastName?.localeCompare(b.lastName || ""))
        );
      } catch (err) {
        setError(err.message);
        console.error("Error fetching contacts:", err);
      }
    };

    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter(
    (contact) =>
      (contact.firstName?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (contact.lastName?.toLowerCase() || "").includes(search.toLowerCase())
  );

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="home-container">
      <h1>Contact Book</h1>
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />
      <ul className="contact-list">
        {filteredContacts.map((contact) => (
          <li key={contact.id} className="contact-item">
            <a href={`/contact/${contact.id}`} className="contact-link">
              {contact.firstName && contact.lastName
                ? `${contact.firstName} ${contact.lastName}`
                : "Name Missing"}
            </a>
          </li>
        ))}
      </ul>
      <a href="/add-contact" className="add-contact-btn">
        Add New Contact
      </a>
    </div>
  );
}

export default Home;
