
import './Comments.css'
import React, { useEffect, useState } from 'react';
import * as actions from '../../../redux/actions';
import requestApi from '../../../helpers/api';
import { useDispatch } from 'react-redux';
const Comments = (item) => {
    const dispatch = useDispatch();
    const [comments, setComment] = useState({})

    console.log("check o dau, ", item.item.context);
    return (
        <div className="mt-2">
            <div className="d-flex flex-row p-3">
                <div className="w-100">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex flex-row align-items-center">

                            <img src={process.env.REACT_APP_API_URL + '/' + item.item.user.avatar} width="30" height="10" className="rounded-circle mr-1" alt="User Avatar" />
                            <span className="mr-2">  {item.item.user.first_name} {item.item.user.last_name}</span>
                            <small className="c-badge">Top Comment</small>
                        </div>
                        <small></small>
                    </div>
                    <p className="text-justify comment-text mb-0">{item.item.content}</p>
                    <div className="d-flex flex-row user-feed">
                        <span className="wish"><i className="fa fa-heartbeat mr-2"></i>24</span>
                        <span className="ml-3"><i className="fa fa-comments-o mr-2"></i>Reply</span>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Comments;
