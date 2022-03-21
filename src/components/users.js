import * as React from "react";
import {Select} from "baseui/select";
import {Input} from "baseui/input";
import {Search} from "baseui/icon";

function Users(props) {
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
                onClick={props.handleClickAddUserP}
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
                    {id: "STUDENT", color: "STUDENT"},
                    {id: "TEACHER", color: "TEACHER"},
                    {id: "ADMINISTRATOR", color: "ADMINISTRATOR"},
                ]}
                labelKey="id"
                valueKey="color"
                value={props.filterListValueP}
                onChange={props.onChangeFilterListValueP (params) => setFilterListValue(params.value)}
            />
        </div>

        <div>
            <form onSubmit={props.handleSubmitQueryP}>
                <Input
                    startEnhancer={<Search size="1.2rem"/>}
                    placeholder="Name"
                    value={props.queryP}
                    onChange={props.handleChangeQueryP}
                />
            </form>
        </div>

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
            {props.usersP.map((u) => (
                <p
                    style={{
                        fontFamily: "Montserrat",
                        cursor: "pointer",
                        backgroundColor: props.currentHoverUserP == u["_id"] ? "lightgray" : ""
                    }}
                    key={u["_id"]}
                    onMouseEnter={function () {
                        props.handleMouseEnter(u["_id"])
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
}

export default Users
