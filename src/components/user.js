import * as React from "react";

function User(props) {
    // react useState here...
    
    return (
        <p
            style={{
                fontFamily: "Montserrat",
                cursor: "pointer",
                backgroundColor: props.currentHoverUser == props.u["_id"] ? "lightgray" : ""
            }}
            key={props.u["_id"]}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.handleMouseLeave}
            onClick={props.onClickName}
        >
            {props.u["lastname"]}, {props.u["firstname"]}
        </p>
    )
}

export default User;
