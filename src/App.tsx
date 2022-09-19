import { Suspense } from "react";
import { useLocation, useNavigate, useRoutes } from "react-router";

import routes from "~react-pages";
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

    return (
        <Suspense fallback={<p>Loading...</p>}>
            {useRoutes(routes)}
            <>{iscd}</>
        </Suspense>
    );
};

export default App;
