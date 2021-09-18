import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
export const Signup = () => {
    const { store, actions } = useContext(Context);
    const [name, setNames] = useState("");
    const [email, setEmails] = useState("");
    const [password, setPasswords] = useState();
    const [city, setCity] = useState();
    async function newName(event) {
        setNames(event.target.value);
        console.log(event.target.value + "1234");
    }
    async function newEmail(event) {
        setEmails(event.target.value);
    }
    async function newPass(event) {
        setPasswords(event.target.value);
    }
    async function newCity(event) {
        setCity(event.target.value);
    }
    async function newCity(event) {
        setCity(event.target.value);
    }
    const signup = async (name, email, password, city) => {
        const resp = await fetch("https://3001-pink-muskox-itxt6b0i.ws-eu16.gitpod.io/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                city: city,
                country: country
            })
        });
        const responseJson = await resp.json();
        setNames(responseJson.name);
        setEmails(responseJson.email);
        setPasswords(responseJson.password);
        setCity(responseJson.city);
        //setCountry(responseJson.country);
        // save your token in the localStorage
        //also you should set your user into the store using the setStore function
        localStorage.setItem("jwt-token", responseJson.token);
        return responseJson;
    };
    return (
        <div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    onChange={newEmail}
                />
                <small id="emailHelp" className="form-text text-muted">
                    We will never share your email with anyone else.
                </small>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputName1">Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="exampleInputName1"
                    aria-describedby="nameHelp"
                    placeholder="Enter name"
                    onChange={newName}
                />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    onChange={newPass}
                />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputCity1">City</label>
                <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    onChange={newCity}
                />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputCity1">Country</label>
                <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    onChange={newCountry}
                />
            </div>
            <div className="form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" htmlFor="exampleCheck1">
                    Check me out
                </label>
            </div>
            <button
                type="submit"
                className="btn btn-primary"
                onClick={() => {
                    signup(name, email, password, city);
                }}>
                Submit
            </button>
        </div>
    );
};