import { useState } from "react";
import { ApiRequest } from "../Api";

export default async function IsLogged() {
  const accessToken = localStorage.getItem("access-token") || "d";

  if (accessToken !== "") {
    return await ApiRequest.login(accessToken).logged;
  }

  return true;
}
