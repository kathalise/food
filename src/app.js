// import React from "react";
// import axios from "./axios.js";
// import { BrowserRouter, Route } from "react-router-dom";
// import Header from "./header";
// import Logout from "./logout";
// import Footer from "./footer";

// export class App extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             //         //     // imgUrl: null,
//             //         //     // uploaderIsVisible: false,
//         };
//         //     // this.toggleUploader = this.toggleUploader.bind(this);
//         //     // this.uploadImage = this.uploadImage.bind(this);
//         //     // this.closeUploader = this.closeUploader.bind(this);
//         //     // this.updateBio = this.updateBio.bind(this);
//         // console.log("this: ", this);
//         console.log("HALLO???");
//     }

//     componentDidMount() {
//         console.log("App just mounted");
//         //     // this is a good place fot axios
//         axios
//             .get("/user")
//             .then(() => {
//                 // console.log("{ data }: ", { data });
//                 console.log(" data: ");

//                 this.setState({
//                     id: data.id,
//                     firstname: data.firstname,
//                     lastname: data.lastname,
//                     //                 // imgUrl: data.imgurl,
//                     //                 // bio: data.bio,
//                 });
//             })
//             .catch((err) => {
//                 console.log("Err in axios GET / user", err);
//                 this.setState({
//                     error: "Oops! There was an error.",
//                 });
//             });
//     }

//     // toggleUploader() {
//     //     this.setState({
//     //         uploaderIsVisible: !this.state.uploaderIsVisible,
//     //     });
//     // }

//     // Image upload without refresh + uploader closes by itself
//     // uploadImage(argument) {
//     //     this.setState({ imgUrl: argument });
//     //     this.setState({
//     //         uploaderIsVisible: !this.state.uploaderIsVisible,
//     //     });
//     // }

//     // closeUploader() {
//     //     this.setState({
//     //         uploaderIsVisible: !this.state.uploaderIsVisible,
//     //     });
//     // }

//     // updateBio(updateMyBio) {
//     //     this.setState({
//     //         bio: updateMyBio,
//     //     });
//     // }

//     render() {
//         // Loading .... time for some spinner
//         // if (!this.state.id) {
//         //     console.log("Pending.....");
//         //     return null;
//         // }
//         return (
//             <>
//                 {/* <BrowserRouter> */}
//                 {/* {this.state.error && (
//                     <div className="error">
//                         Oops! Something went wrong.<br></br>
//                         Please try again.
//                     </div>
//                 )} */}
//                 <header>
//                     <Header />
//                     <Logout />

//                     {/* <ProfilePic
//                         firstname={this.state.firstname}
//                         lastname={this.state.lastname}
//                         imgUrl={this.state.imgUrl || "/default.png"}
//                         toggleUploader={this.toggleUploader}
//                         imgClassName="small"
//                     /> */}
//                 </header>
//                 {/* <h2>Hey {this.state.firstname}, you are now logged in!</h2> */}

//                 {/* <Route
//                     exact
//                     path="/"
//                     render={() => (
//                         <Profile
//                             id={this.state.id}
//                             firstname={this.state.firstname}
//                             lastname={this.state.lastname}
//                             imgUrl={this.state.imgUrl || "/default.png"}
//                             toggleUploader={this.toggleUploader}
//                             bio={this.state.bio}
//                             updateBio={this.updateBio}
//                         />
//                     )}
//                 /> */}
//                 {/* <Route
//                     path="/user/:otherId"
//                     render={(props) => (
//                         <OtherProfile
//                             key={props.url}
//                             match={props.match}
//                             history={props.history}
//                         />
//                     )}
//                 /> */}
//                 {/* <Route path="/users" component={FindPeople} />
//                 <Route path="/buddies" component={Friends} />
//                 <Route path="/chat" component={Chat} /> */}

//                 {/* {this.state.uploaderIsVisible && (
//                     <Uploader
//                         uploadImage={this.uploadImage}
//                         closeUploader={this.closeUploader}
//                     />
//                 )} */}

//                 <footer>
//                     <Footer />
//                 </footer>
//                 {/* </BrowserRouter> */}
//             </>
//         );
//     }
// }

import React, { useState, useEffect } from "react";
import axios from "./axios.js";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./header";
import Logout from "./logout";
import Footer from "./footer";
import { useStore } from "react-redux";
// import Categories from "./categories";
import ProfilePic from "./profilePic";
import Bio from "./bio";

export default function App() {
    const [user, setUser] = useState("");
    useEffect(() => {
        console.log("EFFECT IS WORKING", user);
        (async () => {
            try {
                const { data } = await axios.get("/user/logged-in", {});
                console.log("res from db: ", data);
                setUser(data);
                console.log(data.id);
            } catch (err) {
                console.log("err: ", err);
            }
        })();
    }, []);
    return (
        <div className="app-container">
            <header>
                <Header />
                <Logout />
            </header>
            <div className="app">
                {/* {user &&
                user.map((info, i) => {
                    return ( */}
                <h1>Hey {user.firstname} !</h1>
                <div className="user-profile">
                    <ProfilePic
                        firstname={user.firstname}
                        lastname={user.lastname}
                        imgUrl={user.imgUrl || "/default.png"}
                        // toggleUploader={this.toggleUploader}
                    />
                    <Bio />
                </div>
                <footer>
                    <Footer />
                </footer>
            </div>
        </div>
    );
}
