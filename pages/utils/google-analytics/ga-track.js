import ReactGA from 'react-ga';

const isProd = true; //TODO - Track only production analytics otherwise dev and test would be tracked as well

function initializeGoogleAnalytics() {
    if (!isProd) {
        return;
    }
    ReactGA.initialize('UA-33712689-7');
}

function trackPageView(path) {
    if (!isProd) {
        return;
    }

    ReactGA.set({ page: path });
    ReactGA.pageview(path);
}

function trackEvent(args) {
    if (!isProd) {
        return;
    }

    if(!args) {
        return;
    }

    ReactGA.event(args);
}

export default initializeGoogleAnalytics;
export {initializeGoogleAnalytics, trackPageView, trackEvent};
