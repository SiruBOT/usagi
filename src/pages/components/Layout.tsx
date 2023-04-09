import Navbar from "./Navbar";

export default function Layout({ children }: React.PropsWithChildren<{}>) {
    return (
        <>
        <Navbar />
        <div className="container">{children}</div>
        </>
    );
}