"use client";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import 'react-toastify/dist/ReactToastify.css';
import './form.css';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

const MemberForm = () => {
    const [names, setNames] = useState<string[]>([]);
    const [selectedName, setSelectedName] = useState<string>("Name");
    const router = useRouter();

    async function getMembers() {
        const { data, error } = await supabase.from("memberList").select("Name");

        if (error) {
            router.push('/pages/error');
            return;
        }

        if (data) {
            setNames(data.map((member: { Name: string }) => member.Name).sort((a, b) => a.localeCompare(b)));
        }
    }

    useEffect(() => {
        getMembers();
    }, []);

    const isSaturday = (date: Date) => {
        return date.getDay() === 6;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (selectedName === "Name") {
            toast.error("Please select a name.", {
                position: "top-right",
                className: "custom-toast",
                bodyClassName: "custom-toast-body",
            });

            return;
        }

        if (!isSaturday(new Date())) {
            toast.error("Active only on Saturday", {
                position: "top-right",
                className: "custom-toast",
                bodyClassName: "custom-toast-body",
            });
            return;
        }

        const { error: insertError } = await supabase
            .from("members")
            .insert([
                { name: selectedName, date: new Date().toISOString() }
            ]);

        if (insertError) {
            router.push('/pages/error');
            return;
        }

        // Get the current attended count
        const { data: memberData, error: fetchError } = await supabase
            .from("memberList")
            .select("attended")
            .eq("Name", selectedName)
            .single();



        if (fetchError) {
            router.push('/pages/error');
            return;
        }

        if (memberData) {
            const { error: updateError } = await supabase
                .from("memberList")
                .update({ attended: (memberData.attended || 0) + 1 })
                .eq("Name", selectedName);

            if (updateError) {
                router.push('/pages/error');
                return;
            }

            router.push('/pages/success');
        } else {
            router.push('/pages/error'); // Redirect to error page
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <header className="header">
                    <img src="/toast.png" alt="Toastmasters Logo" className="logo" />
                    <h1>Trivandrum Toastmasters</h1>
                </header>
                <select
                    id="name"
                    name="name"
                    value={selectedName}
                    onChange={(e) => setSelectedName(e.target.value)}
                >
                    <option value="Name" disabled>
                        Name
                    </option>
                    {names.map((name, index) => (
                        <option key={index} value={name}>
                            {name}
                        </option>
                    ))}
                </select>
                <button type="submit">Submit</button>
            </form>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />


        </div>
    );
};

export default MemberForm;
