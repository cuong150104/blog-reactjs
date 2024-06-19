import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'; // Ensure you import Link from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import requestApi from '../../helpers/api';
import { toast } from 'react-toastify';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CustomUploadAdapter from '../../helpers/CustomUploadAdapter';
const PostUpdate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, trigger, formState: { errors } } = useForm();
    const [categories, setCategories] = useState([]);
    const params = useParams();
    const [postData, setPostData] = useState({});

    const handleSubmitFormAdd = async (data) => {
        console.log('data form->', data);

        let formData = new FormData();
        for (let key in data) {
            if (key === 'thumbnail') {
                if (data.thumbnail[0] instanceof File) {
                    formData.append(key, data[key][0]);
                }
            } else {
                formData.append(key, data[key]);
            }
        }

        dispatch(actions.controlLoading(true));

        try {
            const res = await requestApi(`/posts/${params.id}`, 'PUT', formData, 'json', 'multipart/form-data');
            console.log('res=> ', res);
            dispatch(actions.controlLoading(false));
            toast.success('Post has been updated successfully!', { position: 'top-center', autoClose: 2000 });
            setTimeout(() => navigate('/posts'), 3000);
        } catch (error) {
            console.log('error=>', error);
            dispatch(actions.controlLoading(false));
        }
    };

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

    const onThumbnailChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                setPostData({ ...postData, thumbnail: reader.result })
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    function uploadPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            // Configure the URL to the upload script in your backend here!
            return new CustomUploadAdapter(loader);
        };
    }
    return (
        <div id="layoutSidenav_content">
            <main>
                <div className="container-fluid px-4">
                    <h1 className="mt-4">Update post</h1>
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
                        <li className="breadcrumb-item"><Link to="/posts">Posts</Link></li>
                        <li className="breadcrumb-item active">Update</li>
                    </ol>
                    <div className="card mb-4">
                        <div className="card-header">
                            <i className="fas fa-plus me-1"></i>
                            Update
                        </div>
                        <div className="card-body">
                            <div className="row mb-3">
                                <form>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label className="form-label">Title:</label>
                                            <input {...register('title', { required: 'Title is quired.' })} type="text" className="form-control" placeholder="Enter title" />
                                            {errors.title && <p style={{ color: 'red' }}>{errors.title.message}</p>}
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Summary:</label>
                                            <textarea row="4" {...register('summary', { required: 'Summary is quired.' })} type="text" className="form-control" placeholder="Enter Summary" />
                                            {errors.summary && <p style={{ color: 'red' }}>{errors.summary.message}</p>}
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Description:</label>
                                            <CKEditor
                                                editor={ClassicEditor}
                                                data={postData.description}
                                                onReady={editor => {
                                                    register('description', { required: "Description is required" })
                                                }}
                                                onChange={(event, editor) => {
                                                    const data = editor.getData();
                                                    console.log("data => ", data);
                                                    setValue('description', data);
                                                    trigger('description')
                                                }}
                                                config={
                                                    {
                                                        extraPlugins: [uploadPlugin]
                                                    }
                                                }
                                            />
                                            {errors.description && <p style={{ color: 'red' }}>{errors.description.message}</p>}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Thumbnail:</label>
                                        {postData.thumbnail && <img style={{ with: "300px" }} src={postData.thumbnail} className='mb-2' alt="..." />}
                                        <div className='input-file'>
                                            <label htmlFor='file' className="btn-file btn-sm btn bt-primary">Brose files</label>
                                            <input id="file" type="file" name="thumbnail" {...register("thumbnail", { onChange: onThumbnailChange })} />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Category:</label>
                                        <select {...register('category', { required: 'Category is quired.' })} type="password" className="form-control" placeholder="Enter Category" >
                                            <option value="">--Select a category--</option>
                                            {categories.map(cat => { return <option key={cat.id} value={cat.id}>{cat.name}</option> })}
                                        </select>
                                        {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Status:</label>
                                        <select {...register('status')} className="form-select">
                                            <option value="1">Active</option>
                                            <option value="2">Inactive</option>
                                        </select>
                                    </div>
                                    <button type="button" onClick={handleSubmit(handleSubmitFormAdd)} className="btn btn-success">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default PostUpdate;
