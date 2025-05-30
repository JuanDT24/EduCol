import './Sidebar.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


export default function Sidebar(props) {
    const navigate = useNavigate();
    const { sidebarItems } = props;

    const handleItemClick = (item) => {
        if (item.action === 'navigate') {
            navigate(item.target);
        } else if (item.onClick) {
            item.onClick();
        }
    }

    return(

        <div className="sidebar-container">
            <div className="sidebar-header">
                <h2>Menu</h2>
            </div>
            <ul className="sidebar-list">
                {sidebarItems.map((item, index) => (
                    <li key={index} className="sidebar-item" onClick={() => handleItemClick(item)}>
                        {item.icon && <span className={`icon ${item.icon}`}></span>}
                        <span className="item-text">{item.text}</span>
                    </li>
                ))}
            </ul>

        </div>


    )
    
}


