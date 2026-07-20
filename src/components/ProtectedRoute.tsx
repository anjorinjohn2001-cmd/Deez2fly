import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

interface Props {
    children: React.ReactNode;
}

function ProtectedRoute({ children }: Props) {
    const [loading, setLoading] = useState(true);
    const [allowed, setAllowed] = useState(false);

    useEffect(() => {
        async function checkUser() {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (user && user.email === "anjorinjohn2001@gmail.com") {
                setAllowed(true);
            }

            setLoading(false);
        }

        checkUser();
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                Checking access...
            </div>
        );
    }

    if (!allowed) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}

export default ProtectedRoute;