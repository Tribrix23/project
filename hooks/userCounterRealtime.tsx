'use client'
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/browser";


export default function userCounterRealtime() {
    const [totalUsers, setTotalUsers] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let channel: any;


        const init = async () => {
            try {
            const {count, error} = await supabase.from("profiles").select("*", {count: "exact", head: true});

            if (error) {
                console.error("Initial count error:", error.message);
            } else {
                setTotalUsers(count || 0);
            }

            setIsLoading(false);

            channel = supabase
            .channel("profiles-realtime-count")
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "profiles",
                },
                () => {
                    setTotalUsers((prev) => prev + 1);
                }
            )
            .on(
                "postgres_changes",
                {
                    event: "DELETE",
                    schema: "public",
                    table: "profiles",
                },
                () => {
                    setTotalUsers((prev) => Math.max(prev - 1, 0));
                }
            )
            .subscribe();
        } catch (err) {
            console.error("Realtime init error:", err);
            setIsLoading(false);
        }
    }

    init();

    return () => {
        if (channel) {
            supabase.removeChannel(channel);
        }
    }
    }, [])

    return {totalUsers, isLoading}
}