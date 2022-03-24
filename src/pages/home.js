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

import {ethers} from "ethers";

import Toggle from "react-toggle";

import Darkmode from "../components/darkmode";

import Notif from "../components/notif";
import SearchElement from "../components/searchElement"
import Create from "../components/create";
import Details from "../components/details";
import Edit from "../components/edit";
import TransactionHistory from "../components/transactionHistory";
import FilterByRole from "../components/filterByRole";

function Home() {
    // navigate
    const navigate = useNavigate();

    var [lastname, setLastname] = React.useState("");
    var [firstname, setFirstname] = React.useState("");
    var [middlename, setMiddlename] = React.useState("");
    var [walletAddress, setWalletAddress] = React.useState("");
    var [email, setEmail] = React.useState("");
    var [role, setRole] = React.useState("");
    var [birthdate, setBirthdate] = React.useState([new Date()]);

    // ethereum data
    var [ethData, setEthData] = React.useState([]);

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

    var [filterListValue, setFilterListValue] = React.useState("");
    var [usersDataCopyForFilter, setUsersDataCopyForFilter] = React.useState([]);

    var [isLoading, setIsLoading] = React.useState(false);

    var [isUsersDataChange, setIsUsersDataChange] = React.useState(false);

    var [query, setQuery] = React.useState("");
    var [currentHoverUser, setCurrentHoverUser] = React.useState("");

    var [currentMode, setCurrentMode] = React.useState("light")

    // BLOCKCHAIN (crypto-eth)
    var [ethAddress, setEthAddress] = React.useState("")

    // protectRoute
    // Protecting the route from unathorized access
    // adding checkpoint in endpoint
    var protectRoute = process.env.REACT_APP_PROTECT_ROUTE;
    var etherscanKey = process.env.REACT_APP_ETHERSCAN_KEY;

    function handleClickDarkmode() {
        if (currentMode == "light") {
            // Update Css variables
            var nid = document.querySelector(":root");
            nid.style.setProperty("--backgroundColor", "#1F2023");
            nid.style.setProperty("--color", "#EFEFEF");
            setCurrentMode("black")
            return
        } else {
            // Update Css variables
            var nid = document.querySelector(":root");
            nid.style.setProperty("--backgroundColor", "#FAFAFA");
            nid.style.setProperty("--color", "#1F2023");
            setCurrentMode("light")
            return
        }
    }

    function handleClickCopyWalletAddress() {
        navigator.clipboard.writeText(ethAddress)
    }

    async function handleClickName(userid) {
        for (var i = 0; i < users.length; i++) {
            if (users[i]["_id"] == userid) {
                setCurrentUser(users[i]);
                setCurrentSelectedSection("details");
                return;
            }
        }
    }

    async function handleClickAddUser() {
        setCurrentSelectedSection("create");
        setLastname("");
        setFirstname("");
        setMiddlename("");
        setEmail("");
        setRole("");
        setBirthdate([new Date()]);

        setCurrentUser(undefined)
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
        setRole([{id: userRoleValue, color: userRoleValue}]);
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

    function handleChangeQuery(e) {
        setQuery(e.currentTarget.value)

        // I am getting data from usersDataCopyForFilter
        setUsers([...usersDataCopyForFilter])
    }

    function handleSubmitQuery(e) {
        e.preventDefault();

        for (var i = 0; i < users.length; i++) {
            if (users[i]["lastname"].toLowerCase().includes(query.toLowerCase())) {
                return setUsers([users[i]])
            }
            if (users[i]["firstname"].toLowerCase().includes(query.toLowerCase())) {
                return setUsers([users[i]])
            }
        }
        setUsers([])
    }

    function handleMouseEnter(id) {
        setCurrentHoverUser(id)
    }

    function handleMouseLeave() {
        setCurrentHoverUser("")
    }

    async function handleSubmitCreate(e) {
        e.preventDefault();

        var data = {
            lastname: lastname,
            firstname: firstname,
            middlename: middlename,
            walletAddress: walletAddress,
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
            setWalletAddress("");
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

    // BLOCKCHAIN (crypto)
    React.useEffect(async function () {

        if (currentUser == undefined) {
            return
        }

        // // Blockchain (crypto)
        // // template
        // const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        // await provider.send("eth_requestAccounts", []);
        // const signer = provider.getSigner();
        // // end, template

        //
        // const address = await provider.listAccounts();
        // setEthAddress(address[0])

        // etherscan must be replaced by ethers JS
        // get ethereum data
        var getEth = await axios.get(`https://api-kovan.etherscan.io/api?module=account&action=txlist&address=${currentUser["walletAddress"]}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${etherscanKey}`)

        setEthData(getEth["data"]["result"])
    }, [currentUser])

    React.useEffect(async function () {
        // BLOCKCHAIN (crypto)
        // MetaMask (crypto dashboard/app)
        // Ether JS(crypto library)
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        // Prompt user for account connections
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();

        // get wallet address
        var address = await signer.getAddress()
        // ethAddress can be found on state
        if (ethAddress !== address) {
            setEthAddress(address)
            setWalletAddress(address)
        }
    })

    // filter useEffect
    React.useEffect(async function () {
        if (filterListValue.length !== 0) {

            var ids = []
            for (var i = 0; i < roles.length; i++) {
                if (roles[i]["name"] == filterListValue[0]["id"]) {
                    ids.push(roles[i]["_id"])
                }
            }

            var newUsersData = []
            for (var i = 0; i < ids.length; i++) {
                for (var j = 0; j < usersDataCopyForFilter.length; j++) {
                    if (ids[i] == usersDataCopyForFilter[j]["userRole"]) {
                        newUsersData.push(usersDataCopyForFilter[j])
                    }
                }
            }

            // users data
            setUsers(newUsersData)
        }
    }, [filterListValue]);

    React.useEffect(async function () {
        // original data of users
        // can be found on usersDataCopyForFilter
        // add data to usersDataCopyForFilter

        // communicate to backend and get all users
        // original address => "/"
        var getUsers = await axios.get(`http://localhost:5000/${protectRoute}/`);

        setUsersDataCopyForFilter(getUsers["data"]["users"])
    }, [users]);

    // this useEffect will only run, once
    React.useEffect(async function () {
        // communicate to backend and get all users
        // original address => "/"
        var getUsers = await axios.get(`http://localhost:5000/${protectRoute}/`);

        setUsers(getUsers["data"]["users"]);
        setRoles(getUsers["data"]["roles"]);

        // BLOCKCHAIN (crypto)
        // MetaMask (crypto dashboard/app)
        // Ether JS(crypto library)
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        // Prompt user for account connections
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();

        // get wallet address
        var address = await signer.getAddress()
        setEthAddress(address)
    }, []);

    console.log(ethAddress)
    console.log("Page render count: " + Math.random());

    return (
        <>
            {showMessage && (
                <Notif messageColor={messageColor} message={message}/>
            )}

            <div style={{
                position: "fixed",
                right: "0",
                padding: "1.5rem",
                cursor: "pointer",
                display: "none"
            }}
            >
                <Darkmode currentMode={currentMode} onClickDarkmode={handleClickDarkmode}/>
            </div>

            <Grid>
                <Cell span={4}>
                    <div
                        style={{
                            borderRight: "10px solid lightgray",
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
                                    cursor: "pointer",
                                }}
                                onClick={handleClickAddUser}
                            >
                <i className="bi bi-plus-circle-dotted"></i>
              </span>
                        </div>

                        <FilterByRole filterListValue={filterListValue}
                                      onChangeFilterList={(params) => setFilterListValue(params.value)}/>

                        <SearchElement handleSubmitQuery={handleSubmitQuery} queryValue={query}
                                       handleChangeQuery={handleChangeQuery}/>

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
                                    style={{
                                        fontFamily: "Montserrat",
                                        cursor: "pointer",
                                        backgroundColor: currentHoverUser == u["_id"] ? "lightgray" : ""
                                    }}
                                    key={u["_id"]}
                                    onMouseEnter={function () {
                                        handleMouseEnter(u["_id"])
                                    }}
                                    onMouseLeave={handleMouseLeave}
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
                            valueWalletAddress={walletAddress}
                            onChangeWalletAddress={(e) => setWalletAddress(e.currentTarget.value)}
                            onClickWalletAddress={handleClickCopyWalletAddress}
                            valueBirthdate={birthdate}
                            onChangeBirthdate={({date}) =>
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
                            walletAddress={currentUser["walletAddress"].substring(0, 10)}
                            copyWalletAddress={() => {
                                navigator.clipboard.writeText(currentUser["walletAddress"])
                            }}
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
                            onChangeBirthdate={({date}) =>
                                setBirthdate(Array.isArray(date) ? date : [date])
                            }
                            valueEmail={email}
                            onChangeEmail={(e) => setEmail(e.currentTarget.value)}
                            valueRole={role}
                            onChangeRole={(params) => setRole(params.value)}
                            cancelButton={handleClickAddUser}
                            loading={isLoading}
                        />
                    </Cell>
                )}

                <Cell span={3}>
                    {/* TransactionHistory component will be refactored*/}
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

                    {currentUser == undefined &&
                        <div
                            style={{
                                marginTop: "1rem",
                                border: "2px solid gray",
                                borderRadius: "5px",
                                padding: "1rem",
                                fontFamily: "Montserrat",
                            }}
                        >
                            History will be here
                        </div>
                    }

                    {currentUser !== undefined &&
                        <div
                            style={{
                                marginTop: "1rem",
                                border: "2px solid gray",
                                borderRadius: "5px",
                                padding: "1rem",
                                fontFamily: "Montserrat",
                            }}
                        >
                            <div style={{display: "flex", marginBottom: "1rem"}}>
                                <div style={{width: "35%",}}>Date</div>
                                <div style={{
                                    width: "20%",
                                    paddingLeft: "4px",
                                    paddingRight: "10px"
                                }}>Action
                                </div>
                                <div style={{width: "45%"}}>Amount</div>
                            </div>
                            {ethData.map((t) =>
                                <div style={{
                                    display: "flex",
                                    fontSize: ".8rem",
                                    marginBottom: "1rem",
                                    backgroundColor: "lightgray",
                                    padding: ".5rem",
                                    borderRadius: "1rem"
                                }}>
                                    <div
                                        style={{width: "35%",}}>{new Date(Number(t["timeStamp"])).toString().slice(3, 16)}</div>
                                    <div style={{
                                        width: "20%",
                                        paddingLeft: "4px",
                                        paddingRight: "10px"
                                    }}>Transfer
                                    </div>
                                    <div style={{width: "45%"}}>{ethers.utils.formatEther(t["value"]).substring(0, 10)}...
                                    </div>
                                </div>
                            )}

                        </div>
                    }
                </Cell>
            </Grid>
        </>
    );
}

export default Home;
