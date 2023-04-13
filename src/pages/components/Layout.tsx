import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children }: React.PropsWithChildren<{}>) {
    return (
        <>
        <Navbar />
        <div className="container center">{children}</div>
        <Footer />
        </>
    );
}