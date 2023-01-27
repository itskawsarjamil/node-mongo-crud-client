import React from 'react';
import { Link } from 'react-router-dom';

const Userdetails = ({ user,handleDelete }) => {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "40px" }}>
            <h2>name:{user.name}</h2>

            <h4>email: {user.email}</h4>

            <Link to={`/updateuser/${user._id}`}
            >
                <button>update</button>
            </Link>

            <button onClick={() => handleDelete(user._id)}>X</button>
        </div>
    );
};

export default Userdetails;