import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import Link from "../../../common/link/link";
import ProfileLanguage from "../../../component/user/profile/profile-language";
import Paper from "../../../common/paper/paper";


/**
 * Anonymous Profile
 */
const AnonymousProfile: FunctionComponent = () => {
    const { t, i18n } = useTranslation();

    return (
        <div>
        <Paper style={{width: "400px", margin: "34px auto auto auto"}}>
            {t("profile.msg.anonymous")}

            &nbsp;&nbsp;
            <Link href="/user/auth">
                {t('login.command')}
            </Link>
            &nbsp;&nbsp;
            <Link href="/user/register/form">
                {t('register.command.link')}
            </Link>

            <br/>

            <ProfileLanguage onChange={(len: string)=> {}}/>
            
        </Paper>
        </div>
    );
};

export default AnonymousProfile;