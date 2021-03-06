import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";

// function HelloWorld() {
//     return (
//         <div>Hello, World!</div>
//     );
// }

let elem;

// if user is logged out, show WELCOME registration page /welcome
if (location.pathname == "/welcome") {
    elem = <Welcome />;
} else {
    // init(store);
    elem = (
        //     <Provider store={store}>
        // <header>
        //     <Header />
        //     <Logout />
        // </header>
        <div>
            <App />
        </div>
        //     </Provider>
    );
    // console.log("LOGIN AREA");
}

ReactDOM.render(elem, document.querySelector("main"));
