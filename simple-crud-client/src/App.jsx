import { json } from 'react-router-dom';
import './App.css'

function App() {

  const handleAddUser = e =>{
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = {email, name};
    fetch('http://localhost:5000/users', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
  }

  return (
    <div>

      <div className="w-1/2 mx-auto text-center ml-10 border mt-5">
        <h2 className='text-2xl font-semibold my-5'>Simple CRUD Operation</h2>
        <form onSubmit={handleAddUser}>
          <input
            type="text"
            placeholder="Type here your name"
            name="name"
            className="input input-bordered input-success w-full max-w-xs"
          />{" "}
          <br />
          <br />
          <input
            type="text"
            placeholder="Type here your email"
            name="email"
            className="input input-bordered input-success w-full max-w-xs"
          />{" "}
          <br />
          <br />
          <button className='btn btn-primary mb-5'>+Add User</button>
        </form>
      </div>
    </div>
  );
}

export default App
