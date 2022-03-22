import * as React from "react";
import "./darkmode.css";

function Darkmode(props) {
    // React.useState here...
    return (
        <div onClick={props.onClickDarkmode}>
            <div style={{fontSize: "1.5rem"}}>
                {props.currentMode == "light"
                    ? <i className="bi bi-moon"></i>
                    : <i className="bi bi-cloud-sun"></i>
                }
            </div>
        </div>
    );
}

export default Darkmode;
