import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import {Head} from "@inertiajs/react";

export default function PageLayout({user, children, className = "", headTitle, cartAmount}) {
    return (
        <div className={`${className}`}>
            <Head title={headTitle}/>
            <Header user={user} cartAmount={cartAmount}/>
            {children}
            <Footer/>
        </div>
    );
}
