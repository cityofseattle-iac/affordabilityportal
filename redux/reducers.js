import {
    APPLY_FILTERS,
    SET_CATEGORIES,
    SET_FILTERED_PROGRAMS,
    SET_LANGUAGE,
    SET_PROGRAMS,
    SET_RESOURCES,
    SET_SUPPORTED_LANGUAGES
} from "./actions";

export const reducer = (state, action) => {

    switch (action.type) {
        case APPLY_FILTERS:
            return Object.assign({}, state, {filters: action.filters});
        case SET_LANGUAGE:
            return Object.assign({}, state, {currentLanguage: action.language});
        case SET_SUPPORTED_LANGUAGES:
            return Object.assign({}, state, {supportedLanguages: action.supportedLanguages});
        case SET_RESOURCES:
            return Object.assign({}, state, {resources: action.resources});
        case SET_CATEGORIES:
            return Object.assign({}, state, {categories: action.categories});
        case SET_PROGRAMS:
            return Object.assign({}, state, {programs: action.programs});
        case SET_FILTERED_PROGRAMS:
            return Object.assign({}, state, {filtered_programs: action.programs});
        default:
            return state
    }
};
