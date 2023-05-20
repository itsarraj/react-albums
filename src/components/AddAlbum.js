import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from './index';
import toast, { Toaster } from 'react-hot-toast';

const AlbumList = (props) => {
    const [title, setTitle] = useState('');
    const [userId, setUserId] = useState('');
    const [addingAlbum, setAddingAlbum] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setAddingAlbum(true);
        let error = false;

        if (!title || !userId) {
            toast.error('Please fill all the fields');
            error = true;
        }

        if (error) {
            return setAddingAlbum(false);
        }

        const addedornot = await props.handleAddAlbum({ title, userId });
        console.log('addedornot', addedornot.status);
        if (addedornot.status === 201) {
            return toast.success('Album added successfully');
        } else {
            toast.error('Album not added');
        }
        setAddingAlbum(false);
    };
    return (
        <>
            {/* Navbar */}
            <Navbar />

            <div className="addalbum-container">
                <div className="addalbum-form">
                    <h2>Add Album</h2>
                    <form onSubmit={handleFormSubmit}>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <label htmlFor="userId">User ID</label>
                        <input
                            type="number"
                            name="userId"
                            id="userId"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                        {/* <Link to="/"> */}
                        <button disabled={addingAlbum} type="submit">
                            {addingAlbum ? 'Adding Album...' : 'Add Album'}
                        </button>
                        {/* </Link> */}
                    </form>
                </div>
            </div>
        </>
    );
};

export default AlbumList;
