"use client";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import './form.css';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

const MemberForm = () => {
    const [names, setNames] = useState<string[]>([]);
    const [selectedName, setSelectedName] = useState<string>("None");
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

        if (selectedName === "None") {
            alert("Please select a name.");
            return;
        }

        if (!isSaturday(new Date())) {
            router.push(`/pages/error?message=${encodeURIComponent('Active only on Saturday')}`); 
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

        console.log(memberData);

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
        console.log(memberData);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <header className="header">
                    <img src="/toast.png" alt="Toastmasters Logo" className="logo" /> 
                    <h1>Trivandrum Toastmasters</h1>
                </header>
                <label htmlFor="name">Name:</label>
                <select
                    id="name"
                    name="name"
                    value={selectedName}
                    onChange={(e) => setSelectedName(e.target.value)}
                >
                    <option value="None" disabled>
                        None
                    </option>
                    {names.map((name, index) => (
                        <option key={index} value={name}>
                            {name}
                        </option>
                    ))}
                </select>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default MemberForm;
