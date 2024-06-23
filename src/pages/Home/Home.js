
import Navbar from '../../components/Client/Navbar/Navbar'
import { Link } from "react-router-dom";
import './Home.css';
import React, { useEffect, useState } from 'react'
import DataTable from '../../components/common/DataTable'
import requestApi from '../../helpers/api'
import { useDispatch } from 'react-redux'
import * as actions from '../../redux/actions'
import { formatDateTime } from '../../helpers/common'
import PostTitle from '../../components/Client/PostTitle/PostTitle'
import ReactPaginate from "react-paginate";
import Vote from'../../components/Client/Vote/Vote';

const Home = () => {
  const dispatch = useDispatch()
  const [posts, setPosts] = useState([])
  const [numOfPage, setNumOfPage] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(4)
  const [searchString, setSearchString] = useState('')
  const [refresh, setRefresh] = useState(Date.now())

  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
  };


  useEffect(() => {
    dispatch(actions.controlLoading(true))
    let query = `?items_per_page=${itemsPerPage}&page=${currentPage}&search=${searchString}`
    requestApi(`/posts${query}`, 'GET', []).then(response => {
      console.log("response=> ", response)
      setPosts(response.data.data)
      setNumOfPage(response.data.lastPage)
      dispatch(actions.controlLoading(false))
    }).catch(err => {
      console.log(err)
      dispatch(actions.controlLoading(false))
    })
  }, [currentPage, itemsPerPage, searchString, refresh])

  return (
    <div>
      <Navbar />
      <div className="listContainer1">
        <div className="listWrapper">
          <div className="listResultPost">
            {posts && posts.length > 0 && posts.map((item) => (
              <div className="post-item" key={item.id}>
                <PostTitle item={item} />
              </div>
            ))}
            {posts && posts.length > 0 && (
              <div className="user-footer">
                <ReactPaginate
                  nextLabel="next >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={9}
                  marginPagesDisplayed={4}
                  pageCount={numOfPage}
                  previousLabel="< previous"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakLabel="..."
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName="pagination"
                  activeClassName="active"
                  renderOnZeroPageCount={null}
                />
              </div>
            )}
          </div>

          <div className="listPostsNew">
            <h1 className="lsTitle">Hot News</h1>
            <div className="lsItem">
              <label> </label>
              <label>Adguard là một trình chặn quảng cáo mạnh mẽ có thể được sử dụng như một plugin trình duyệt Safari. Chỉ cần b</label>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Home
