import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react'
import InfiniteScroll  from 'react-infinite-scroller'
import UserService from './services/UserService';

function App() {
  const [page, setPage] = useState(1);
  const [noData, setNoData] = useState(false);
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUserList(page);
  }, []);

  const loadUserList = (page) => {
    setLoading(true);
    UserService.getList(page)
      .then((res) => {
        const newPage = page + 1;
        const newList = userList.concat(res.data);

        setUserList(newList);
        setPage(newPage);

        if(res.data.length===0) {
          setNoData(true);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() =>{
        setLoading(false);
      })
  }

  window.onscroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      if(!noData) {
        loadUserList(page);
      }
    }
  }

  return (
    <div>
<h1>Infinite Scroll</h1>

{userList.map((user, i) => 
              ( 
              <div className="box m-3 user" key={i}>
                <img src={user.avatar} alt={user.first_name}/>
                <div className="user-details">
                  <strong>Email</strong>: {user.email}<br/> 
                  <strong>First Name</strong>: {user.first_name}<br/> 
                  <strong>Last Name</strong>: {user.last_name}<br/>
                </div>
              </div>
              )
            )}
        {loading ?  <div className="text-center">loading data ...</div> : "" }
        {noData ? <div className="text-center">no data anymore ...</div> : "" }
</div>
  );
}

export default App;
