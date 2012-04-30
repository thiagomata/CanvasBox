php.number_format = function(number, decimals, dec_point, thousands_sep) {
    // Formats a number with grouped thousands  
    // 
    // version: 1008.1718
    // discuss at: http://phpjs.org/functions/number_format
    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +     bugfix by: Michael White (http://getsprink.com)
    // +     bugfix by: Benjamin Lupton
    // +     bugfix by: Allan Jensen (http://www.winternet.no)
    // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +     bugfix by: Howard Yeend
    // +    revised by: Luke Smith (http://lucassmith.name)
    // +     bugfix by: Diogo Resende
    // +     bugfix by: Rival
    // +      input by: Kheang Hok Chin (http://www.distantia.ca/)
    // +   improved by: davook
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +      input by: Jay Klehr
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +      input by: Amir Habibi (http://www.residence-mixte.com/)
    // +     bugfix by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Theriault
    // *     example 1: \php.number_format(1234.56);
    // *     returns 1: '1,235'
    // *     example 2: \php.number_format(1234.56, 2, ',', ' ');
    // *     returns 2: '1 234,56'
    // *     example 3: \php.number_format(1234.5678, 2, '.', '');
    // *     returns 3: '1234.57'
    // *     example 4: \php.number_format(67, 2, ',', '.');
    // *     returns 4: '67,00'
    // *     example 5: \php.number_format(1000);
    // *     returns 5: '1,000'
    // *     example 6: \php.number_format(67.311, 2);
    // *     returns 6: '67.31'
    // *     example 7: \php.number_format(1000.55, 1);
    // *     returns 7: '1,000.6'
    // *     example 8: \php.number_format(67000, 5, ',', '.');
    // *     returns 8: '67.000,00000'
    // *     example 9: \php.number_format(0.9, 0);
    // *     returns 9: '1'
    // *    example 10: \php.number_format('1.20', 2);
    // *    returns 10: '1.20'
    // *    example 11: \php.number_format('1.20', 4);
    // *    returns 11: '1.2000'
    // *    example 12: \php.number_format('1.2000', 3);
    // *    returns 12: '1.200'
    var n = !isFinite(+number) ? 0 : +number, 
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
};

