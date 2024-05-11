import { useState } from "react";

const AddUserForm = ({ onAddUser }) => {
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
 
   const handleSubmit = (event) => {
     event.preventDefault();
     onAddUser({ name, email });
     setName('');
     setEmail('');
   };
 
   return (
     <form onSubmit={handleSubmit}>
       <input
         type="text"
         placeholder="Name"
         value={name}
         onChange={e => setName(e.target.value)}
         required
       />
       <input
         type="email"
         placeholder="Email"
         value={email}
         onChange={e => setEmail(e.target.value)}
         required
       />
       <button type="submit">Add User</button>
     </form>
   );
 };

 export default AddUserForm;