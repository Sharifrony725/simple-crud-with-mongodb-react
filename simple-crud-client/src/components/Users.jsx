import { useLoaderData , Link} from 'react-router-dom';
import { useState } from "react";

const Users = () => {

    const userList = useLoaderData();
    const [users, setUsers] = useState(userList);

    const handleDelete = _id =>{
      fetch(`http://localhost:5000/users/${_id}`,{
        method: "DELETE"
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
          if(data.deletedCount > 0){
            alert("Successfully deleted");
            const remaining = users.filter(user => user._id !== _id);
            setUsers(remaining)
          }else{
            alert("No documents matched the query");
          }
      })
    }

    return (
      <div className="text-center my-5 border w-1/2 mx-auto">
        {users.map((user) => (
          <div key="{user._id}" className="my-3">
            <p>
              {user.name} : {user.email}
              <Link to={`/update/${user._id}`}>
                <button className="btn btn-success btn-sm ml-2">Edit</button>
              </Link>
              <button
                onClick={() => handleDelete(user._id)}
                className="btn btn-primary btn-sm ml-2"
              >
                X
              </button>
            </p>
          </div>
        ))}
      </div>
    );
};

export default Users;