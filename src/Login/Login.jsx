import React, { useState, useEffect } from "react";

const Login = ({ memberLogIn, signup }) => {
  const [view, setView] = useState("MEMBER_LOG_IN");
  const [members, setMembers] = useState([fetch("http://localhost:4050/Members")]);
  const [info, setInfo] = useState({ email: "", password: "" });

 

  useEffect(() => {
    setInfo({ email: "", password: "" });
    fetch("http://localhost:4050/Members").then((res) => res.json())
      .then(([member]) => {
        setMembers(member);
      })
      .catch(() => setView("Error"));
  }, [view]);

  const saveSignUP = (data) =>
    fetch("http://localhost:4050/Members", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(res => {
        setMembers((data) => data.concat([res]));
        console.log(res);
      });

      const onSave = (event) => {
        event.preventDefault();
    
        const id = event.target.id.value;
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        // const age = event.target.age.value;
        // const BornAt = event.target.BornAt.value;
        // const Birthdate = event.target.Birthdate.value;
        // const photo = event.target.photo.value; ,age,BornAt,Birthdate,photo
    
        const data = { id,name,email,password };
    
        saveSignUP(data).then(() => {
          setView("VIEW"); 
        });
      };

  return (
    <div className="Log-in">
      {view === "MEMBER_LOG_IN" ? (
        <div>
          <h3>Welcome to Broadcast APP</h3>
          <input
            type="text"
            value={info.email}
            onChange={(event) =>
              setInfo({ ...info, email: event.target.value })
            }
          />
          <input
            type="password"
            value={info.password}
            onChange={(event) =>
              setInfo({ ...info, password: event.target.value })
            }
          />
          <button onClick={() => memberLogIn(info)}>Log in</button>
          <span onClick={() => setView("SIGN_UP")}>Sign UP</span>
              <div className="bg">
                  
              </div>
        </div>
      ) : null}

      {view === "SIGN_UP" ? (
        <div>
          <h3>Sign UP</h3>
          <form onSubmit={onSave}>
            
            <div className = "form-group row" >
            <label for="name" className = "col-sm-2 col-form-label">Name</label>
            <div className = "col-sm-10">
            <input type="text" id="name" name="name" className="inputDisplay" />
            </div>
            </div>

            <br />
            
            <div className = "form-group row" >
            <label for="email" className = "col-sm-2 col-form-label">Email</label>
            <div className = "col-sm-10">
            <input type="text" id="email" name="email" className="inputDisplay" />
            </div>
            </div>
            
            <br />
            
            <div className = "form-group row" >
            <label for="password" className = "col-sm-2 col-form-label ">Password</label>
            <div className = "col-sm-10">
            <input type="password" id="password" name="password" className="inputDisplay"/>
            </div>
            </div>
            
            <br />
            
            <input type="submit" value="Submit" />
            
          </form>
          <span onClick={() => setView("MEMBER_LOG_IN")}>
            Go to login page
          </span>
        </div>
      ) : null}

{/* {view === "VIEW" && (
        <table>
         
          {members.map(({ id,name,email,password }) => (
            <tr key={id} style={{ border: "1px solid blacks" }}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{email}</td>
              <td>{password}</td>
            </tr>
          ))}
        </table>
      )} */}

{view === "LOG_OUT" && (
        <span onClick={() => setView( "MEMBER_LOG_IN")}>Logout</span>
      )}

    </div>
  );
};

export default Login;