import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "./App.css";

function App() {
  const navigate = useNavigate();

  // States for storing values which need to be send to backend

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [imageURL, setURL] = useState("");
  const [dob, setDOB] = useState("1999-04-18");
  const [hobbies, setHobbies] = useState("Java Learning");
  const [empType, setEmpType] = useState("WFH");
  const [userList, setUserList] = useState([]);
  const [newName, setNewName] = useState("");

  // using this to load users on page load
  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setUserList(response.data);
    });
  }, []);

  //functions---------------
  const addToList = () => {
    Axios.post("http://localhost:3001/insert", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      imgURL: imageURL,
      Etype: empType,
      dob: dob,
      hobbies: hobbies,
    });
  };

  const updateValue = (id) => {
    Axios.put("http://localhost:3001/update", { id: id, newName: newName });
    window.location.reload();
  };
  const deleteValue = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`);
    window.location.reload();
  };

  //
  return (
    <>
      {/* form data  */}
      <div className="App">
        <form>
          <h1>Crud App with MERN</h1>
          <div className="left">
            <label>FirstName : </label>
            <input
              type="text"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              required
            />
            <label>LastName : </label>
            <input
              type="text"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              required
            />
            <label>Email : </label>
            <input
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <label>ImageURL : </label>
            <input
              type="text"
              onChange={(e) => {
                setURL(e.target.value);
              }}
              required
            />
          </div>
          <div className="right">
            <label>DOB : </label>
            <input
              type="date"
              onChange={(e) => {
                setDOB(e.target.value);
              }}
              required
            ></input>
            <label>Hobbies : </label>
            <select
              onChange={(e) => {
                setHobbies(e.target.value);
              }}
              required
            >
              <option value="Java Learning">Java Learning</option>
              <option value="cakePHP Learning">cakePHP Learning</option>
              <option value="Angular - Node">Angular - Node</option>
            </select>
            <label>Employee Type : </label>
            <input
              type="radio"
              value="WFH"
              name="gender"
              onChange={(e) => {
                setEmpType(e.target.value);
              }}
              required
            />
            WFH
            <input
              type="radio"
              value="Office"
              name="gender"
              onChange={(e) => {
                setEmpType(e.target.value);
              }}
              required
            />{" "}
            From Office
            {/* /form data  */}
          </div>

          <button onClick={addToList}>Add to List</button>
        </form>
        <div className="userList">
          {/* listing with HOC */}
          <h2>Users List</h2> <h4>Only displaying Names & Emails</h4>
          {/* you can get other data by styling everything.*/}
          {userList.map((val, key) => {
            return (
              <div key={key} className="users">
                <h2>{val.firstName}</h2>
                <h3>{val.email}</h3>
                <input
                  type="text"
                  placeholder="New Name..."
                  onChange={(e) => {
                    setNewName(e.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateValue(val._id);
                  }}
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    if (window.confirm("Do you really want to delete this record?")) {
                      alert("Data Deleted Successfully!");
                      deleteValue(val._id);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            );
            {
              /* /listing with HOC */
            }
          })}
        </div>
      </div>
    </>
  );
}

export default App;
