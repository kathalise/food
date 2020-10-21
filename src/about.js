import React from "react";
import { Link } from "react-router-dom";

export default function About() {
    return (
        <>
            <div className="about-subpage">
                <div className="closeY">
                    <Link
                        style={{
                            textDecoration: "none",
                            color: "black",
                        }}
                        to={"/"}
                    >
                        <p
                            style={{
                                marginTop: "0",
                                textAlign: "right",
                                fontSize: "20px",
                            }}
                        >
                            X
                        </p>
                    </Link>
                </div>
                <h1>About</h1>
                <h2 style={{ marginBottom: 0, display: "inline-block" }}>
                    <em>
                        "Globally, we throw out about 1.3 billion tons of food a
                        year, or a third of all the food that we grow. In
                        wealthy countries around 40 percent of wasted food is
                        thrown out by consumers."
                    </em>
                </h2>
                <p
                    style={{
                        marginTop: "0",
                        textAlign: "right",
                        fontSize: "12px",
                    }}
                >
                    The New York Times
                </p>

                <div>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Praesent ultricies lacus nisi, ac placerat erat
                        fermentum ullamcorper. Fusce quis urna orci. Mauris leo
                        nisi, pulvinar lacinia elementum pellentesque, lacinia
                        vel lectus. Pellentesque maximus est vitae faucibus
                        venenatis. Pellentesque at venenatis nunc, eu convallis
                        risus. Nam porttitor odio eget purus pretium interdum.
                        Vivamus lectus orci, auctor dapibus faucibus tincidunt,
                        ornare sit amet neque. Nunc sit amet magna lorem. Ut
                        malesuada nibh sit amet nunc sodales, ut lobortis felis
                        ullamcorper. Ut non nunc et lectus eleifend rhoncus id
                        in urna. Nullam blandit urna eu ante lacinia, quis
                        sagittis ligula rhoncus. Duis volutpat pretium quam a
                        molestie. Donec hendrerit tortor eu orci ultricies, id
                        vehicula lectus venenatis.
                    </p>
                    <p>
                        Integer ac condimentum ante, eget dapibus lectus. Nulla
                        a urna nec tellus auctor luctus pellentesque sit amet
                        nulla. In hac habitasse platea dictumst. Mauris laoreet
                        leo dictum enim fermentum pellentesque. Nullam quam
                        odio, interdum non urna quis, fringilla lacinia leo.
                        Maecenas tincidunt ligula eget odio congue imperdiet.
                        Morbi pretium ornare purus, a facilisis turpis.
                    </p>

                    <p>Integer ac condimentum ante, eget dapibus lectus.</p>
                </div>
            </div>
        </>
    );
}
