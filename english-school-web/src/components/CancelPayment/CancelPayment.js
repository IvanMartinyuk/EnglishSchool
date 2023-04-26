import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

const CancelPayment = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        sessionStorage.setItem("IsPaymentSave", true)
        navigate('/courses');
    }, [])

    return (
        <div></div>
    )
}

export default CancelPayment;