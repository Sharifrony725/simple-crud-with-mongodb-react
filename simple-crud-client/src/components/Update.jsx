import { useLoaderData} from 'react-router-dom';
const Update = () => {
    const loadedUser = useLoaderData();
    const handleUpdate = event =>{
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const updatedUser = {name, email}

        fetch(`http://localhost:5000/users/${loadedUser._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        })
          .then((res) => res.json())
          .then((data) => {
              console.log(data);
            if(data.modifiedCount>0){
                alert('User info updated successfully')
            }
          });
        
    }

    return (
      <div className="w-1/2 mx-auto border my-5 text-center">
        <h2>Update User Info</h2>
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            defaultValue={loadedUser?.name}
            name="name"
            className="input input-bordered input-success w-full max-w-xs"
          />
          <br/>
          <br/>
          <input
            type="text"
            defaultValue={loadedUser?.email}
            name="email"
            className="input input-bordered input-success w-full max-w-xs"
          />
          <br/>
          <br/>
          <button className="btn btn-primary mb-5">Update</button>
        </form>
      </div>
    );
};

export default Update;