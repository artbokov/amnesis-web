import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useAuthentication } from "../../contexts/AuthContext";
import { CircularProgress } from "@mui/material";

const VerifyEmailPage = () => {
    const { tokenId } = useParams();
    const { verifyEmail } = useAuthentication();
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        if (tokenId) {
            verifyEmail(tokenId).then(() => setIsVerified(true));
        }
    }, [tokenId]);

    return isVerified ? <Navigate to="/login" /> : <CircularProgress />;
};

export default VerifyEmailPage;
