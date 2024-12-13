import React from "react";

const Home = React.lazy(() => import("../pages/home"));
const Featured = React.lazy(() => import("../pages/featured"));
const Details = React.lazy(() => import("../pages/details"));

export const routes = [
	{
		path: "/",
		name: "Home",
		element: <Home />,
	},
	{
		path: "/featured",
		name: "Featured",
		element: <Featured />,
	},
	{
		path: "/details/:id",
		name: "Details",
		element: <Details />,
	},
];
