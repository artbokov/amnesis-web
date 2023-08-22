import classes from "./styles.module.scss";
import { Button, NavigationLink as Link, NavigationLink } from "../index";
import { useAuthentication } from "../../contexts/AuthContext";
import { useState } from "react";
import { Popper, Box, Fade, Paper, Typography } from "@mui/material";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import classNames from "classnames";

const links = [
    {
        path: "/info",
        text: "О нас",
    },
    {
        path: "/chat",
        text: "Чат",
    },
    {
        path: "/support",
        text: "Поддержка",
    },
];

const Header = () => {
    const { user, signOut } = useAuthentication();

    return (
        <header className={classes.header}>
            <span className={classes["company-name"]}> AnaVIT </span>
            {links.map((i) => (
                <Link key={i.path} text={i.text} navigateTo={i.path} />
            ))}

            <PopupState variant="popper">
                {(popupState) => (
                    <>
                        <div
                            className={classes["user-data"]}
                            {...(user ? bindToggle(popupState) : null)}
                        >
                            {user ? (
                                <>
                                    <div
                                        className={classNames(
                                            classes["user-info"],
                                            classes["hide-on-phone"]
                                        )}
                                    >
                                        <span className={classes["user-name"]}>
                                            {`${user.first_name} ${
                                                user.second_name
                                            } ${user.patronymic ?? ""}`}
                                        </span>
                                        <span className={classes["user-email"]}>
                                            {user.email}
                                        </span>
                                    </div>
                                    <div
                                        className={classNames(
                                            classes["icon-imitation"],
                                            classes["hide-on-phone"]
                                        )}
                                    />
                                    <Popper
                                        {...bindPopper(popupState)}
                                        transition
                                    >
                                        {({ TransitionProps }) => (
                                            <Fade
                                                {...TransitionProps}
                                                timeout={350}
                                            >
                                                <Paper
                                                    sx={{ marginTop: "15px" }}
                                                >
                                                    <Button
                                                        color="bg-dark-blue"
                                                        label="Выйти из профиля"
                                                        onClick={() =>
                                                            signOut()
                                                        }
                                                    />
                                                </Paper>
                                            </Fade>
                                        )}
                                    </Popper>
                                </>
                            ) : (
                                <NavigationLink
                                    text="Войти"
                                    navigateTo="/login"
                                />
                            )}
                        </div>
                    </>
                )}
            </PopupState>
        </header>
    );
};

export default Header;
