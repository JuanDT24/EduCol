import "./Topbar.css";
import { useNavigate } from "react-router-dom";

export default function Topbar(props) {
    const navigate = useNavigate();
    const { topbarItems } = props;

    const handleItemClick = (item) => {
        if (item.action === "navigate") {
            navigate(item.target);
        } else if (item.action === "scroll") {
            const section = document.getElementById(item.target);
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
        } else if (item.onClick) {
            item.onClick();
        }
    };

    return (
        <div className="topbar-container">
            <div className="short-border"></div>
            {topbarItems.map((item, index) => (
                <button 
                    key={index}
                    className="topbar-item"
                    onClick={() => handleItemClick(item)}
                >
                    {item.label}
                </button>
            ))}
        </div>
    );
}