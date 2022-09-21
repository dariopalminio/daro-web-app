import "./user-profile.css";
import React, { FunctionComponent, useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import SessionContext, {
    ISessionContext,
} from "../../../../../domain/context/session.context";
import clsx from "clsx";
import { Profile } from "../../../../../domain/model/user/profile.type";
import { Address } from "../../../../../domain/model/user/address.type";
import MyAddresses from "./my-addresses";
import IUserValidator from "../../../../../domain/helper/user-validator.interface";
import { UserValidatorFactory } from "../../../../../domain/helper/user-validator.factory";
import Button from "../../../common/button/button";
import CircularProgress from "../../../common/progress/circular-progress";
import Alert from "../../../common/alert/alert";
import TextField from "../../../common/text-field/text-field";
import ProfileLanguage from "./profile-language";
import useProfile from "../../../../../domain/hook/user/profile.hook";
import ListBox from "../../../common/list-box/list-box";


const initialNewAddress: Address = {
    street: '',
    department: '',
    neighborhood: '',
    city: '',
    state: '',
    country: ''
};

const initialEmptyProfile: Profile = {
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    docType: '',
    document: '',
    telephone: '',
    language: '',
    addresses: [initialNewAddress]
};


/**
 * User Profile
 */
const UserProfile: FunctionComponent = () => {
    const { t, i18n } = useTranslation();
    const { session } = useContext(SessionContext) as ISessionContext;
    const [profile, setProfile] = useState(initialEmptyProfile);
    const [initialized, setInitialized] = useState(false);
    const { isProcessing, hasError, msg, isSuccess, getProfile, updateProfile } = useProfile();
    const validator: IUserValidator = UserValidatorFactory.create();
    const [firstNameValid, setFirstNameValid] = useState(false);
    const [lastNameValid, setLastNameValid] = useState(false);
    const docTypeOptions = ["RUT", "DNI", "OTHER", "None"];

    const fetchData = async () => {
        const username = session ? session.preferred_username : '';

        try {
            const info = await getProfile(username);

            if (info.language) i18n.changeLanguage(info.language.toLowerCase());


            console.log('fetchData.info.userName', info.userName);
            if (info.userName) {
                setProfile({
                    ...profile,
                    userName: info.userName,
                    firstName: info.firstName,
                    lastName: info.lastName,
                    email: info.email,
                    docType: info.docType ? info.docType.toUpperCase() : '',
                    document: info.document,
                    telephone: info.telephone,
                    language: info.language ? info.language.toLowerCase() : '',
                    addresses: info.addresses
                });

                setFirstNameValid(await validator.nameIsValid(info.firstName));
                setLastNameValid(await validator.nameIsValid(info.lastName));
            }

        } catch (e) {
            console.log(e);
        }

        setInitialized(true);
    };

    useEffect(() => {

        fetchData();

    }, []);

    const handleUpdateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await updateProfile(profile);
        } catch (e) {
            console.log(e);
        }
    };

    const handleLanguageChange = (len: string): void => {
        setProfile({
            ...profile,
            language: len
        })
    };

    const handleFirstNameChange = async (firstNameValue: string) => {
        setProfile({
            ...profile,
            firstName: firstNameValue
        });
        setFirstNameValid(await validator.nameIsValid(firstNameValue));
    };

    const handleLastNameChange = async (lastNameValue: string) => {
        setProfile({
            ...profile,
            lastName: lastNameValue
        });
        setLastNameValid(await validator.nameIsValid(lastNameValue));
    };

    const handleDocTypeChange = async (docTypeValue: string) => {
        setProfile({
            ...profile,
            docType: docTypeValue
        })
    };

    const handleDocumentChange = async (documentValue: string) => {
        setProfile({
            ...profile,
            document: documentValue
        })
    };

    const handleTelephoneChange = async (telephoneValue: string) => {
        setProfile({
            ...profile,
            telephone: telephoneValue
        })
    };


    const handleAddClose = (newAddresses: Array<any>): void => {

        setProfile({
            ...profile,
            addresses: newAddresses
        })

    };

    const ifFieldsAreInvalid = (): boolean => {
        return firstNameValid && lastNameValid;
    };

    return (
        <div>
            {(!hasError) && <div >
                <form
                    id="RegisterForm"
                    data-testid="RegisterForm"
                    action="#"
                    onSubmit={handleUpdateSubmit}
                >
                    <div className="wrapper-user-profile">
                        <div className="wrapper-user-data">

                            <h1>
                                {t('profile.title')}
                            </h1>

                            <div className="wrapper-centerer">
                                <TextField
                                    id="standard-basic-1"
                                    label={t('profile.label.firstname')}
                                    placeholder=""
                                    onChange={(e) => handleFirstNameChange(e.target.value)}
                                    value={profile.firstName}
                                    {...(!firstNameValid && {
                                        error: true,
                                        helperText: t('register.info.helper.text.required')
                                    })}
                                />
                            </div>
                            <div className="wrapper-centerer">
                                <TextField
                                    id="standard-basic-2"
                                    label={t('profile.label.lastname')}
                                    placeholder=""
                                    onChange={(e) => handleLastNameChange(e.target.value)}
                                    value={profile.lastName}
                                    {...(!lastNameValid && {
                                        error: true,
                                        helperText: t('register.info.helper.text.required'),
                                    })}
                                />
                            </div>
                            <div className="wrapper-centerer">
                                <TextField
                                    id="standard-basic-3"
                                    label={t('profile.label.email')}
                                    placeholder="you@email.com"
                                    onChange={(e) => { }}
                                    value={profile.email}
                                />
                            </div>
                            <div className="wrapper-centerer">

                                <ListBox
                                    id="demo-select-small"
                                    label={t('profile.docType')}
                                    value={profile.docType}
                                    options={docTypeOptions}
                                    onChange={(selectedOption) => handleDocTypeChange(selectedOption)}
                                />

                            </div>

                            <div className="wrapper-centerer">
                                <TextField
                                    id="standard-basic-5"
                                    label={t('profile.document')}
                                    onChange={(e) => handleDocumentChange(e.target.value)}
                                    value={profile.document}
                                />
                            </div>

                            <div className="wrapper-centerer">
                                <TextField
                                    id="standard-basic-5"
                                    label={t('profile.telephone')}
                                    onChange={(e) => handleTelephoneChange(e.target.value)}
                                    value={profile.telephone}

                                />
                            </div>
                            <div className="wrapper-centerer">
                                <ProfileLanguage
                                    onChange={(len: string) => handleLanguageChange(len)} />
                            </div>

                        </div>
                        <div className="wrapper-user-address">
                            {initialized &&
                                <MyAddresses addresses={profile.addresses}
                                    onChange={(newAddresses: Array<any>) => handleAddClose(newAddresses)}>
                                </MyAddresses>
                            }

                        </div>
                    </div>
                    <div className="wrapper-user-action">
                        {ifFieldsAreInvalid() &&
                            <Button
                                type="submit"
                                style={{ "margin-top": "5px" }}
                            >
                                {t('profile.command.submit')}
                            </Button>
                        }
                        {!ifFieldsAreInvalid() &&
                            <Button
                                style={{ "margin-top": "5px" }}
                                disabled
                            >
                                {t('profile.command.submit')}
                            </Button>
                        }
                    </div>
                </form>
            </div>
            }
            <br />

            {isProcessing && (
                <div className="box">
                    <strong>{t('login.info.loading')}</strong>
                    <CircularProgress />
                </div>
            )}

            {hasError && <Alert severity="error">{t(msg)}</Alert>}

        </div>
    );
};

export default UserProfile;