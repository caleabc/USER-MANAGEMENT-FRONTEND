import * as React from "react";

function TransactionHistory(props) {
  // React.useState here...
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
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
    </>
  );
}

export default TransactionHistory;
