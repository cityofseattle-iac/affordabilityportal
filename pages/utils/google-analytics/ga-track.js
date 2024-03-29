import ReactGA from 'react-ga4';

function initializeGoogleAnalytics() {
    ReactGA.initialize('G-EH0S8RTGWD');
}

function trackPageView(path) {
    ReactGA.send({
        hitType: 'pageview',
        page: path
    })
}

function trackEvent(args) {
    if(!args) {
        return;
    }

    ReactGA.event(args);
}

export default initializeGoogleAnalytics;
export {initializeGoogleAnalytics, trackPageView, trackEvent};
