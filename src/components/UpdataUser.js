import React, { useState } from 'react';
import { Navigate, useLoaderData, useNavigate } from 'react-router-dom';

const UpdataUser = () => {
    const data = useLoaderData();
    const [updatevalue, setUpdateValue] = useState(data);
    const navigate = useNavigate();
    const handleUpdata = e => {
        fetch(`http://localhost:5000/updateuser/${updatevalue._id}`, {
            method: "PUT",
            headers: {
                'content-type': "application/json",
            },
            body: JSON.stringify(updatevalue),
        })
            .then(res => res.json())
            .then(data => {
                
                if (data.acknowledged) {
                    alert('user updated')
                    
                    navigate('/');
                }
            });
    }

    const handleData = e => {
        const fieldname = e.target.name;
        const fieldvalue = e.target.value;
        // console.log(fieldname,fieldvalue);
        const newdata = { ...updatevalue };
        newdata[fieldname] = fieldvalue;
        // console.log(newdata);
        setUpdateValue(newdata);
    }


    return (
        <form onSubmit={handleUpdata}>
            <input type="text" name='name' onChange={handleData} defaultValue={updatevalue.name} placeholder='name' required />
            <input type="email" name='email' onChange={handleData} defaultValue={updatevalue.email} placeholder='email' required />
            <button type="submit">Update User</button>
        </form>
    );
};

export default UpdataUser;