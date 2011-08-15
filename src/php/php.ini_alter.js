php.ini_alter = function (varname, newvalue) {
    // !No description available for ini_alter. @php.js developers: Please update the function summary text file.
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/ini_alter
    // +   original by: Brett Zamir (http://brett-zamir.me)
    // -    depends on: ini_set
    // *     example 1: \php.ini_alter('date.timezone', 'America/Chicago');
    // *     returns 1: 'Asia/Hong_Kong'
    return this.ini_set(varname, newvalue);
};

