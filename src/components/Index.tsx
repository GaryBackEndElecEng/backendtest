"use client";
import React from 'react';
import Home from "./home";
import Service from './service';


export default function Index() {
    const refHome = React.useRef(null);
    const service = new Service();
    const home = new Home(service);
    React.useEffect(() => {
        if (typeof window !== "undefined" && refHome.current) {
            const doc = document.querySelector("section#homeinjector") as HTMLElement;
            home.main({ parent: doc });
        }

    }, []);
    return (
        <section ref={refHome} id="homeinjector">

        </section>
    )
}
