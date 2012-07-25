/**
 * JSON to XML plugin. Provides quick way to convert JSON object to XML
 * string. To some extent, allows control over XML output.
 * this plugin is released under both MIT & GPL licences.
 *
 * This class was rewrited by Thiago Mata to become more
 * independent of jquery.
 *
 * Still needs of prototype class definition.
 *
 * @version 1.0
 * @author Michal Korecki, www.michalkorecki.com
 * @author Thiago Henrique Ramos da Mata www.thiagomata.com
 * @see http://michalkorecki.com/content/introducing-json-xml-jquery-plugin
 */
var Json2Xml = Class.create();
Json2Xml.Static = new Object();
Json2Xml.prototype =
{
	formatOutput: true,

	formatTextNodes: false,

	indentString: '  ',

	rootTagName: 'root',

	ignore: [ 'tagName' ],

	replace: [],

	nodes: [],

	exceptions: [],

	htmlOutput: true,

	initialize: function initialize()
	{
	},

	isArray: function isArray( objElement )
	{
		return ( objElement instanceof Array );
	},

	convertToXml: function convertToXml( json )
	{
		var strXmlResult = this.recursiveConvertToXml(json, this.rootTagName, '', 0);
		if( this.htmlOutput )
		{
			strXmlResult = this.htmlFormat( strXmlResult );
		}
		return strXmlResult;
	},

	htmlFormat: function htmlFormat( strXml )
	{
		return strXml.replace( /\</gi , '&lt;' ).
					  replace( /\>/gi , '&gt;' ).
					  replace( /\n/gi , '<br/>\n' ).
					  replace( /\ /gi , '&nbsp;' );
	},

	IsNumeric: function IsNumeric(input)
	{
	   return (input - 0) == input && input.length > 0;
	},

	getPropertyName: function getPropertyName(parentPath, name , element , parentTag ) {
		var index = this.replace.length;
		var searchName = parentPath + name;
		while (index--) {
			// settings.replace array consists of {original : replacement}
			// objects
			if (this.replace[index].hasOwnProperty(searchName)) {
				return this.replace[index][searchName];
			}
		}
		return name;
	},

	getIndent: function getIndent( depth )
	{
		var output = '';
		for (var i = 0; i < depth; i++) {
			output += this.indentString;
		}
		return output;
	},

	recursiveConvertToXml: function recursiveConvertToXml(json, tagName, parentPath, depth)
	{
		var suffix = (this.formatOutput) ? '\r\n' : '';
		var indent = (this.formatOutput) ? this.getIndent(depth) : '';
		var xmlTag = indent + '<' + tagName;
		var children = '';

		for (var key in json) {
			if (json.hasOwnProperty(key)) {
				var propertyPath = parentPath + key;
				var propertyName = this.getPropertyName(parentPath, key , json[key] );
				// element not in ignore array, process
				if ( this.ignore.indexOf( key ) == -1) {
					// array, create new child element
					if (this.isArray(json[key])) {
						var objArray = json[key];
						for( var j = 0; j < objArray.length; ++j )
						{
							var element = objArray[ j ];
							children += this.recursiveConvertToXml(
								element, propertyName , propertyPath + '.', depth + 1 , json[key] );
						}
					}
					// object, new child element aswell
					else if (typeof(json[key]) === 'object') {
						children += this.recursiveConvertToXml(json[key], propertyName,
								propertyPath + '.', depth + 1 , json[key] );
					}
					// primitive value property as attribute
					else {
						// unless it's explicitly defined it should be node
						if (this.nodes.indexOf( propertyPath ) != -1) {
							children += createTextNode(propertyName, json[key],
									depth, json[key], tagName);
						}
						else {
							xmlTag += ' ' + propertyName + '="' +  json[key] + '"';
						}
					}
				}
			}
		}
		// close tag properly
		if (children !== '') {
			xmlTag += '>' + suffix + children + indent + '</' + tagName + '>' + suffix;
		}
		else {
			xmlTag += '/>' + suffix;
		}
		return xmlTag;
	}
}