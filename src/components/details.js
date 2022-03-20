import * as React from "react";
import { Input } from "baseui/input";
import { Button, KIND, SHAPE } from "baseui/button";
import Toggle from "react-toggle";

function Details(props) {
  // React.useState here...
  return (
    <>
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
            Details
          </p>

          <span
            style={{
              alignSelf: "center",
              color: "lightgray",
              fontSize: "2rem",
            }}
          >
            <i className="bi bi-pen" onClick={props.handleClickEdit}></i>
            <i className="bi bi-trash" onClick={props.handleClickDelete}></i>
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
              width: "20rem",
            }}
          >
            {props.lastname}
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
              width: "20rem",
            }}
          >
            {props.firstname}
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
              width: "20rem",
            }}
          >
            {props.middlename}
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
              width: "20rem",
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
              width: "20rem",
            }}
          >
            {props.birthdate}
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
              width: "20rem",
            }}
          >
            {props.email}
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
              width: "20rem",
            }}
          >
            {props.role}
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
          <div style={{ display: "inline", width: "20rem" }}>
            <p onClick={props.handleClickStatusButton}>
              <Toggle checked={props.status} icons={false} />
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;
