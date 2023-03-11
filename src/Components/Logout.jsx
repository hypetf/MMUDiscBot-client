import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom';
import useUserStore from '../utils/userStore';
import { useEffect } from 'react';
import useSongsStore from '../utils/songsStore'


export default function Logout() {
    const navigate = useNavigate();
    const location = useLocation();
    const clearUser = useUserStore(state => state.clearUser);
    const clearSongs = useSongsStore(state => state.clearSongs);

    useEffect(() => {
        axios({
            method: 'GET',
            url: '/api/auth/logout'
        })
        .then(res => {
            if(res.status === 200) {
                clearUser();
                clearSongs();
                setTimeout(() => {
                    navigate(location.pathname, {}); 
                }, 500)
            }
        })
        .catch(err => {
            console.log(err);
        })
    })
}
