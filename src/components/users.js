import * as React from "react";

// this component currently standby
function Users(props) {
    return (
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
            {props.users.map((u) => (
                <p
                    style={{
                        fontFamily: "Montserrat",
                        cursor: "pointer",
                        backgroundColor: props.currentHoverUser == u["_id"] ? "lightgray" : ""
                    }}
                    key={u["_id"]}
                    onMouseEnter={props.onMouseEnter}
                    onMouseLeave={props.handleMouseLeave}
                    onClick={props.onClickName}
                >
                    {u["lastname"]}, {u["firstname"]}
                </p>
            ))}
        </div>
    )
}

export default Users;
