import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";
import { addLocalStorageData } from "../../../Utils/LocalStorage";

const PaymentSuccess = () => {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const tranStatus = searchParams.get("tran_status");

    useEffect(() => {
        const handleRemoveCartData =async () => {

            if(tranStatus === "success"){
    
                // await localStorage.removeItem("cartData");
                await addLocalStorageData('cartData', []);

                
                toast.success("Payment successful");
    
                navigate("/dashboard/account/my-orders");
            }
        }

        handleRemoveCartData();
    }, [tranStatus]);

    return (
        <div className="min-h-screen flex justify-center items-center text-xl ">
            Payment Successful...
        </div>
    );
};

export default PaymentSuccess;