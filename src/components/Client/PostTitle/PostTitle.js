
import { Link } from "react-router-dom";
import './PostTitle.css';

import React, { useEffect, useState } from 'react'

const Post = ({ item }) => {

    return (
        <Link
            className="searchItem"
            to={`/post/${item.id}`}
        >
            <img alt="" className="siImg" />
            <div className="siDesc">
                <div className="flex-container">
                    <img
                        src={`${process.env.REACT_APP_API_URL}/${item.user.avatar}`}
                        className="mb-2"
                        alt="User Avatar"
                    />
                    <h3 className="siTitle">
                        {`${item.user.first_name} ${item.user.last_name}`}
                    </h3>
                </div>

                <h5 className="siTitle">{item.title}</h5>

            </div>

        </Link>
    )
}

export default Post
