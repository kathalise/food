// import React, { useState } from "react";
// import Bio from "./bio";
// import axios from "./axios";

// function useStatefulFields() {
//     const [values, setValues] = useState(new FormData());

//     const handleChange = ({ target }) => {
//         setValues((formData) => {
//             // if (target.files) {
//             formData.set(target.name, target.files[0]);
//             // } else {
//             //     formData.set(target.name, target.value);
//             // }
//             console.log("FormData", formData);
//             return formData;
//         });
//     };

//     return [values, handleChange];
// }
// // const closeMe = () => {
// //     console.log("x clicked");
// // };

// function useInputSubmit(url, values) {
//     const [error, setError] = useState();
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log("Das ist das e", e);

//         console.log("INSIDE useImputSubmit");
//         // axios
//         //     .post(url, values)
//         //     .then(({ data }) => {
//         //         console.log("data:", data);
//         //         if (data) {
//         //             location.replace("/myProfile");
//         //         }
//         //     })
//         //     .catch((err) => {
//         //         console.log("error in axios post /", err);
//         //         setError();
//         //     });
//     };
//     return [handleSubmit, error];
// }

// export default function Bio({ isShowing, hide }) {
//     const [values, handleChange] = useStatefulFields();
//     const [handleSubmit, error] = useInputSubmit("/uploadProfilepic", values);
//     const [modalState, setModalState] = useState(true);

//     const manageState = () => {
//         setModalState(!modalState);
//         console.log("changing state");
//     };

//     if (!modalState) {
//         return (
//             <>
//                 <div className="uploader">
//                     <h2
//                         className="closeX" //onClick={closeMe}
//                         onClick={manageState}
//                     >
//                         x
//                     </h2>
//                     <textarea
//                         key={3}
//                         type="text"
//                         placeholder="Tell other users about yourself"
//                         name="description"
//                         rows="5"
//                         maxLength="1000"
//                     />
//                     <form
//                         onChange={handleChange}
//                         style={{ paddingTop: "30px" }}
//                     >
//                         <button
//                             className="uploader-profilepic"
//                             onClick={handleSubmit}
//                         >
//                             Upload Picture
//                         </button>
//                     </form>
//                 </div>
//                 <div className="overlay"></div>
//             </>
//         );
//     } else {
//         return (
//             <div className="reg-buttons button">
//                 <button className="button-profile-pic" onClick={manageState}>
//                     Upload picture
//                 </button>
//             </div>
//         );
//     }
// }

// // let elem;
// //         if (this.state.bioEditingMode) {
// //             elem = (
// //                 <>
// //                     <textarea
// //                         cols="38"
// //                         rows="4"
// //                         defaultValue={this.props.bio}
// //                         onChange={(e) => this.handleChange(e)}
// //                         placeholder="Add a bio ✍️"
// //                     ></textarea>
// //                     <div className="bio-buttons">
// //                         <button
// //                             onClick={() => this.bioEditingModeOn()}
// //                             className="submit-button"
// //                         >
// //                             Cancel
// //                         </button>
// //                         <button
// //                             className="submit-button"
// //                             onClick={() => this.submitChanges()}
// //                         >
// //                             Save
// //                         </button>
// //                     </div>
// //                 </>
// //             );
// //         } else if (!this.state.bioEditingMode) {
// //             if (this.props.bio) {
// //                 elem = (
// //                     <div className="add-bio">
// //                         <p>{this.props.bio}</p>
// //                         <button
// //                             onClick={() => this.bioEditingModeOn()}
// //                             className="submit-button bio"
// //                             style={{ width: "150px" }}
// //                         >
// //                             Edit Bio
// //                         </button>
// //                     </div>
// //                 );
// //             } else {
// //                 //no bio
// //                 elem = (
// //                     <div className="add-bio">
// //                         {/* <p>There is no bio...</p> */}
// //                         <button
// //                             onClick={() => this.bioEditingModeOn()}
// //                             className="submit-button"
// //                             style={{ width: "150px" }}
// //                         >
// //                             Add bio
// //                         </button>
// //                     </div>
// //                 );
// //             }
// //         }

// //         return (
// //             <div>
// //                 {this.state.error && (
// //                     <div className="error">
// //                         Oops! Something went wrong. Please try again.
// //                     </div>
// //                 )}
// //                 {elem}
// //             </div>
// //         );
// //     }
