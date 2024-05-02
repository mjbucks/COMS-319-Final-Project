import "bootstrap/dist/css/bootstrap.css";
import "../styles/style.css"

export default function TitleText() {
    return (
        <div>
            <section className="header-main">
                <h1 style={{ textAlign: "center", paddingTop: "1%" }}>Welcome to Battle Buddies </h1>
                <h3 style={{ textAlign: "center" }}>Battle versus your friends as your favorite characters!</h3>
            </section>
        </div>
    );
}
