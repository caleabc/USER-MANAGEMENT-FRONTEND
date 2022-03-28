import * as React from "react";

function CreateIcon(props) {
    return (
        <span
            style={{
                alignSelf: "center",
                color: "gray",
                fontSize: "2.5rem",
                cursor: "pointer",
            }}
            onClick={props.handleClickAddUser}
        >
                <i className="bi bi-plus-circle-dotted"></i>
              </span>
    )
}

export default CreateIcon