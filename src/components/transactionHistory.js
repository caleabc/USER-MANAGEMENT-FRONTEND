import * as React from "react";
import {ethers} from "ethers";

function TransactionHistory(props) {
    // React.useState here...
    return (
        <>
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

            {props.currentUser == undefined &&
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

            {props.currentUser !== undefined &&
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
                    {props.transactions.map((t) =>
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
        </>
    );
}

export default TransactionHistory;
