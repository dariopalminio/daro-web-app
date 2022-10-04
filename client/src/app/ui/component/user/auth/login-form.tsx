import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import Button from "app/ui/common/button/button";
import TextField from "app/ui/common/text-field/text-field";
import Link from "app/ui/common/link/link";
import Paper from "app/ui/common/paper/paper";
import { CenteringContainer } from "app/ui/common/elements/centering-container";

interface Props {
    onSubmit: (email: string, password: string) => void;
    style?: any;
}

/**
 * LoginForm
 * 
 * Pattern: Presentation Component, Controled Component and Extensible Style
 */
const LoginForm: React.FC<Props> = ({ onSubmit, style }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailIsInvalid, setEmailIsInvalid] = useState(false);
    const [emailErrorText] = useState("Invalid email");
    const { t } = useTranslation();

    const expresionsRegular = {
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    };

    const LinkStyle = {
        paddingTop: "1.5em",
        position: "relative",
        rigt: "1em",
    }

    const handleEmailChange = async (value: string) => {
        setEmail(value);

        if (expresionsRegular.email.test(value)) {
            setEmailIsInvalid(false);
        } else {
            setEmailIsInvalid(true);
        }
    };

    const handlePasswordChange = async (value: string) => {
        //e.preventDefault();
        setPassword(value)
    };

    /**
     * Login
     */
    const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(email, password);
    };

    return (
        <div>
            <form
                id="LoginForm"
                data-testid="LoginForm"
                action="#"
                onSubmit={handleLoginSubmit}
            >
                <Paper style={style ? style : {}}>

                    <CenteringContainer>
                        <h1>{t('login.title')}</h1>
                    </CenteringContainer>

                    <CenteringContainer>
                        <p>{t('login.message')}</p>
                    </CenteringContainer>

                    <TextField
                        id="standard-basic"
                        label="Email"
                        placeholder="your@email.com"
                        onChange={(e) => handleEmailChange(e.target.value)}
                        value={email}
                        {...(emailIsInvalid && {
                            error: true,
                            helperText: emailErrorText,
                        })}
                    />


                    <TextField
                        id="standard-basic-2"
                        label={t('login.label.password')}
                        type="password"
                        onChange={(e) => handlePasswordChange(e.target.value)}
                        value={password}
                    />

                    <div style={{ marginTop: "35px", justifyContent: "center", alignItems: "center", display: "flex" }}>
                        <Link style={LinkStyle} href="/user/register/form">
                            {t('register.command.link')}
                        </Link>
                        &nbsp;&nbsp;
                        <Link style={LinkStyle} href="/user/recovery/start">
                            {t('recovery.command.link')}
                        </Link>
                    </div>

                    <div style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
                        <Button style={{ marginTop: "15px" }} type="submit">
                            {t('login.command')}
                        </Button>
                    </div>

                </Paper>
            </form>

        </div>
    );
};

export default LoginForm;
