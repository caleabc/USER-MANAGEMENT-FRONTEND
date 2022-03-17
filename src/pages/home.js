import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Grid, Cell } from "baseui/layout-grid";
import { AppNavBar } from "baseui/app-nav-bar";
import { H1, H2 } from "baseui/typography";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button, KIND } from "baseui/button";
import { Notification } from "baseui/notification";
import { DatePicker } from "baseui/datepicker";
import { Select } from "baseui/select";
import { Search } from "baseui/icon";

import Toggle from "react-toggle";

function Home() {
  // navigate
  const navigate = useNavigate();

  return (
    <>
      <Grid>
        <Cell span={4}>
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
                Users
              </p>
              <span
                style={{
                  alignSelf: "center",
                  color: "gray",
                  fontSize: "2.5rem",
                }}
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
                  Root: { style: { width: "10rem", display: "inline-block" } },
                }}
                searchable={false}
                options={[
                  { id: "AliceBlue", color: "#F0F8FF" },
                  { id: "AntiqueWhite", color: "#FAEBD7" },
                  { id: "Aqua", color: "#00FFFF" },
                  { id: "Aquamarine", color: "#7FFFD4" },
                  { id: "Azure", color: "#F0FFFF" },
                  { id: "Beige", color: "#F5F5DC" },
                ]}
                labelKey="id"
                valueKey="color"
              />
            </div>

            <div>
              <Input
                startEnhancer={<Search size="1.2rem" />}
                placeholder="Name"
              />
            </div>

            <div
              style={{
                marginTop: "1rem",
                border: "2px solid gray",
                borderRadius: "5px",
                height: "30rem",
              }}
            ></div>
          </div>
        </Cell>

        <Cell span={5}>
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
                Create
              </p>
              {false && (
                <span
                  style={{
                    alignSelf: "center",
                    color: "gray",
                    fontSize: "2rem",
                  }}
                >
                  <i className="bi bi-pen"></i>
                  <i className="bi bi-trash"></i>
                </span>
              )}
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
                Last Name
              </p>
              <Input
                overrides={{
                  Root: { style: { width: "20rem", display: "inline-block" } },
                }}
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
                  Root: { style: { width: "20rem", display: "inline-block" } },
                }}
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
                  Root: { style: { width: "20rem", display: "inline-block" } },
                }}
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
              <Input
                overrides={{
                  Root: { style: { width: "20rem", display: "inline-block" } },
                }}
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
                Birthday
              </p>
              <DatePicker
                overrides={{
                  InputWrapper: {
                    style: { width: "20rem", display: "inline-block" },
                  },
                }}
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
                  Root: { style: { width: "20rem", display: "inline-block" } },
                }}
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
                  Root: { style: { width: "20rem", display: "inline-block" } },
                }}
                searchable={false}
                options={[
                  { id: "AliceBlue", color: "#F0F8FF" },
                  { id: "AntiqueWhite", color: "#FAEBD7" },
                  { id: "Aqua", color: "#00FFFF" },
                  { id: "Aquamarine", color: "#7FFFD4" },
                  { id: "Azure", color: "#F0FFFF" },
                  { id: "Beige", color: "#F5F5DC" },
                ]}
                labelKey="id"
                valueKey="color"
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
                Active
              </p>
              <div style={{ display: "inline", width: "20rem" }}>
                <p>
                  <Toggle icons={false} />
                </p>
              </div>
            </div>
          </div>
        </Cell>

        <Cell span={3}>
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
        </Cell>
      </Grid>
    </>
  );
}

export default Home;
