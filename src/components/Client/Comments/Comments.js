
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
        // <div className="d-flex flex-row p-3">
        //     <img src={process.env.REACT_APP_API_URL + '/' + item.item.user.avatar} width="40" height="40" className="rounded-circle mr-3" alt="User Avatar" />
        //     <div className="w-100">
        //         <div className="d-flex justify-content-between align-items-center">
        //             <div className="d-flex flex-row align-items-center">
        //             <span class="mr-2">{ item.item.user.first_name} { item.item.user.last_name}</span>
        //                 {/* <small className="c-badge">{badge}</small> */}
        //             </div>
        //             {/* <small>{time}</small> */}
        //         </div>
        //         <p className="text-justify comment-text mb-0">{item.item.content}</p>
        //         <div className="d-flex flex-row user-feed">
        //             {/* <span className="wish"><i className="fa fa-heartbeat mr-2"></i>{likesCount}</span> */}
        //             <span className="ml-3"><i className="fa fa-comments-o mr-2"></i>Reply</span>
        //         </div>
        //     </div>
        // </div>
        <div class="mt-2">
            <div class="d-flex flex-row p-3">
                {/* <img src={process.env.REACT_APP_API_URL + '/' + item.item.user.avatar} width="30" height="10" className="rounded-circle mr-1" alt="User Avatar" /> */}

                <img src="https://i.imgur.com/zQZSWrt.jpg" width="40" height="40" class="rounded-circle mr-3"></img>
                <div class="w-100">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex flex-row align-items-center">

                            <span class="mr-2">{item.item.user.first_name} {item.item.user.last_name}</span>
                            <small class="c-badge">Top Comment</small>
                        </div>
                        <small>12h ago</small>
                    </div>
                    <p class="text-justify comment-text mb-0">{item.item.content}</p>
                    <div class="d-flex flex-row user-feed">
                        <span class="wish"><i class="fa fa-heartbeat mr-2"></i>24</span>
                        <span class="ml-3"><i class="fa fa-comments-o mr-2"></i>Reply</span>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Comments;
