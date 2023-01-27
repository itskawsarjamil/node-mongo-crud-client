import React, { useState } from 'react';
import Userdetails from './Userdetails';
import { useLoaderData } from 'react-router-dom';

const Home = () => {
    const usersData = useLoaderData();
    const [users, setUsers] = useState(usersData);
    const [addUser, setAddUser] = useState({});
    // console.log(users);
    const handleInput = (e) => {
        e.preventDefault();
        // const field = e.target.name.value;
        // const value = e.target.email.value;
        // console.log(field, value);
        fetch("http://localhost:5000/users", {
            method: "POST",
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(addUser),
        })
            .then(res => res.json())
            .then((result) => {
                if (result.insertedId) {
                    // console.log(result.insertedId);
                    const newData = { ...addUser, _id: result.insertedId };
                    const newUsers = [...users, newData];
                    console.log(newUsers);
                    setUsers(newUsers);
                }
            })
            .catch(e => console.log(e))
    }
    const handleData = (e) => {
        const fieldname = e.target.name;
        const fieldvalue = e.target.value;
        console.log(fieldname, fieldvalue);
        const newUser = { ...addUser };
        newUser[fieldname] = fieldvalue;
        console.log(newUser)
        setAddUser(newUser);
    }
    const handleDelete = (id) => {
        const agree = window.confirm("are you sure you want to delete?");
        if (agree) {
            fetch(`http://localhost:5000/users/${id}`, {
                method: "DELETE",
            })
                .then(res => res.json())
                .then((result) => {

                    if (result.acknowledged) {
                        const newUsersData = users.filter(user => user._id !== id);
                        console.log(newUsersData);
                        setUsers(newUsersData);
                    }
                })
                .catch(e => console.log(e))
        }

    }
    return (
        <div>
            <form onSubmit={handleInput}>
                <input onChange={handleData} type="text" name='name' placeholder='name' required />
                <input onChange={handleData} type="email" name='email' placeholder='email' required />
                <button type="submit">Add User</button>
            </form>
            <div>
                <h3>hello from home</h3>
                <h3>total user:{users.length}</h3>
                {
                    users.map((user, idx) => <Userdetails key={idx} user={user} handleDelete={handleDelete}></Userdetails>)
                }
            </div>
        </div>
    );
};

export default Home;