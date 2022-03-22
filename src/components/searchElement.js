import * as React from "react";
import {Select} from "baseui/select";
import {Input} from "baseui/input";
import {Search as SearchIcon} from "baseui/icon";

function SearchElement(props) {
    // React.useState here...
    return (
        <div>
            <form onSubmit={props.handleSubmitQuery}>
                <Input
                    startEnhancer={<SearchIcon size="1.2rem"/>}
                    placeholder="Name"
                    value={props.queryValue}
                    onChange={props.handleChangeQuery}
                />
            </form>
        </div>
    );
}

export default SearchElement;
