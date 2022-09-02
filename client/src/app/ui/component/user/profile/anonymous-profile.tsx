import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

//@material-ui https://v4.mui.com/
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import ProfileLanguage from "./profile-language";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            "& > * + *": {
                justifyContent: "center",
                textAlign: "center",
            },
        },
        linkClass: {
            paddingTop: "1.5em",
            position: "relative",
            rigt: "1em",
        },
    })
);

/**
 * Anonymous Profile
 */
const AnonymousProfile: FunctionComponent = () => {
    const { t, i18n } = useTranslation();
    const classes = useStyles();

    return (
        <div>
            {t("profile.msg.anonymous")}

            &nbsp;&nbsp;
            <Link className={clsx(classes.linkClass)} href="/user/auth">
                {t('login.command')}
            </Link>
            &nbsp;&nbsp;
            <Link className={clsx(classes.linkClass)} href="/user/register/form">
                {t('register.command.link')}
            </Link>

            <ProfileLanguage onChange={(len: string)=> {}}/>
            
        </div>
    );
};

export default AnonymousProfile;