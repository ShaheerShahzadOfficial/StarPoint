import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../Redux/Actions/User";
import User from "../User/User";
import "./Search.css";

const Search = () => {
  const [name, setName] = useState("");

  

  const { users } = useSelector((state) => state.allUsers);

  const dispatch = useDispatch();
  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   dispatch(getAllUser(name));
  // };

  useEffect(() => {
    dispatch(getAllUser(name));

  }, [dispatch, name])

  return (
    <div className="search">
      <form className="searchForm">
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Search User
        </Typography>

        <input
          type="text"
          value={name}
          placeholder="Search User"
          onChange={(e) => {
            setName(e.target.value)
            e.preventDefault();
    dispatch(getAllUser(e.target.value));
          }
          }
        />

        {/* <Button disabled={loading} type="submit">
          Search
        </Button> */}

        <div className="searchResults">
          {users &&
            users?.map((user) => (
              <User
                key={user?._id}
                userId={user?._id}
                name={user?.name}
                avatar={user?.avatar}
              />
            ))}
        </div>
      </form>
    </div>
  );
};

export default Search;
