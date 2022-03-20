import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Grid, Cell } from "baseui/layout-grid";
import { AppNavBar } from "baseui/app-nav-bar";
import { H1, H2 } from "baseui/typography";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button, KIND, SHAPE } from "baseui/button";
import { Notification } from "baseui/notification";
import { DatePicker } from "baseui/datepicker";
import { Select } from "baseui/select";
import { Search } from "baseui/icon";

import Toggle from "react-toggle";

import Create from "../components/create";
import Details from "../components/details";
import Edit from "../components/edit";
import TransactionHistory from "../components/transactionHistory";

function Home() {
  // navigate
  const navigate = useNavigate();

  var [lastname, setLastname] = React.useState("");
  var [firstname, setFirstname] = React.useState("");
  var [middlename, setMiddlename] = React.useState("");
  var [email, setEmail] = React.useState("");
  var [role, setRole] = React.useState("");
  var [birthdate, setBirthdate] = React.useState([new Date()]);

  var [users, setUsers] = React.useState([]);
  var [roles, setRoles] = React.useState([]);

  var [message, setMessage] = React.useState("");
  var [showMessage, setShowMessage] = React.useState(false);
  var [messageColor, setMessageColor] = React.useState(undefined);

  var [currentUser, setCurrentUser] = React.useState(undefined);
  var [currentSelectedSection, setCurrentSelectedSection] =
    React.useState("create");

  var [userStatus, setUserStatus] = React.useState(true);
  var [statusValue, setStatusValue] = React.useState(true);

  var [filterList, setFilterList] = React.useState(true);

  var [isLoading, setIsLoading] = React.useState(false);

  var [isUsersDataChange, setIsUsersDataChange] = React.useState(false);

  // protectRoute
  // Protecting the route from unathorized access
  // adding checkpoint in endpoint
  var protectRoute = process.env.REACT_APP_PROTECT_ROUTE;

  function handleClickName(userid) {
    for (var i = 0; i < users.length; i++) {
      if (users[i]["_id"] == userid) {
        setCurrentUser(users[i]);
        setCurrentSelectedSection("details");
        return;
      }
    }
  }

  function handleClickAddUser() {
    setCurrentSelectedSection("create");
    setLastname("");
    setFirstname("");
    setMiddlename("");
    setEmail("");
    setRole("");
    setBirthdate([new Date()]);
  }

  function handleClickEditUser() {
    // currentUser["userRole"] needs to be extracted
    var userRoleValue = undefined;
    for (var i = 0; i < roles.length; i++) {
      if (roles[i]["_id"] == currentUser["userRole"]) {
        userRoleValue = roles[i]["name"];
        break;
      }
    }

    setLastname(currentUser["lastname"]);
    setFirstname(currentUser["firstname"]);
    setMiddlename(currentUser["middlename"]);
    setEmail(currentUser["email"]);
    setRole([{ id: userRoleValue, color: userRoleValue }]);
    setBirthdate(new Date(currentUser["birthdate"]));

    setCurrentSelectedSection("edit");
  }

  function handleClickActiveButton() {
    setUserStatus(false);

    setMessage("Account inactive");
    setShowMessage(true);
    setMessageColor("#FA8072");

    // adding setTimeout
    // setTimeout is asynchronous
    setTimeout(function () {
      setShowMessage(false);
    }, 10000);
  }

  function handleExtractUserRole() {
    // this inline styling needs to be refactor
    // currentUser["userRole"] needs to be extracted
    var userRoleValue = undefined;
    for (var i = 0; i < roles.length; i++) {
      if (roles[i]["_id"] == currentUser["userRole"]) {
        return roles[i]["name"];
      }
    }
  }

  async function handleClickDeleteUser(email) {
    // communicate to backend for deleting user
    // original address => "/user/delete/:id"
    var send = await axios.get(
      `http://localhost:5000/${protectRoute}/user/delete/${email}`
    );

    if (send["data"] == "OK") {
      var getUsers = await axios.get(`http://localhost:5000/${protectRoute}/`);

      setUsers(getUsers["data"]["users"]);
      setRoles(getUsers["data"]["roles"]);

      setMessage("User deleted");
      setShowMessage(true);
      setMessageColor("#FA8072");

      var handleClickAddUserMate = handleClickAddUser;
      handleClickAddUserMate();

      // adding setTimeout
      // setTimeout is asynchronous
      setTimeout(function () {
        setShowMessage(false);
      }, 10000);
    }
  }

  function handleGetRole() {
    for (var i = 0; i < roles.length; i++) {
      if (roles[i]["_id"] == currentUser["userRole"]) {
        return roles[i]["name"];
      }
    }
  }

  function handleClickStatus() {
    setStatusValue(false);
    setMessage("Account inactive");
    setShowMessage(true);
    setMessageColor("#FA8072");

    // adding setTimeout
    // setTimeout is asynchronous
    setTimeout(function () {
      setShowMessage(false);
    }, 10000);
  }

  function handleFilterList() {
    (params) => setFilterList(params.value);
    console.log(filterList);
  }

  async function handleSubmitCreate(e) {
    e.preventDefault();

    var data = {
      lastname: lastname,
      firstname: firstname,
      middlename: middlename,
      email: email,
      userRole: role[0]["id"],
      birthdate: birthdate,
    };

    // set value
    setIsLoading(true);

    // reset value
    setIsUsersDataChange(false);

    // check if email is already taken
    for (var i = 0; i < users.length; i++) {
      if (email == users[i]["email"]) {
        setMessage("Email already taken");
        setShowMessage(true);
        setMessageColor("#FA8072");

        // adding setTimeout
        // setTimeout is asynchronous
        setTimeout(function () {
          setShowMessage(false);
        }, 10000);

        return;
      }
    }

    // communicate to backend for creating user
    // original address => "/user/create"
    var send = await axios.post(
      `http://localhost:5000/${protectRoute}/user/create`,
      data
    );

    if (send["data"] == "OK") {
      // new user now successfully
      // added to the database

      var getUsers = await axios.get(`http://localhost:5000/${protectRoute}/`);

      if (users.length == getUsers["data"]["users"]) {
        // something went wrong
        // send message new user added
        setMessage("Something went wrong");
        setShowMessage(true);
        setMessageColor("#FA8072");

        setIsLoading(false);

        // adding setTimeout
        // setTimeout is asynchronous
        setTimeout(function () {
          setShowMessage(false);
          window.location = "/";
        }, 10000);

        // terminate
        return;
      }

      setUsers(getUsers["data"]["users"]);
      setRoles(getUsers["data"]["roles"]);

      // send message new user added
      setMessage("User added");
      setShowMessage(true);
      setMessageColor("#8A9A5B");

      setIsLoading(false);

      // adding setTimeout
      // setTimeout is asynchronous
      setTimeout(function () {
        setShowMessage(false);
      }, 10000);

      // reset the state
      setLastname("");
      setFirstname("");
      setMiddlename("");
      setEmail("");
      setRole("");
      setBirthdate([new Date()]);
    }

    // end of handleSubmitCreate
  }

  async function handleSubmitEdit(e) {
    e.preventDefault();

    // set value
    setIsLoading(true);

    var data = {
      lastname: lastname,
      firstname: firstname,
      middlename: middlename,
      email: email,
      userRole: role[0]["id"],
      birthdate: birthdate,
    };

    data["originalUserRoleId"] = currentUser["userRole"];
    data["currentUserId"] = currentUser["_id"];

    // communicate to backend for updating user
    // original address => "/user/update"
    var send = await axios.post(
      `http://localhost:5000/${protectRoute}/user/update`,
      data
    );

    if (send["data"] == "OK") {
      var getUsers = await axios.get(`http://localhost:5000/${protectRoute}/`);

      setUsers(getUsers["data"]["users"]);
      setRoles(getUsers["data"]["roles"]);

      setMessage("User updated");
      setShowMessage(true);
      setMessageColor("#8A9A5B");

      setIsLoading(false);

      // adding setTimeout
      // setTimeout is asynchronous
      setTimeout(function () {
        setShowMessage(false);
      }, 10000);

      var handleClickAddUserMate = handleClickAddUser;
      handleClickAddUserMate();
    }

    // end of handleSubmitEdit
  }

  async function handleSubmit(e) {
    e.preventDefault();

    var data = {
      lastname: lastname,
      firstname: firstname,
      middlename: middlename,
      email: email,
      userRole: role[0]["id"],
      birthdate: birthdate,
    };

    // ============
    // EDIT SECTION
    // ============
    // this will be refactor to become cleaner code
    if (currentSelectedSection == "edit") {
      data["originalUserRoleId"] = currentUser["userRole"];
      data["currentUserId"] = currentUser["_id"];

      // communicate to backend for updating user
      // original address => "/user/update"
      var send = await axios.post(
        `http://localhost:5000/${protectRoute}/user/update`,
        data
      );

      setMessage("User updated");
      setShowMessage(true);
      setMessageColor("#8A9A5B");

      var handleClickAddUserMate = handleClickAddUser;
      // call
      handleClickAddUserMate();

      // adding setTimeout
      // setTimeout is asynchronous
      setTimeout(function () {
        setShowMessage(false);
      }, 10000);

      return;
    }

    // check if email is already taken
    for (var i = 0; i < users.length; i++) {
      if (email == users[i]["email"]) {
        setMessage("Email already taken");
        setShowMessage(true);
        setMessageColor("#FA8072");

        // adding setTimeout
        // setTimeout is asynchronous
        setTimeout(function () {
          setShowMessage(false);
        }, 10000);

        return;
      }
    }

    // communicate to backend for creating user
    // original address => "/user/create"
    var send = await axios.post(
      `http://localhost:5000/${protectRoute}/user/create`,
      data
    );

    setMessage("User added");
    setShowMessage(true);
    setMessageColor("#8A9A5B");

    // adding setTimeout
    // setTimeout is asynchronous
    setTimeout(function () {
      setShowMessage(false);
    }, 10000);

    setLastname("");
    setFirstname("");
    setMiddlename("");
    setEmail("");
    setRole("");
    setBirthdate([new Date()]);
  }

  // this useEffect will only run, once
  React.useEffect(async function () {
    // communicate to backend and get all users
    // original address => "/"
    var getUsers = await axios.get(`http://localhost:5000/${protectRoute}/`);

    setUsers(getUsers["data"]["users"]);
    setRoles(getUsers["data"]["roles"]);
  }, []);

  console.log("Page render count: " + Math.random());

  return (
    <>
      {showMessage && (
        <div
          style={{
            position: "fixed",
            left: "50%",
            transform: "translateX(-50%)",

            paddingTop: ".5rem",
            paddingBottom: ".5rem",
            paddingLeft: "1.2rem",
            paddingRight: "1.2rem",
            fontFamily: "Montserrat",
            backgroundColor: messageColor,
          }}
        >
          {message}
        </div>
      )}
      <Grid>
        <Cell span={4}>
          <div
            style={{
              borderRight: "3px solid lightgray",
              height: "100vh",
              paddingRight: "1rem",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "2.5rem",
                  fontWeight: "900",
                }}
              >
                Users
              </p>
              <span
                style={{
                  alignSelf: "center",
                  color: "gray",
                  fontSize: "2.5rem",
                }}
                onClick={handleClickAddUser}
              >
                <i className="bi bi-plus-circle-dotted"></i>
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
            >
              <p
                style={{
                  fontFamily: "Montserrat",
                  display: "inline-block",
                }}
              >
                Filter by Role
              </p>

              <Select
                overrides={{
                  Root: { style: { width: "10rem", display: "inline-block" } },
                }}
                searchable={false}
                options={[
                  { id: "ALL", color: "ALL" },
                  { id: "STUDENT", color: "STUDENT" },
                  { id: "TEACHER", color: "TEACHER" },
                  { id: "ADMINISTRATOR", color: "ADMINISTRATOR" },
                ]}
                labelKey="id"
                valueKey="color"
                value={filterList}
                onChange={handleFilterList}
              />
            </div>

            <div>
              <Input
                startEnhancer={<Search size="1.2rem" />}
                placeholder="Name"
              />
            </div>

            <div
              style={{
                marginTop: "1rem",
                border: "2px solid gray",
                borderRadius: "5px",
                height: "30rem",
                padding: "1rem",
                overflowY: "scroll",
              }}
            >
              {users.map((u) => (
                <p
                  style={{ fontFamily: "Montserrat" }}
                  key={u["_id"]}
                  onClick={function () {
                    handleClickName(u["_id"]);
                  }}
                >
                  {u["lastname"]}, {u["firstname"]}
                </p>
              ))}
            </div>
          </div>
        </Cell>

        {/* create element */}
        {currentSelectedSection == "create" && (
          <Cell span={5}>
            <Create
              handleSubmitCreateComponent={handleSubmitCreate}
              valueLastname={lastname}
              onChangeLastname={(e) => setLastname(e.currentTarget.value)}
              valueFirstname={firstname}
              onChangeFirstname={(e) => setFirstname(e.currentTarget.value)}
              valueMiddlename={middlename}
              onChangeMiddlename={(e) => setMiddlename(e.currentTarget.value)}
              valueBirthdate={birthdate}
              onChangeBirthdate={({ date }) =>
                setBirthdate(Array.isArray(date) ? date : [date])
              }
              valueEmail={email}
              onChangeEmail={(e) => setEmail(e.currentTarget.value)}
              valueRole={role}
              onChangeRole={(params) => setRole(params.value)}
              loading={isLoading}
            />
          </Cell>
        )}

        {/* details element */}
        {currentSelectedSection == "details" && (
          <Cell span={5}>
            <Details
              lastname={currentUser["lastname"]}
              firstname={currentUser["firstname"]}
              middlename={currentUser["middlename"]}
              birthdate={currentUser["birthdate"].toString().slice(0, 10)}
              email={currentUser["email"]}
              role={handleGetRole()}
              handleClickStatusButton={handleClickStatus}
              status={statusValue}
              handleClickEdit={handleClickEditUser}
              handleClickDelete={function () {
                handleClickDeleteUser(currentUser["email"]);
              }}
            />
          </Cell>
        )}

        {/* edit element */}
        {currentSelectedSection == "edit" && (
          <Cell span={5}>
            <Edit
              handleSubmitEditComponent={handleSubmitEdit}
              valueLastname={lastname}
              onChangeLastname={(e) => setLastname(e.currentTarget.value)}
              valueFirstname={firstname}
              onChangeFirstname={(e) => setFirstname(e.currentTarget.value)}
              valueMiddlename={middlename}
              onChangeMiddlename={(e) => setMiddlename(e.currentTarget.value)}
              valueBirthdate={birthdate}
              onChangeBirthdate={({ date }) =>
                setBirthdate(Array.isArray(date) ? date : [date])
              }
              valueEmail={email}
              onChangeEmail={(e) => setEmail(e.currentTarget.value)}
              valueRole={role}
              onChangeRole={(params) => setRole(params.value)}
              loading={isLoading}
            />
          </Cell>
        )}

        <Cell span={3}>
          <TransactionHistory />
        </Cell>
      </Grid>
    </>
  );
}

export default Home;
