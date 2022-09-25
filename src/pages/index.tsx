import { Link } from "react-router-dom";
import routes from "~react-pages";
import pagesName from "../pageName";
import "./index.css";

const Component = (): JSX.Element => (
    <div className="pages">
        {pagesName.map((p, i) => {
            if (p.path != "/") {
                return (
                    <div key={i} className="page">
                        <Link to={p.path + ""}>{p.path + ":" + p.name}</Link>
                    </div>
                );
            }
        })}
    </div>
);

export default Component;
