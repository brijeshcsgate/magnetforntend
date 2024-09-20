import IndicatoreSlider from "@/components/common/Sliders/Sliders";
import "./Login.css";
import LoginForm from "./login.form";

const Login = () => {
  const isTitlePara = {
    title: "Welcome Back!",
    para1: "Login to continue to MAGN8.ONE",
    para2: "",
  };

  return (
    <>
      <div className="to-login-row">
        <div className="to-login-col-left">
          <IndicatoreSlider />
        </div>
        <div className="to-login-col-right">
          <div className="login-right-section">
            <div className="overflow-container">
              <div className="login-form">
                <div className="login-form-container">
                  <div className="login-top">
                    <div className="logo-section">
                      <div className="logo-img-div hover-text">
                        <img
                          className="w-100"
                          src="/assets/images/mag_logo.png"
                          
                          // src="#"
                          alt="logo.svg"
                        />
                      </div>
                    </div>

                    <div className={`wel-alignment heading-600-26 `}>
                      {isTitlePara.title}
                    </div>
                    <div className="sign-alignment heading-400-16">
                      {isTitlePara.para1}{" "}
                      <span className={"c-blue curser-pointer"}>
                        {isTitlePara.para2}
                      </span>
                    </div>
                  </div>

                  <div className="login-middle">
                    <LoginForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
