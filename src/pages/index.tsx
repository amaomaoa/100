import { Link } from "react-router-dom";
import routes from "~react-pages";
import { Path } from "./types";

const pagesName: Path[] = [
    {
        name: "square",
        path: "001",
    },
];

const Component = () => (
    <div className="pages">
        {pagesName.map((p) => {
            if (p.path != "/") {
                return (
                    <div className="page">
                        <Link to={p.path + ""}>{p.path + ":" + p.name}</Link>
                    </div>
                );
            }
        })}
    </div>
);

export default Component;
