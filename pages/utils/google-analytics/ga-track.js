import ReactGA from 'react-ga';

function initializeGoogleAnalytics() {
    ReactGA.initialize('UA-33712689-7');
}

function trackPageView(path) {
    ReactGA.set({ page: path });
    ReactGA.pageview(path);
}

function trackEvent(args) {
    if(!args) {
        return;
    }

    ReactGA.event(args);
}

export default initializeGoogleAnalytics;
export {initializeGoogleAnalytics, trackPageView, trackEvent};
