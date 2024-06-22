
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import requestApi from '../../helpers/api';
import { useForm } from 'react-hook-form';
import Navbar from '../../components/Client/Navbar/Navbar'
import AccountView from '../../components/Client/AccountView/AccountView';
import './Post.css'
import Comments from '../../components/Client/Comments/Comments';
import { toast } from 'react-toastify';
const Post = (id) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, setValue, trigger, formState: { errors } } = useForm();
    const [categories, setCategories] = useState([]);
    const params = useParams();
    const [postData, setPostData] = useState({});
    const [idAcount, setIdAccont] = useState();
    const [idPost, setIdPost] = useState(params.id);
    const [comments, setComment] = useState({})
    const [dataSumbit, setDataSubmit] = useState({ comments, idPost });
    const [commenting, setCommenting] = useState('');
    const [submittedComment, setSubmittedComment] = useState('');
    let idMy = localStorage.getItem('id') || false;

    const handleInputChange = (e) => {
        setCommenting(e.target.value);
        setDataSubmit({ postId: idPost, content: commenting });
    };

    const handleSubmit = async (data) => {
        data.preventDefault();
        if (commenting.trim()) {
            setSubmittedComment(commenting);
            setCommenting('');
            dispatch(actions.controlLoading(true));
            try {
                const res = await requestApi('/comments', 'POST', dataSumbit);
                dispatch(actions.controlLoading(false));
                toast.success('User has been created successfully', { position: 'top-center', autoClose: 2000 })
            } catch (error) {
                console.log('errors=> ', error);
                dispatch(actions.controlLoading(false));
            }
        }

    };

    useEffect(() => {
        dispatch(actions.controlLoading(true));
        try {
            const renderData = async () => {
                const res = await requestApi('/categories', 'GET');
                setCategories(res.data);
                const detailPost = await requestApi(`/posts/${params.id}`, 'GET');
                setIdAccont(detailPost.data.user.id)
                const fields = ['title', 'summary', 'description', 'thumbnail', 'category', 'status'];
                fields.forEach(field => {
                    if (field == 'category') {
                        setValue(field, detailPost.data[field].id);
                    } else {
                        setValue(field, detailPost.data[field]);
                    }
                });
                setPostData({ ...detailPost.data, thumbnail: process.env.REACT_APP_API_URL + '/' + detailPost.data.thumbnail })
                dispatch(actions.controlLoading(false));
            }
            renderData();
        } catch (err) {
            console.log('err=>', err);
            dispatch(actions.controlLoading(false));
        }
    }, []);

    useEffect(() => {
        const render  = async() =>{
            dispatch(actions.controlLoading(true));
            requestApi(`/comments/comments-by-user/${idPost}`, 'GET').then(res => {
                setComment(res.data.data);
                dispatch(actions.controlLoading(false));
            }).catch(err => {
                console.log("err =>", err);
                dispatch(actions.controlLoading(false));
            })
        }
        render();
    }, [submittedComment, commenting,handleSubmit])



    return (
        <div>
            <Navbar />
            <div className="listWrapperPost">
                <div className="listResultPost">
                    <label className="form-label">Description:</label>
                    <div className="description-content" dangerouslySetInnerHTML={{ __html: postData.description }}></div>
                </div>

                <div className="listPostsNew">
                    <div className="lsItem">
                        <AccountView followerId={idMy} followedId={idAcount} />
                    </div>
                    <div>
                    </div>
                </div>


            </div>
            <div >
                <div class="container mt-2 mb-2">
                    <div class="row height d-flex justify-content-center align-items-center">
                        <div class="col-md-7">
                            <div class="card">
                                <div class="p-3">
                                    <h6>Comments</h6>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="mt-3 d-flex flex-row align-items-center p-3 form-color">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter your comment..."
                                            value={commenting}
                                            onChange={handleInputChange}
                                        />
                                        <button type="submit" className="btn btn-primary ml-2" disabled={!commenting.trim()}>
                                            Submit
                                        </button>
                                    </div>
                                </form>
                                {comments && comments.length > 0 && comments.map((item) => (
                                    <div className="post-item" key={item.id}>
                                        <Comments item={item} />
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Post
