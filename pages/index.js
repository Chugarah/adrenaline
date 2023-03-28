import { Component, useEffect, useState } from "react";
import { useAuth0, withAuth0 } from "@auth0/auth0-react";

import Button from "../components/Button";
import Header from "../containers/Header";

import Mixpanel from "../library/mixpanel";

import SubscriptionModal from "../containers/SubscriptionModal";
import {useRouter} from "next/router";

const Landing = ({auth0}) => {
    const { isAuthenticated, user } = auth0;
    const router = useRouter();
    const [showSubscriptionModal, setShowSubscriptionModal] = useState(false)

    function onGetStarted() {
        Mixpanel.track("click_get_started", { isAuthenticated });
        router.push("/debugger");
    }

    useEffect(() => {
        if (isAuthenticated) {
            Mixpanel.identify(user.sub);
            Mixpanel.people.set({ email: user.email });
        }

        Mixpanel.track("load_landing_page");
    })

    return (
        <div id="landing">
            <Header isTransparent setShowSubscriptionModal={setShowSubscriptionModal} />

            <div id="overTheFold">
                <div id="landingHeading">
                    <span id="landingTitle">Understand your code <span>with AI</span></span>
                    <p id="landingSubtitle">Stop using StackOverflow for help. Talk directly to your codebase like you
                        would an expert.</p>
                </div>
                <Button
                    id="getStartedButton"
                    isPrimary
                    onClick={onGetStarted}
                >
                    Get started
                </Button>
            </div>

            {showSubscriptionModal ?
                <div className={"grid p-2 justify-items-center"}>
                    <SubscriptionModal setShowSubscriptionModal={setShowSubscriptionModal} />
                </div>
                : null
            }
        </div>
    );
}

export default withAuth0(Landing);