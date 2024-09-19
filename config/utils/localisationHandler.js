// Handlebars used for string templating and assumes the presence of a JSON file for localization data
//handlebars: used for compiling and rendering templates.

//CommonJS
//uses 'require' and 'module.exports'
const localisation = require('./localisation.json')
const Handlebars = require('handlebars');

//ES Modules - modern javascript module system
//import localisation from './localisation';
//export default localisation

/**
userLanguage{String} - required, is the user's language pref
key{String} - required, localisation key
params {Object} - optionals values to update in key
*/

//defines a function for retrieving and formatting localized strings based on user parameters and optional parameters.


const getLocalisedString = (userLanguage,key,params)=>{
    //localisationObject: Retrieves the localization entry for the provided key.
    const localisationObject =localisation[key];
    if(!localisationObject) throw new Error(`${key} is not a valid localisation key`);

    /*localisatonStringToUse: Determines which localization string to use:
      localisationObject[userLanguage]: Retrieves the localized string for the user’s language if it exists.
      ?? localisationObject.default: Uses the default string if no localized string is found for the user’s language.
       The ?? operator returns the right-hand operand when the left-hand operand is null or undefined.
    */
    
    const localisatonStringToUse =localisationObject.userLanguage??localisationObject.default;
    /**
     * template: Compiles the localization string into a Handlebars template.
        template(params ?? {}): Renders the compiled template with the provided parameters.
         If params is null or undefined, an empty object {} is used instead.  
     */
    const template = Handlebars.compile(localisatonStringToUse);
    return template(params ?? {})
}

module.exports= getLocalisedString;