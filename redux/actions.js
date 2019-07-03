export const APPLY_FILTERS = 'APPLY_FILTERS';
export const SET_SUPPORTED_LANGUAGES = "SET_SUPPORTED_LANGUAGES";
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const SET_RESOURCES = 'SET_RESOURCES';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_PROGRAMS = 'SET_PROGRAMS';
export const SET_FILTERED_PROGRAMS = 'SET_FILTERED_PROGRAMS';

export function applyFilters(filters) {

    return {
        type: APPLY_FILTERS,
        filters
    }
}

export function setLanguage(language) {

    return {
        type: SET_LANGUAGE,
        language
    }

}

export function setSupportedLanguages(supportedLanguages) {

    return {
        type: SET_SUPPORTED_LANGUAGES,
        supportedLanguages
    }

}

export function setResources(resources) {

    return {
        type: SET_RESOURCES,
        resources
    }

}

export function setCategories(categories) {

    return {
        type: SET_CATEGORIES,
        categories
    }
}

export function setPrograms(programs) {

    return {
        type: SET_PROGRAMS,
        programs
    }
}

export function setFilteredPrograms(programs) {

    return {
        type: SET_FILTERED_PROGRAMS,
        programs
    }

}