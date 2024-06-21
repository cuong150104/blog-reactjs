
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import requestApi from '../../helpers/api';
import { useForm } from 'react-hook-form';
import Navbar from '../../components/Client/Navbar/Navbar'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const Post = (id) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, trigger, formState: { errors } } = useForm();
    const [categories, setCategories] = useState([]);
    const params = useParams();
    const [postData, setPostData] = useState({});

    useEffect(() => {
        dispatch(actions.controlLoading(true));
        try {
            const renderData = async () => {
                const res = await requestApi('/categories', 'GET');
                console.log("res=> ", res);
                setCategories(res.data);

                const detailPost = await requestApi(`/posts/${params.id}`, 'GET');
                console.log("detailPost=> ", detailPost);

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


    return (
        <div>
            <Navbar />
            <div className="listWrapper">
                <div className="listResultPost">
                    <label className="form-label">Description:</label>
                    <div className="description-content" dangerouslySetInnerHTML={{ __html: postData.description }}></div>
                </div>

                <div className="listPostsNew">
                    <h1 className="lsTitle">Search</h1>
                    <div className="lsItem">
                        <label>Destination </label>
                        <label>Adguard là một trình chặn quảng cáo mạnh mẽ có thể được sử dụng như một plugin trình duyệt Safari. Chỉ cần b</label>
                    </div>
                </div>


            </div>

        </div>
    )
}

export default Post
