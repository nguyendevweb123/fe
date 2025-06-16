import { useState } from "react";
import styles from "./Sidebar.module.css";
import { Image } from "antd";

const menuItems = [
  { icon: "⊞", label: "Dashboard" },
  { icon: "👤", label: "Users" },
  { icon: "🕒", label: "Time" },
  { icon: "📄", label: "Documents" },
  { icon: "⚙️", label: "Settings" },
];

export default function Sidebar() {
  const [activeIndex, setActiveIndex] = useState(0); // Mặc định chọn mục đầu tiên

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <Image
          style={{ borderRadius: "50%", border: "solid 1px", marginBottom: "5px" }}
          preview={false}
          src="https://th.bing.com/th/id/OIP.c-3eOacu4yvnh1zExOnALwHaHa?w=169&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
        />
        {menuItems.map((item, index) => (
          <a
            key={index}
            href="#"
            onClick={() => setActiveIndex(index)}
            className={`${styles.navItem} ${index === activeIndex ? styles.active : ""}`}
          >
            <span className={styles.icon}>{item.icon}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
}
