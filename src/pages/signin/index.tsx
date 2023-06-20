import { useGlobalContext } from "@/Context/store";
import HeaderExternal from "@/Layout/HeaderExternal/Index";
import FormLogin, { formLoginContentInterface } from "@/components/FormLogin";
import HasLogged from "@/components/HasLogged";
import WaitingScreen from "@/components/WaitingScreen";
import { ApiRequest } from "@/utils/Api";
import IsLogged from "@/utils/Client/LoginValidation";
import { useEffect, useState } from "react";
import { render } from "react-dom";

type loginStatusInterface = "waiting" | "logged" | "not-logged"

export default function Login() {
    const userProfile = useGlobalContext()
    const [blockButton, setBlockButton] = useState<boolean>(false)

    const handleSignIn = async ({ password, username }: formLoginContentInterface) => {

        setBlockButton(true)

        const loginResponse = await ApiRequest.login({ password, username })
        if (loginResponse.logged) {
            localStorage.setItem("access-token", loginResponse.accesstoken || "")
            localStorage.setItem("username", loginResponse.profile?.username || "")
            window.location.href = "/"

        }
        else {
            setBlockButton(false)
        }
    }

    return <FormLogin disableButton={blockButton} onSubmit={handleSignIn} />
}

