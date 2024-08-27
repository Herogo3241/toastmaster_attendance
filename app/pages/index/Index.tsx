"use client"
import { useRouter } from "next/navigation";
import "./Index.css";



const Index = () => {
    const router = useRouter();
    const handleMembers = () => {
        router.push("/pages/memberform");
    }

    const handleGuests = () => {
        router.push("/pages/guestform");

    }



    return (
        <div className="container">
            <div className="header">
                <img src="/toast.png" alt="Toastmasters Logo" className="logo" />
                <h1>Trivandrum Toastmasters</h1>
            </div>
            <div>
                <button onClick={handleMembers}>Member</button>
            </div>
            <div>
                <button onClick={handleGuests}>Guest</button>
            </div>
        </div>
    );
}


export default Index;