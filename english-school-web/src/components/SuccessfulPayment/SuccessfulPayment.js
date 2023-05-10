import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { CheckoutService } from "../../services/checkoutService";
import './SuccessfulPayment.scss';
import { useTranslation } from "react-i18next";

const SuccessfulPayment = () => {
    const {t, i18n } = useTranslation();
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
            <div class="icon">{ t('Thank you for your purchase!') }</div>
        </div>
    )
}

export default SuccessfulPayment;