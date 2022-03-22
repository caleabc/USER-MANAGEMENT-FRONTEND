import * as React from "react";

function Notif(props) {
    // React.useState here...
    return (
        <>
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
                    backgroundColor: props.messageColor,
                }}
            >
                {props.message}
            </div>
        </>
    );
}

export default Notif;
