import { IDENTITY_CONFIG, METADATA_OIDC } from "../utils/authConst";
import { UserManager, Log } from "oidc-client";

export default class AuthService {

    UserManager;
    accessToken;
    user;
    sub;
    token;
    SetTokenCallback;

    constructor(SetTokenCallback) {

        this.SetTokenCallback = SetTokenCallback;

        this.UserManager = new UserManager({
            ...IDENTITY_CONFIG,
            metadata: {
                ...METADATA_OIDC
            }
        });

        this.UserManager.events.addUserLoaded(user => {
            this.accessToken = user.access_token;

            this.setUserInfo({
                accessToken: this.accessToken,
                idToken: user.id_token
            });
            if (window.location.href.indexOf("signin-oidc") !== -1) {
                window.location.replace("/");
            }
        });

        this.UserManager.events.addSilentRenewError(e => {
            console.log("silent renew error", e.message);
        });

        this.UserManager.events.addAccessTokenExpired(() => {
            console.log("token expired");
            this.signinSilent();
        });

        this.UserManager.events.addUserSignedOut((e) => {

            if (process.env.NODE_ENV !== "development") {
                this.UserManager.removeUser();
                window.location.replace("/");
            }
        });
    }

    signinRedirectCallback = () => {
        this.UserManager.signinRedirectCallback().then(() => {
            "";

        });
    };

    getUser = async () => {
        const user = await this.UserManager.getUser();
        return user;
    };

    parseJwt = token => {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace("-", "+").replace("_", "/");
        return JSON.parse(window.atob(base64));
    };

    setUserInfo = authResult => {
        const data = this.parseJwt(this.accessToken);
        this.setSessionInfo(authResult);

        if (this.SetTokenCallback) {
            this.SetTokenCallback(this.accessToken);
        }
    };

    signinRedirect = (params) => {
        this.UserManager.signinRedirect(params);
    };

    setSessionInfo(authResult) {
        localStorage.setItem("access_token", authResult.accessToken);
        localStorage.setItem("id_token", authResult.idToken);
    }

    isAuthenticated = () => {
        return this.user != null && !this.user.expired;
    };

    signinSilent = () => {
        this.UserManager.signinSilent()
            .then(user => {
                if (this.SetTokenCallback) {
                    this.SetTokenCallback(user.access_token);
                }
                console.log("signed in", user);
            })
            .catch(err => {
                console.log(err);
            });
    };

    signinSilentCallback = () => {
        this.UserManager.signinSilentCallback();
    };

    createSigninRequest = () => {
        return this.UserManager.createSigninRequest();
    };

    logout = () => {
        this.UserManager.signoutRedirect({
            id_token_hint: localStorage.getItem("id_token")
        });
        this.UserManager.clearStaleState();
        window.location.replace("/");
    };

    signoutRedirectCallback = () => {

        this.UserManager.signoutRedirectCallback()
            .then(() => {
                return "Signed Out"
            });

        this.UserManager.clearStaleState();
    };
}
