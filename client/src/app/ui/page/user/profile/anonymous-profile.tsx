import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import Link from "../../../common/link/link";
import ProfileLanguage from "../../../component/user/profile/profile-language";
import Paper from "../../../common/paper/paper";


/**
 * Anonymous Profile
 */
const AnonymousProfile: FunctionComponent = () => {
    const { t, i18n } = useTranslation();

    return (
        <Paper>
            {t("profile.msg.anonymous")}

            &nbsp;&nbsp;
            <Link href="/user/auth">
                {t('login.command')}
            </Link>
            &nbsp;&nbsp;
            <Link href="/user/register/form">
                {t('register.command.link')}
            </Link>

            <ProfileLanguage onChange={(len: string)=> {}}/>
            
        </Paper>
    );
};

export default AnonymousProfile;