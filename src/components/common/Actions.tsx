import React from "react";
import axios from "axios";
import Constent from "../Constent";

const api = axios.create({
  baseURL: Constent.BASE_URL,
});

var loggedInData: any = localStorage.getItem("loggedInData")
? localStorage.getItem("loggedInData")
: null;
loggedInData = JSON.parse(loggedInData);

export const handleLike = (user_id: any, post_id: any, user_by: any) => {
  let formData = new FormData();
  formData.append("user_id", user_id);
  formData.append("post_id", post_id);
  formData.append("user_by", user_by);
  api
    .post("/makeLike", formData)
    .then((res: any) => {
        console.log(res.data);
    })
    .catch((e) => {
      console.log(e);
    });
};
