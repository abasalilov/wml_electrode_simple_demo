import React from "react";
import { Route } from "react-router";
import Home from "./components/home";
import OrderPage from "./components/OrderPage/";

export const routes = <Route exact path="/" component={Home} />;
