import ReactGA from 'react-ga';

function initializeGoogleAnalytics() {
    ReactGA.initialize('G-EH0S8RTGWD');
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
