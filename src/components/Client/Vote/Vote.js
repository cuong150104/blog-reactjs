import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Vote.css';
import requestApi from '../../../helpers/api';
const Vote = (idd) => {
    const [votes, setVotes] = useState(0);
    const id = idd.id;
    let idAccount = localStorage.getItem('id') || false;
    const [dataVotesUp, setDataVotes] = useState({ post: id, user: idAccount, value: 1 });
    const [dataVotesDown, setDataVotesDown] = useState({ post: id, user: idAccount, value: -1 });
    const [refresh, setRefresh] = useState(Date.now())
    useEffect(() => {
        const render = async () => {
            try {
                console.log('res votes => ', id);
                const response = await requestApi(`/votes/${id}`, 'GET');
                if (response) {
                    setVotes(response.data);
                    console.log('res votes =================> ', response);
                } else {
                    setVotes(0);
                }
            } catch (error) {
                console.log('errors=> ', error);
            }
        }
        render();

    }, [refresh]);

    const voteUp = async () => {
        try {
            const res = await requestApi(`/votes`, 'POST', dataVotesUp);
            setRefresh(Date.now())
            console.log('res comment vote-up ', res);
            setVotes(res.data.votes);
        } catch (error) {
            console.log('errors=> ', error);
        }
    };

    const voteDown = async () => {
        try {
            console.log('res comment vote-up ', id);
            console.log('res comment vote-up ', idAccount);
            console.log('res comment vote-up ', dataVotesDown);
            console.log('res comment vote-up ', dataVotesDown);
            const response = await requestApi(`/votes`, 'POST', dataVotesDown);
            setRefresh(Date.now())
            console.log('res comment vote-up ', response);
            setVotes(response.data.votes);
        } catch (error) {
            console.log('errors=> ', error);
        }
    };

    return (
        <div className="App">
            <button className="vote-button" onClick={voteUp}>▲</button>
            <div className="vote-count">
                {votes > 0 ? `+${votes}` : votes}
            </div>
            <button className="vote-button" onClick={voteDown}>▼</button>
        </div>
    );
};

export default Vote;
