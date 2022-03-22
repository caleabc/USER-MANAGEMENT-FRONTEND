import * as React from "react";
import {Select} from "baseui/select";

function FilterByRole(props) {
    // React.useState here...
    return (
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
                value={props.filterListValue}
                onChange={props.onChangeFilterList}
            />
        </div>
    );
}

export default FilterByRole;
