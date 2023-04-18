import styles from "@components/Divider.module.css";

export default function Divider ({ orientation }: { orientation: "horizontal" | "vertical" }) {
    return (
        <div className={orientation == "horizontal" ? styles.horizontal : styles.vertical } />
    );
}