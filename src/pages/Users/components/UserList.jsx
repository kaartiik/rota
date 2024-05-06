import '../Users.css'

const UserList = ({ users, onDelete }) => {
   return (
     <ul className="user-list">
       {users.map(user => (
         <li key={user.id}>
           {user.name} ({user.email})
           <button onClick={() => onDelete(user.id)}>Delete</button>
         </li>
       ))}
     </ul>
   );
 };

 export default UserList;