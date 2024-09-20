import React, { useState, useEffect, useMemo } from "react";
import OtpInput from "react-otp-input";
import { useLocation, useNavigate } from "react-router-dom";
import { postApi, postWithoutAuthApi } from "@/services/method";
import { APIS } from "@/constants/api.constant";
import { ROUTES } from "@/constants/route.constant";
import { toast } from "sonner";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Button } from '@/components/ui/button';

import { ButtonLoadingIcon } from '@/components/icons';
const VerifyOtpForm = () => {
    const [isOtpReset, setIsOtpReset] = useState(false);
    const [otp, setOtp] = useState("");
    const [seconds, setSeconds] = useState(30);
    const navigate = useNavigate();
    const location = useLocation();

    const [isLoading, setIsLoading] = useState(false);
    const [otpRequired, setOtpRequired] = useState(false);
    const onVerfyHandler = () => {
        const data = {
            loginEmail: location?.state?.email,
            otp: otp,
        };
        if (otp === "") {
            setOtpRequired(true);
            return;
        }
        postWithoutAuthApi(APIS?.VERIFYOTP, data)
            .then((res) => {
                const dataTok = {
                    token: res.data.token
                };
                toast.success("OTP has been verified successfully")

                setIsLoading(true);
                navigate(ROUTES.RESET_PASSWORD, { state: dataTok })
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message || "Invalid Otp");
                setIsLoading(false)
            });
    };
    const onCancleHandler = () => {
        navigate(ROUTES.FORGOT_PASSWORD);
    };

    const onRestHandler = () => {
        setIsOtpReset(true);
        const data = {
            loginEmail: location?.state?.email,
        };
        postApi(APIS.FORGET_PASSWORD, data)
            .then((res) => {
                toast.success("Please check your mail");
            })
            .catch((error) => {
                toast.error("Something went wrong!!!");
            });
        setSeconds(30);
    };

    useMemo(() => {

        if (otp) {
            setOtpRequired(false);
        }
    }, [otp]);
    useEffect(() => {
        const timerInterval = setInterval(() => {
            setSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
        }, 1000);
        setIsOtpReset(false);
        return () => {
            clearInterval(timerInterval);
        };
    }, [isOtpReset]);

    return (
        <>

            <div className="login-middle">
                <div className="otp-section">
                    <Label htmlFor="email">OTP</Label>

                    <OtpInput
                        className="otp-main"
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        isInputNum={true}
                        shouldAutoFocus={true}
                        renderSeparator={
                            <span style={{ width: "15px" }}> </span>
                        }
                        renderInput={(props, index) => (
                            <Input
                                {...props}
                                className="otp-input"
                                placeholder="0"
                                onKeyPress={(e) => {
                                    if (!/[0-9]/.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                            />
                        )}
                    />

                    {otpRequired && (
                        <div className="error-message">OTP is required</div>
                    )}
                </div>
                <div className="otp-bottom-section">
                    <div>
                        <p className="heading-400-16 c-black">
                            00:{seconds < 10 ? `0${seconds}` : seconds}
                        </p>
                    </div>
                    <div>
                        <p className="heading-400-16 text-end c-black">
                            Didn’t receive an OTP?
                            <span
                                className={`heading-500-16 c-blue  ${seconds > 0 ? "c-d1" : "curser-pointer"
                                    }`}
                                onClick={seconds === 0 ? onRestHandler : null}
                            >
                                {" "}
                                Resend OTP
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="login-bottom">

                <Button onClick={onVerfyHandler} disabled={isLoading} className="big-btn heading-500-18">
                    {isLoading ? <ButtonLoadingIcon className=" h-8 w-8" /> : 'VERIFY'}
                </Button>
                <Button
                    className="big-btn-outline heading-500-18"

                    variant="outline"
                    style={{ marginTop: "15px" }}
                    onClick={onCancleHandler}
                >
                    {" "}
                    CANCEL
                </Button>
            </div>
        </>
    )
}

export default VerifyOtpForm
