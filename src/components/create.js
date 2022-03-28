import * as React from "react";
import {Input} from "baseui/input";
import {DatePicker} from "baseui/datepicker";
import {Select} from "baseui/select";
import {Button, KIND, SHAPE} from "baseui/button";
import {Spinner} from "baseui/spinner";
import Check from 'baseui/icon/check';

import {StatefulPopover, PLACEMENT} from 'baseui/popover';
import {ParagraphSmall} from 'baseui/typography';

function Create(props) {
    // React.useState here...
    
    return (
        <>
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
                        Create
                    </p>
                </div>

                <form onSubmit={props.handleSubmitCreateComponent}>
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
                            Last Name
                        </p>
                        <Input
                            overrides={{
                                Root: {
                                    style: {width: "20rem", display: "inline-block"},
                                },
                            }}
                            required
                            value={props.valueLastname}
                            onChange={props.onChangeLastname}
                        />
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
                            First Name
                        </p>
                        <Input
                            overrides={{
                                Root: {
                                    style: {width: "20rem", display: "inline-block"},
                                },
                            }}
                            required
                            value={props.valueFirstname}
                            onChange={props.onChangeFirstname}
                        />
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
                            Middle Name
                        </p>
                        <Input
                            overrides={{
                                Root: {
                                    style: {width: "20rem", display: "inline-block"},
                                },
                            }}
                            required
                            value={props.valueMiddlename}
                            onChange={props.onChangeMiddlename}
                        />
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
                            Wallet Address
                        </p>
                        <StatefulPopover
                            onClick={props.onClickCopyWalletAddress}
                            content={
                                <div style={{
                                    fontFamily: "Montserrat",
                                    fontSize: "1.1rem",
                                    padding: "1rem",
                                    backgroundColor: "black",
                                    color: "white"
                                }}>
                                    <span style={{marginRight: "1rem"}}><i className="bi bi-check-lg"></i></span>
                                    <span>Copied to clipboard</span>
                                </div>
                            }
                            accessibilityType={'tooltip'}
                            placement={PLACEMENT.top}
                        >
                            <div>
                                <Input
                                    required
                                    overrides={{
                                        Root: {
                                            style: {width: "20rem", display: "inline-block"},
                                        },
                                    }}
                                    value={props.valueWalletAddress}
                                    onChange={props.onChangeWalletAddress}
                                />
                            </div>
                        </StatefulPopover>
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
                            Birthday
                        </p>
                        <DatePicker
                            overrides={{
                                InputWrapper: {
                                    style: {width: "20rem", display: "inline-block"},
                                },
                            }}
                            value={props.valueBirthdate}
                            onChange={props.onChangeBirthdate}
                        />
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
                            Email
                        </p>
                        <Input
                            overrides={{
                                Root: {
                                    style: {width: "20rem", display: "inline-block"},
                                },
                            }}
                            required
                            type="email"
                            value={props.valueEmail}
                            onChange={props.onChangeEmail}
                        />
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
                            Role
                        </p>

                        <Select
                            overrides={{
                                Root: {
                                    style: {width: "20rem", display: "inline-block"},
                                },
                            }}
                            searchable={false}
                            options={[
                                {id: "STUDENT", color: "student"},
                                {id: "TEACHER", color: "teacher"},
                                {id: "ADMINISTRATOR", color: "administrator"},
                            ]}
                            labelKey="id"
                            valueKey="color"
                            value={props.valueRole}
                            placeholder="Select role"
                            onChange={props.onChangeRole}
                        />
                    </div>

                    <div>
                        <Button type="submit" shape={SHAPE.pill}>
                            {props.loading == false ? (
                                <span>Submit</span>
                            ) : (
                                <span>
                  <Spinner color="white" size="1rem"/>{" "}
                                    <span style={{marginLeft: ".5rem"}}>Please wait </span>
                </span>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Create;
