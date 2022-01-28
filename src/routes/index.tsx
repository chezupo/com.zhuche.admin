import {RouteObject} from "react-router-dom";
import React from "react";
import Login from "@/pages/Login";
import Layout from "@/container/Layout";

const routes: RouteObject[] = [
  {path: '/', element: <Layout />},
  {path: '/login', element: <Login />},
]

export default routes
