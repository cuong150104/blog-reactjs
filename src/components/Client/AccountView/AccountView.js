import React, { useState, useEffect } from 'react';
import requestApi from '../../../helpers/api';
import * as actions from '../../../redux/actions';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './AccountView.css'
const AccountView = ({ followerId, followedId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [followedUserInfo, setFollowedUserInfo] = useState(null); // State to hold followed user's info
  const [totalPostbyUser, setTotalPostByUser] = useState(0);
  useEffect(() => {
    const fetchFollowedUserInfo = async () => {
      try {
        const response = await requestApi(`/users/${followedId}`, 'GET');
        const responseId = await requestApi(`/posts/post-by-user/${followedId}`, 'GET', []);
        console.log("user =>", responseId.data.data.length);
        console.log("user =>", responseId)
        setTotalPostByUser(responseId.data.data.length);
        setFollowedUserInfo(response.data);
      } catch (error) {
        console.error('Error fetching followed user info:', error);
      }
    };

    if (followedId) {
      fetchFollowedUserInfo();
    }
  }, [followedId]);

  useEffect(() => {
    const checkFollowStatus = async () => {
      try {
        console.log("check a ", followerId, followedId)
        const response = await requestApi(`/followers/${followerId}/${followedId}`, 'GET');
        setIsFollowing(response.data);
        console.log("check follower response", response.data);
        console.log("check follower", isFollowing);
      } catch (error) {
        console.error('Error checking follow status:', error);
      }
    };

    if (followerId && followedId) {
      checkFollowStatus();
      console.log("check follower goi", isFollowing);
    }
  }, [followerId, followedId, isFollowing]);

  const handleFollowToggle = async () => {
    dispatch(actions.controlLoading(true));

    try {
      let res;
      console.log("check a ", followerId, followedId)
      if (isFollowing) {
        res = await requestApi(`/followers/${followerId}/${followedId}`, 'DELETE');
        setIsFollowing(false)
      } else {
        const data = { followerId, followedId }; // Ensure the data is simple and non-circular
        res = await requestApi(`/followers/${followerId}/${followedId}`, 'POST', data);
        setIsFollowing(true)
      }

      toast.success(`${isFollowing ? 'Unfollow' : 'Follow'} successful`, { position: 'top-center', autoClose: 2000 });

      // Wait for toast to close before navigating
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Navigate to '/'
      // navigate('/');

    } catch (error) {
      console.error('Error toggling follow status:', error);
      toast.error('Failed to toggle follow status. Please try again later.', { position: 'top-center', autoClose: 2000 });
    } finally {
      dispatch(actions.controlLoading(false));
    }
  };


  return (
    

    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {followedUserInfo && (
        <div style={{ textAlign: 'center' }}>
          <img
            src={process.env.REACT_APP_API_URL + '/' + followedUserInfo.avatar}
            alt="Avatar"
            style={{ width: 50, height: 50, borderRadius: '50%' }}
          />
          <div>{followedUserInfo.first_name} {followedUserInfo.last_name}</div>
          <div className="user-info">
            <div>{followedUserInfo.email}</div>
            <div>Total posts: {totalPostbyUser}</div>
          </div>
        </div>
      )}
      {loading ? (
        <button disabled>Loading...</button>
      ) : (
        <button onClick={handleFollowToggle}>
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
      )}
    </div>
  );
};


export default AccountView

