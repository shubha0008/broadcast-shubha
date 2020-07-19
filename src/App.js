import React, { useEffect, useState,useReducer } from 'react'
import './App.css'
import Login from './Login/Login'
import { StreamApp, NotificationDropdown, FlatFeed, LikeButton, Activity, CommentField, CommentList } from 'react-activity-feed';
import 'react-activity-feed/dist/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logout from './Login/Logout';

function App() {
	const [loggedIn, setLoggedIn] = useState(false)
	const [signUP, signUPPortal] = useState(false)
	const [currentUser, setCurrentUser] = useState('')

	useEffect(() => {
		fetch("http://localhost:4050/Members")
		.then((res) => res.json())
		.then(member => {
		 const userId = localStorage.getItem('user_id')
		if (userId) {
			setLoggedIn(true)
			let val = member.find((data) => data.id === userId)
			setCurrentUser(val.name)
		}},[])
})
	const memberLogIn = ({ email, password }) => {
		fetch("http://localhost:4050/Members")
		 .then((res) => res.json())
		.then(member => {
		const validLogIn = member.find((mem) => mem.email === email && mem.password === password)
		if (validLogIn === undefined) {
			alert('Invalid Email and Password')
		} else {
			localStorage.setItem('user_id', validLogIn.id)
			signUPPortal(false)
			setLoggedIn(true)
		}})
	}

	

	return (
		<div className="App">
			{loggedIn === true ? (
			<div>
				<div><h1>Welcome {currentUser}</h1></div>
			<div>
	 		<StreamApp
        apiKey="du8he7epvp94"
        appId="45206"
        token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMjRlMTU2YTEtNzM4My00NmQ0LWFhMzgtZGQ5Nzc2ZDA5MzY2In0.NC0nR8jLUb8ebk7F2RRs4Z9XRKozlFs268vZ4LpXZdU"
          >
        <NotificationDropdown notify />
        <FlatFeed
          options={{reactions: { recent: true } }}
          notify
          Activity={(props) =>
              <Activity {...props}
                Footer={() => (
                  <div style={ {padding: '8px 16px'} }>
                    <LikeButton {...props} />
                    <CommentField
                      activity={props.activity}
                      onAddReaction={props.onAddReaction} />
                    <CommentList activityId={props.activity.id} />
                  </div>
                )}
              />
            }
          />
      </StreamApp>
	  </div>
	  <button onClick =  {() => {return(<Logout/>)}}>Logout</button>
	  </div>
			) : <Login memberLogIn={memberLogIn} />}
			{signUPPortal === false ? (null) : (<h1>Welcome New User</h1>)}
		</div>
	)
}
export default App
