
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
import Vote from '../../components/Client/Vote/Vote';
const Post = (id) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, setValue, trigger, formState: { errors } } = useForm();
    const [categories, setCategories] = useState([]);
    const params = useParams();
    const [postData, setPostData] = useState({});
    const [idAcount, setIdAccont] = useState();
    const [refresh, setRefresh] = useState(Date.now())
    let idMy = localStorage.getItem('id') || false;

    const [idPost, setIdPost] = useState(params.id);

    const [comments, setComment] = useState({})
    const [dataSumbit, setDataSubmit] = useState({ comments, idPost });


    const [commenting, setCommenting] = useState('');
    const [submittedComment, setSubmittedComment] = useState('');

    const [check, setCheck] = useState(false)

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
                console.log('data submit => ', dataSumbit);
                const res = await requestApi('/comments', 'POST', dataSumbit);
                console.log('res comment okokokokokokokok => ', res);
                setRefresh(Date.now())
                dispatch(actions.controlLoading(false));
                toast.success('User has been created successfully', { position: 'top-center', autoClose: 2000 })
                // setTimeout(() => navigate('/users'), 3000)
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
                // console.log("res idMy=> ", idMy);
                setCategories(res.data);
                const detailPost = await requestApi(`/posts/${params.id}`, 'GET');

   
                setIdAccont(detailPost.data.user.id)
                
                 console.log("res idMy=00000000000> ", detailPost.data.user.id);
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
    const render = async () => {
        dispatch(actions.controlLoading(true));
        console.log('err=>ssss', idPost);
        requestApi(`/comments/comments-by-user/${idPost}`, 'GET').then(res => {
            console.log("hhahahh ssssss=>", res.data.data);
            setComment(res.data.data);
            dispatch(actions.controlLoading(false));
        }).catch(err => {
            console.log("err ssssssssssssss=>", err);
            dispatch(actions.controlLoading(false));
        })
    }

    useEffect(() => {
        render();
    }, [refresh])



    return (
        <div>
            <Navbar />
            <div className="listWrapperPost row mb-3">
                <div className='col-md-1'>
                    <Vote id={params.id} />
                </div>
                <div className="listResultPost col-md-7">
                    <label className="form-label">Description:</label>
                    <div className="description-content" dangerouslySetInnerHTML={{ __html: postData.description }}></div>
                </div>
                <div className="listPostsNew col-md-3">
                    <div className="lsItem">
                       {idAcount && <AccountView followerId={idMy} followedId={idAcount} />}
                       {/* <AccountView followerId={idMy} followedId={idAcount} /> */}
                    </div>
                    <div>
                    </div>
                </div>
            </div>

            <div >
                <div className="container mt-2 mb-2">
                    <div className="row height d-flex justify-content-center align-items-center">
                        <div className="col-md-7">
                            <div className="card">
                                <div className="p-3">
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
