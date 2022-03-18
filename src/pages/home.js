import * as React from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Grid, Cell} from "baseui/layout-grid";
import {AppNavBar} from "baseui/app-nav-bar";
import {H1, H2} from "baseui/typography";
import {FormControl} from "baseui/form-control";
import {Input} from "baseui/input";
import {Button, KIND, SHAPE} from "baseui/button";
import {Notification} from "baseui/notification";
import {DatePicker} from "baseui/datepicker";
import {Select} from "baseui/select";
import {Search} from "baseui/icon";

import Toggle from "react-toggle";

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
    var [currentSelectedSection, setCurrentSelectedSection] = React.useState("create");

    var [userStatus, setUserStatus] = React.useState(true);

    var [newUser, setNewUser] = React.useState(false);

    // protectRoute
    // Protecting the route from unathorized access
    // adding checkpoint in endpoint
    var protectRoute = process.env.REACT_APP_PROTECT_ROUTE;

    function handleClickName(userid) {
        for (var i = 0; i < users.length; i++) {
            if (users[i]["_id"] == userid) {
                setCurrentUser(users[i])
                setCurrentSelectedSection("details")
                return
            }
        }

    }

    function handleClickAddUser() {
        setCurrentSelectedSection("create")
        setLastname("");
        setFirstname("");
        setMiddlename("");
        setEmail("");
        setRole("");
        setBirthdate([new Date()]);
    }

    function handleClickEdit() {

        // currentUser["userRole"] needs to be extracted
        var userRoleValue = undefined
        for (var i = 0; i < roles.length; i++) {
            if (roles[i]["_id"] == currentUser["userRole"]) {
                userRoleValue = roles[i]["name"]
                break
            }
        }

        setLastname(currentUser["lastname"]);
        setFirstname(currentUser["firstname"]);
        setMiddlename(currentUser["middlename"]);
        setEmail(currentUser["email"]);
        setRole([{id: userRoleValue, color: userRoleValue}]);
        setBirthdate(new Date(currentUser["birthdate"]));

        setCurrentSelectedSection("edit")
    }

    function handleClickActiveButton() {
        setUserStatus(false)

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
        var userRoleValue = undefined
        for (var i = 0; i < roles.length; i++) {
            if (roles[i]["_id"] == currentUser["userRole"]) {
                return roles[i]["name"]
            }
        }
    }

    async function handleClickDelete(email) {
        // communicate to backend for deleting user
        // original address => "/user/delete/:id"
        var send = await axios.get(
            `http://localhost:5000/${protectRoute}/user/delete/${email}`
        );

        // newUser is a helper
        // newUser will be refactor soon
        setNewUser(true)

        // adding setTimeout
        // setTimeout is asynchronous
        setTimeout(function () {
            setNewUser(false);
        }, 5000);

        setMessage("User deleted");
        setShowMessage(true);
        setMessageColor("#FA8072");

        var handleClickAddUserMate = handleClickAddUser
        // call
        handleClickAddUserMate()

        // adding setTimeout
        // setTimeout is asynchronous
        setTimeout(function () {
            setShowMessage(false);
        }, 10000);
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
            data["originalUserRoleId"] = currentUser["userRole"]
            data["currentUserId"] = currentUser["_id"]

            // communicate to backend for updating user
            // original address => "/user/update"
            var send = await axios.post(
                `http://localhost:5000/${protectRoute}/user/update`,
                data
            );

            // newUser is a helper
            // newUser will be refactor soon
            setNewUser(true)

            // adding setTimeout
            // setTimeout is asynchronous
            setTimeout(function () {
                setNewUser(false);
            }, 5000);

            setMessage("User updated");
            setShowMessage(true);
            setMessageColor("#8A9A5B");

            var handleClickAddUserMate = handleClickAddUser
            // call
            handleClickAddUserMate()

            // adding setTimeout
            // setTimeout is asynchronous
            setTimeout(function () {
                setShowMessage(false);
            }, 10000);

            return
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

        // newUser is a helper
        // newUser will be refactor soon
        setNewUser(true)
        // adding setTimeout
        // setTimeout is asynchronous
        setTimeout(function () {
            setNewUser(false);
        }, 5000);

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

    React.useEffect(async function () {

        // communicate to backend and get all users
        // original address => "/"
        var getUsers = await axios.get(`http://localhost:5000/${protectRoute}/`);
        setUsers(getUsers["data"]["users"]);
        setRoles(getUsers["data"]["roles"])
    }, []);

    React.useEffect(async function () {

        // conditional checking
        if (newUser == false) {
            return
        }

        // communicate to backend and get all users
        // original address => "/"
        var getUsers = await axios.get(`http://localhost:5000/${protectRoute}/`);
        setUsers(getUsers["data"]["users"]);
        setRoles(getUsers["data"]["roles"])
    }, [newUser]);

    console.log("Element render count: " + Math.random())

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
                        <div style={{display: "flex", justifyContent: "space-between"}}>
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
                                    Root: {style: {width: "10rem", display: "inline-block"}},
                                }}
                                searchable={false}
                                options={[
                                    {id: "AliceBlue", color: "#F0F8FF"},
                                    {id: "AntiqueWhite", color: "#FAEBD7"},
                                    {id: "Aqua", color: "#00FFFF"},
                                    {id: "Aquamarine", color: "#7FFFD4"},
                                    {id: "Azure", color: "#F0FFFF"},
                                    {id: "Beige", color: "#F5F5DC"},
                                ]}
                                labelKey="id"
                                valueKey="color"
                            />
                        </div>

                        <div>
                            <Input
                                startEnhancer={<Search size="1.2rem"/>}
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
                                overflowY: "scroll"
                            }}
                        >
                            {users.map((u) => (
                                <p style={{fontFamily: "Montserrat"}} onClick={function () {
                                    handleClickName(u["_id"])
                                }
                                }>
                                    {u["lastname"]}, {u["firstname"]}
                                </p>
                            ))}
                        </div>
                    </div>
                </Cell>

                {/* create element */}
                {currentSelectedSection == "create" &&
                    <Cell span={5}>
                        <div
                            style={{
                                borderRight: "3px solid lightgray",
                                height: "100vh",
                                paddingRight: "1rem",
                            }}
                        >
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                <p
                                    style={{
                                        fontFamily: "Montserrat",
                                        fontSize: "2.5rem",
                                        fontWeight: "900",
                                    }}
                                >
                                    Create
                                </p>
                                {false && (
                                    <span
                                        style={{
                                            alignSelf: "center",
                                            color: "gray",
                                            fontSize: "2rem",
                                        }}
                                    >
                  <i className="bi bi-pen"></i>
                  <i className="bi bi-trash"></i>
                </span>
                                )}
                            </div>

                            <form onSubmit={handleSubmit}>
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
                                        Last Name
                                    </p>
                                    <Input
                                        overrides={{
                                            Root: {
                                                style: {width: "20rem", display: "inline-block"},
                                            },
                                        }}
                                        value={lastname}
                                        onChange={(e) => setLastname(e.target.value)}
                                    />
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
                                        First Name
                                    </p>
                                    <Input
                                        overrides={{
                                            Root: {
                                                style: {width: "20rem", display: "inline-block"},
                                            },
                                        }}
                                        value={firstname}
                                        onChange={(e) => setFirstname(e.target.value)}
                                    />
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
                                        Middle Name
                                    </p>
                                    <Input
                                        overrides={{
                                            Root: {
                                                style: {width: "20rem", display: "inline-block"},
                                            },
                                        }}
                                        value={middlename}
                                        onChange={(e) => setMiddlename(e.target.value)}
                                    />
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
                                        Wallet Address
                                    </p>
                                    <Input
                                        placeholder="Optional"
                                        overrides={{
                                            Root: {
                                                style: {width: "20rem", display: "inline-block"},
                                            },
                                        }}
                                    />
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
                                        Birthday
                                    </p>
                                    <DatePicker
                                        overrides={{
                                            InputWrapper: {
                                                style: {width: "20rem", display: "inline-block"},
                                            },
                                        }}
                                        value={birthdate}
                                        onChange={({date}) =>
                                            setBirthdate(Array.isArray(date) ? date : [date])
                                        }
                                    />
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
                                        Email
                                    </p>
                                    <Input
                                        overrides={{
                                            Root: {
                                                style: {width: "20rem", display: "inline-block"},
                                            },
                                        }}
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
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
                                        Role
                                    </p>

                                    <Select
                                        overrides={{
                                            Root: {
                                                style: {width: "20rem", display: "inline-block"},
                                            },
                                        }}
                                        searchable={false}
                                        options={[
                                            {id: "STUDENT", color: "student"},
                                            {id: "TEACHER", color: "teacher"},
                                            {id: "ADMINISTRATOR", color: "administrator"},
                                        ]}
                                        labelKey="id"
                                        valueKey="color"
                                        value={role}
                                        placeholder="Select role"
                                        onChange={(params) => setRole(params.value)}
                                    />
                                </div>

                                <div>
                                    <Button type="submit" shape={SHAPE.pill}>
                                        Submit
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </Cell>
                }


                {/* details element */}
                {currentSelectedSection == "details" &&
                    <Cell span={5}>
                        <div
                            style={{
                                borderRight: "3px solid lightgray",
                                height: "100vh",
                                paddingRight: "1rem",
                            }}
                        >
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                <p
                                    style={{
                                        fontFamily: "Montserrat",
                                        fontSize: "2.5rem",
                                        fontWeight: "900",
                                    }}
                                >
                                    Details
                                </p>

                                <span
                                    style={{
                                        alignSelf: "center",
                                        color: "lightgray",
                                        fontSize: "2rem",
                                    }}
                                >
                  <i className="bi bi-pen" onClick={handleClickEdit}></i>
                  <i className="bi bi-trash" onClick={function () {
                      handleClickDelete(currentUser["email"])
                  }}></i>
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
                                    Last Name:
                                </p>
                                <p
                                    style={{
                                        fontFamily: "Montserrat",
                                        width: "20rem"
                                    }}
                                >
                                    {currentUser["lastname"]}
                                </p>
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
                                    First Name:
                                </p>
                                <p
                                    style={{
                                        fontFamily: "Montserrat",
                                        width: "20rem"
                                    }}
                                >
                                    {currentUser["firstname"]}
                                </p>
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
                                    Middle Name:
                                </p>
                                <p
                                    style={{
                                        fontFamily: "Montserrat",
                                        width: "20rem"
                                    }}
                                >
                                    {currentUser["middlename"]}
                                </p>
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
                                    Wallet Address:
                                </p>
                                <p
                                    style={{
                                        fontFamily: "Montserrat",
                                        width: "20rem"
                                    }}
                                >
                                    Wallet Address
                                </p>
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
                                    Birthday:
                                </p>
                                <p
                                    style={{
                                        fontFamily: "Montserrat",
                                        width: "20rem"
                                    }}
                                >
                                    {currentUser["birthdate"]}
                                </p>
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
                                    Email:
                                </p>
                                <p
                                    style={{
                                        fontFamily: "Montserrat",
                                        width: "20rem"
                                    }}
                                >
                                    {currentUser["email"]}
                                </p>
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
                                    Role:
                                </p>
                                <p
                                    style={{
                                        fontFamily: "Montserrat",
                                        width: "20rem"
                                    }}
                                >
                                    {handleExtractUserRole()}
                                </p>
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
                                    Active
                                </p>
                                <div style={{display: "inline", width: "20rem"}}>
                                    <p onClick={handleClickActiveButton}>
                                        <Toggle checked={userStatus} icons={false}/>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Cell>
                }

                {/* edit element */}
                {currentSelectedSection == "edit" &&
                    <Cell span={5}>
                        <div
                            style={{
                                borderRight: "3px solid lightgray",
                                height: "100vh",
                                paddingRight: "1rem",
                            }}
                        >
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                <p
                                    style={{
                                        fontFamily: "Montserrat",
                                        fontSize: "2.5rem",
                                        fontWeight: "900",
                                    }}
                                >
                                    Edit
                                </p>
                                {false && (
                                    <span
                                        style={{
                                            alignSelf: "center",
                                            color: "gray",
                                            fontSize: "2rem",
                                        }}
                                    >
                  <i className="bi bi-pen"></i>
                  <i className="bi bi-trash"></i>
                </span>
                                )}
                            </div>

                            <form onSubmit={handleSubmit}>
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
                                        Last Name
                                    </p>
                                    <Input
                                        overrides={{
                                            Root: {
                                                style: {width: "20rem", display: "inline-block"},
                                            },
                                        }}
                                        value={lastname}
                                        onChange={(e) => setLastname(e.target.value)}
                                    />
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
                                        First Name
                                    </p>
                                    <Input
                                        overrides={{
                                            Root: {
                                                style: {width: "20rem", display: "inline-block"},
                                            },
                                        }}
                                        value={firstname}
                                        onChange={(e) => setFirstname(e.target.value)}
                                    />
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
                                        Middle Name
                                    </p>
                                    <Input
                                        overrides={{
                                            Root: {
                                                style: {width: "20rem", display: "inline-block"},
                                            },
                                        }}
                                        value={middlename}
                                        onChange={(e) => setMiddlename(e.target.value)}
                                    />
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
                                        Wallet Address
                                    </p>
                                    <Input
                                        placeholder="Optional"
                                        overrides={{
                                            Root: {
                                                style: {width: "20rem", display: "inline-block"},
                                            },
                                        }}
                                    />
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
                                        Birthday
                                    </p>
                                    <DatePicker
                                        overrides={{
                                            InputWrapper: {
                                                style: {width: "20rem", display: "inline-block"},
                                            },
                                        }}
                                        value={birthdate}
                                        onChange={({date}) =>
                                            setBirthdate(Array.isArray(date) ? date : [date])
                                        }
                                    />
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
                                        Email
                                    </p>
                                    <Input
                                        overrides={{
                                            Root: {
                                                style: {width: "20rem", display: "inline-block"},
                                            },
                                        }}
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
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
                                        Role
                                    </p>

                                    <Select
                                        overrides={{
                                            Root: {
                                                style: {width: "20rem", display: "inline-block"},
                                            },
                                        }}
                                        searchable={false}
                                        options={[
                                            {id: "STUDENT", color: "student"},
                                            {id: "TEACHER", color: "teacher"},
                                            {id: "ADMINISTRATOR", color: "administrator"},
                                        ]}
                                        labelKey="id"
                                        valueKey="color"
                                        value={role}
                                        placeholder="Select role"
                                        onChange={(params) => setRole(params.value)}
                                    />
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
                                        Active
                                    </p>
                                    <div style={{display: "inline", width: "20rem"}}>
                                        <p>
                                            <Toggle icons={false}/>
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <Button type="submit" shape={SHAPE.pill}>
                                        Update
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </Cell>
                }

                <Cell span={3}>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <p
                            style={{
                                fontFamily: "Montserrat",
                                fontSize: "1.5rem",
                                fontWeight: "900",
                                marginTop: "3.5rem",
                            }}
                        >
                            Transaction History
                        </p>
                    </div>

                    <div
                        style={{
                            marginTop: "1rem",
                            border: "2px solid gray",
                            borderRadius: "5px",
                            padding: "1rem",
                            fontFamily: "Montserrat",
                        }}
                    >
                        Transaction data will be here...
                    </div>
                </Cell>
            </Grid>
        </>
    );
}

export default Home;
