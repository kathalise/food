import React from "react";

export default function Bio() {
    return (
        // let elem;
        // if (this.state.bioEditingMode) {
        //     elem = (
        //         <>
        <textarea
            cols="20"
            rows="4"
            style={{ border: "none", fontSize: "16px" }}
            // defaultValue={this.props.bio}
            // onChange={(e) => this.handleChange(e)}
            placeholder="Tell others about yourself ..."
        ></textarea>
        // {
        /* <div className="bio-buttons">
                        <button
                            onClick={() => this.bioEditingModeOn()}
                            className="submit-button"
                        >
                            Cancel
                        </button>
                        <button
                            className="submit-button"
                            onClick={() => this.submitChanges()}
                        >
                            Save
                        </button>
                    </div>
                </>
            );
        } else if (!this.state.bioEditingMode) {
            if (this.props.bio) {
                elem = (
                    <div className="add-bio">
                        <p>{this.props.bio}</p>
                        <button
                            onClick={() => this.bioEditingModeOn()}
                            className="submit-button bio"
                            style={{ width: "150px" }}
                        >
                            Edit Bio
                        </button>
                    </div>
                );
            } else {
                //no bio
                elem = (
                    <div className="add-bio">
                        // /* <p>There is no bio...</p> */
        //             <button
        //                 onClick={() => this.bioEditingModeOn()}
        //                 className="submit-button"
        //                 style={{ width: "150px" }}
        //             >
        //                 Add bio
        //             </button>
        //         </div>
        //     );
        // }
        // }
    );
}
