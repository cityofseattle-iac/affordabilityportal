module.exports = {
    webpack: (config) => {
        // Unshift polyfills in main entrypoint.
        const originalEntry = config.entry;
        config.entry = async () => {
            const entries = await originalEntry();
            if (entries['main.js']) {
                entries['main.js'].unshift('./polyfill.js');
            }
            return entries;
        };

        return config;
    }
};
