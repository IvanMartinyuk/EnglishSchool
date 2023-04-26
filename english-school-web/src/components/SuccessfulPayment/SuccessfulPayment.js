import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { CheckoutService } from "../../services/checkoutService";
import './SuccessfulPayment.scss';

const SuccessfulPayment = () => {
    const searchParams = useParams();

    useEffect(() => {
        if(sessionStorage.getItem("isPaymentSend"))
        {
            let checkoutService = new CheckoutService();

            if(searchParams.courseId && sessionStorage.getItem("IsPaymentSave") == 'false') {
                checkoutService.savePayment(searchParams.courseId);
                sessionStorage.setItem("IsPaymentSave", true);
            }
            sessionStorage.removeItem("isPaymentSend")
        }
        else {
            sessionStorage.setItem("isPaymentSend", false)
        }
    }, []);

    return(
        <div class="confetti mt-5">
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="icon">Thank you for your purchase!</div>
        </div>
    )
}

export default SuccessfulPayment;