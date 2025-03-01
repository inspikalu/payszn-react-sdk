import { usePaySZN } from "./PaySZNContext";
export const PaymentModalWrapper = () => {
    const { paySZN, showModal } = usePaySZN();
    if (!paySZN || !showModal)
        return null;
    return paySZN.renderPaymentModal();
};
