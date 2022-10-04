import React, { FunctionComponent, useState } from "react";
import { ContactType } from "domain/model/notification/contact.type";
import { useTranslation } from 'react-i18next';
import Button from "app/ui/common/button/button";
import Paper from "app/ui/common/paper/paper";
import TextField from "app/ui/common/text-field/text-field";

const defaultContact: ContactType = {
    name: "",
    email: "",
    phone: "",
    message: "",
};

interface Props {
    onSubmit: (contact: any) => void;
    style?: any;
}

/**
 * Contact Form
 * 
 * Pattern: Presentation Component, Controled Component and Extensible Style
 */
const ContactForm: React.FC<Props> = ({ onSubmit, style }) => {

    const { t } = useTranslation();
    const [contact, setContact] = useState(defaultContact);
    const [emailIsInvalid, setEmailIsInvalid] = useState(false);
    const [emailErrorText] = useState("Invalid Email");
    const [telephoneIsInvalid, setTelephoneIsInvalid] = useState(false);
    const [telephoneErrorText] = useState("Telephone invalid");
    const [fullnameValid, setFullnameValid] = useState(false);

    //Regular expression to fields validation
    const expresionsRegular = {
        name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letters and spaces can carry accents.
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        telefono: /^\d{7,14}$/ // 7 to 14 numbers.
    };

    /**
     * send Submit
     */
    const handleSendSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(contact);
    };

    const handleNameChange = async (fullname: string) => {
        setContact((prevState) => ({
            ...prevState,
            name: fullname,
        }));

        if (expresionsRegular.name.test(fullname)) {
            setFullnameValid(true);
        } else {
            setFullnameValid(false);
        }
    };

    /**
     * Validate if the email is in the correct format
     * @param emailValue
     */
    const handleEmailChange = async (emailValue: string) => {
        setContact((prevState) => ({
            ...prevState,
            email: emailValue,
        }));

        if (expresionsRegular.email.test(emailValue)) {
            setEmailIsInvalid(false);
        } else {
            setEmailIsInvalid(true);
        }

    };

    const handlePhoneChange = async (phoneValue: string) => {
        setContact((prevState) => ({
            ...prevState,
            phone: phoneValue,
        }));

        if (expresionsRegular.telefono.test(phoneValue)) {
            setTelephoneIsInvalid(false);
        } else {
            setTelephoneIsInvalid(true);
        }
    };

    const handleMessageChange = async (textValue: string) => {
        setContact((prevState) => ({
            ...prevState,
            message: textValue,
        }));
    };

    return (
        <div>
            <Paper style={style? style : {}}>
                <form
                    id="ContactForm"
                    data-testid="ContactForm"
                    action="#"
                    onSubmit={handleSendSubmit}
                >
                    <div >
                        <h1 >
                            {t('contact.title')}
                        </h1>
                    </div>

                    <div >
                        {t('contact.info.call.to.action')}
                    </div>

                    <div >
                        <TextField
                            id="standard-basic-1"
                            label={t('contact.label.fullname')}
                            placeholder=""
                            onChange={(e) => handleNameChange(e.target.value)}
                            value={contact.name}
                            {...(!fullnameValid && { error: true, helperText: t('register.info.helper.text.required') })}
                        />
                    </div>
                    <div >
                        <TextField
                            id="standard-basic"
                            label={t('profile.label.email')}
                            placeholder="daro@email.com"
                            onChange={(e) => handleEmailChange(e.target.value)}
                            value={contact.email}
                            {...(emailIsInvalid && {
                                error: true,
                                helperText: emailErrorText,
                            })}
                        />
                    </div>

                    <div >
                        <TextField
                            id="standard-basic"
                            label="Phone"
                            placeholder="0000000000"
                            onChange={(e) => handlePhoneChange(e.target.value)}
                            value={contact.phone}
                            {...(telephoneIsInvalid && {
                                error: true,
                                helperText: telephoneErrorText,
                            })}
                        />
                    </div>
                    <div>
                        <TextField
                            id="outlined-textarea"
                            label={t('contact.label.message')}
                            placeholder="Placeholder"
                            onChange={(e) => handleMessageChange(e.target.value)}
                            value={contact.message}
                            multiline={true}
                        />
                    </div>
                    <br/>
                    <div style={{justifyContent: "center", alignItems: "center", display: "flex"}}>
                        <Button
                            type="submit"
                        >
                            {t('contact.command.send')}
                        </Button>
                    </div>

                </form>
            </Paper>

        </div>
    );
};

export default ContactForm;