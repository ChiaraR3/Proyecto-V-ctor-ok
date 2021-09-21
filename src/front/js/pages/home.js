import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";

export const Home = () => {
	const { store, actions } = useContext(Context);

	fetch("https://3001-harlequin-squirrel-ayofvhl9.ws-eu16.gitpod.io/api/countries/create", {
		method: "POST",
		body: JSON.stringify({
			name: "Portugal"
		}),
		headers: {
			"Content-Type": "application/json"
		}
	}).then(response => console.log(response));

	fetch("https://3001-harlequin-squirrel-ayofvhl9.ws-eu16.gitpod.io/api/countries/4/cities/create", {
		method: "POST",
		body: JSON.stringify({
			name: "Lisboa"
		}),
		headers: {
			"Content-Type": "application/json"
		}
	}).then(response => console.log(response));

	return (
		<div className="text-center mt-5">
			<h1>Hello Rigo!</h1>
			<p>
				<img src={rigoImageUrl} />
			</p>
			<div className="alert alert-info">{store.message || "Loading message from the backend..."}</div>
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://github.com/4GeeksAcademy/react-flask-hello/tree/95e0540bd1422249c3004f149825285118594325/docs">
					Read documentation
				</a>
			</p>
		</div>
	);
};
