import { Suspense } from "react";
import { useLocation, useNavigate, useRoutes } from "react-router";

import routes from "~react-pages";
import "./App.css";
const App = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const navigate = useNavigate();

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
                <h3>{Number(pathname.substring(1, 4))} day</h3>
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
