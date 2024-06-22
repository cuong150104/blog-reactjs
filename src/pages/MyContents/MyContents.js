import React, { useEffect, useState } from 'react'
import DataTable from '../../components/common/DataTable'
import requestApi from '../../helpers/api'
import { useDispatch } from 'react-redux'
import * as actions from '../../redux/actions'
import { Button, Modal } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import moment from 'moment'
import { formatDateTime } from '../../helpers/common'
import Navbar from '../../components/Client/Navbar/Navbar'

const MyContents = () => {
    const dispatch = useDispatch()
    const [posts, setPosts] = useState([])
    const [numOfPage, setNumOfPage] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(4)
    const [searchString, setSearchString] = useState('')
    const [selectedRows, setSelectedRows] = useState([])
    const [deleteItem, setDeleteItem] = useState(null)
    const [deleteType, setDeleteType] = useState('single')
    const [showModal, setShowModal] = useState(false)
    const [refresh, setRefresh] = useState(Date.now())

    const params = useParams();

    const columns = [
        {
            name: "ID",
            element: row => row.id
        },
        {
            name: "Title",
            element: row => row.title
        },

        {
            name: "Summary",
            element: row => row.summary
        },
        {
            name: "Thumbnail",
            element: row => <img width="70px" src={process.env.REACT_APP_API_URL + '/' + row.thumbnail} />
        },
        {
            name: "Status",
            element: row => row.status == 1 ? "Active" : "Inactive"
        },
        {
            name: "Created at",
            element: row => formatDateTime(row.created_at)
        },
        {
            name: "Updated at",
            element: row => formatDateTime(row.updated_at)
        },
        {
            name: "Actions",
            element: row => (
                <>
                    <Link to={`/post/edit/${row.id}`} className="btn btn-sm btn-warning me-1"><i className="fa fa-pencil"></i> </Link>
                    <button type="button" className="btn btn-sm btn-danger me-1" onClick={() => handleDelete(row.id)}><i className="fa fa-trash"></i></button>
                </>
            )
        }
    ]
    // const formatDateTime = (datetime) => {
    //     return moment(datetime).format('DD/MM/YYYY h:mm:ss A')
    // }
    const handleDelete = (id) => {
        console.log("single delete with id => ", id)
        setShowModal(true)
        setDeleteItem(id)
        setDeleteType('single')
    }

    const handleMultiDelete = () => {
        console.log("multi delete => ", selectedRows)
        setShowModal(true)
        setDeleteType('multi')
    }

    const requestDeleteApi = () => {
        if (deleteType === 'single') {
            dispatch(actions.controlLoading(true))
            requestApi(`/posts/${deleteItem}`, 'DELETE', []).then(response => {
                setShowModal(false)
                setRefresh(Date.now())
                dispatch(actions.controlLoading(false))
            }).catch(err => {
                console.log(err)
                setShowModal(false)
                dispatch(actions.controlLoading(false))
            })
        } else {
            dispatch(actions.controlLoading(true))
            requestApi(`/posts/multiple?ids=${selectedRows.toString()}`, 'DELETE', []).then(response => {
                setShowModal(false)
                setRefresh(Date.now())
                setSelectedRows([])
                dispatch(actions.controlLoading(false))
            }).catch(err => {
                console.log(err)
                setShowModal(false)
                dispatch(actions.controlLoading(false))
            })
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            let roles = localStorage.getItem('id') || false;
            dispatch(actions.controlLoading(true)); // Bật trạng thái loading
            console.log("id user, ",`${params.id}`)
            console.log("id user roles, ",roles)
            try {
                const response = await requestApi(`/posts/post-by-user/${roles}`, 'GET', []);
                console.log("response=> ", response);
                setPosts(response.data.data); // Cập nhật danh sách bài đăng
                setNumOfPage(response.data.lastPage); // Cập nhật số trang cuối cùng
            } catch (error) {
                console.log("loi: ", error);
                // Xử lý trạng thái hoặc thông báo lỗi ở đây
            } finally {
                dispatch(actions.controlLoading(false)); // Tắt trạng thái loading
            }
        };

        fetchData();
    }, [currentPage, itemsPerPage, searchString, refresh]);

    return (
        <div>
            <Navbar />
            <div>
                <div id="layoutSidenav_content">
                    <main>
                        <div className="container-fluid px-4">

                            <div className='mb-3'>
                                <Link className='btn btn-sm btn-success me-2' to='/post/add'><i className="fa fa-plus"></i> Add new --</Link>
                                {selectedRows.length > 0 && <button type='button' className='btn btn-sm btn-danger' onClick={handleMultiDelete}><i className="fa fa-trash"></i> Delete</button>}
                            </div>
                            <DataTable
                                name="List Posts"
                                data={posts}
                                columns={columns}
                                numOfPage={numOfPage}
                                currentPage={currentPage}
                                onPageChange={setCurrentPage}
                                onChangeItemsPerPage={setItemsPerPage}
                                onKeySearch={(keyword) => {
                                    console.log("keyword in user list comp=> ", keyword)
                                    setSearchString(keyword)
                                }}
                                onSelectedRows={rows => {
                                    console.log("selected rows in uselist=> ", rows)
                                    setSelectedRows(rows)
                                }}
                            />
                        </div>
                    </main>
                    <Modal show={showModal} onHide={() => setShowModal(false)} size='sm'>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirmation</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Are you sure want to delete?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => setShowModal(false)}>Close</Button>
                            <Button className='btn-danger' onClick={requestDeleteApi}>Delete</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default MyContents
