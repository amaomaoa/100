import { Suspense, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useRoutes } from "react-router";
import routes from "~react-pages";
import pagesName from "./pageName";
import "./App.css";

const App = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const navigate = useNavigate();
    const [pageName, setPageName] = useState("");

    useEffect(() => {
        pagesName.forEach((i) => {
            console.log(pathname.substring(1, 4), i.path);

            if (pathname.substring(1, 4) === i.path) {
                setPageName(i.name);
            }
        });
    }, [pathname]);

    const iscd =
        pathname === "/" ? (
            <></>
        ) : (
            <p>
                <a href="javascript:void(0);" onClick={() => navigate(-1)}>
                    cd..
                </a>
            </p>
        );

    const title = (
        <div
            style={{
                display: "flex",
                justifyItems: "flex-start",
                fontFamily:
                    "Fira Code,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace",
            }}
        >
            {pathname === "/" ? (
                <h3>100 days</h3>
            ) : (
                <h3>
                    {Number(pathname.substring(1, 4))} day : {pageName}
                </h3>
            )}
        </div>
    );

    return (
        <>
            <Suspense fallback={<p>Loading...</p>}>
                {title}
                {useRoutes(routes)}
                <>{iscd}</>
            </Suspense>
        </>
    );
};

export default App;
