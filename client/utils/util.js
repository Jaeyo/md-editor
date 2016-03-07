exports.init = function() {
	Object.sortedForEach = function(obj, callback) {
		var keyArr = []
		Object.keys(obj).forEach(function(key) {
			keyArr.push(key)
		})

		keyArr.sort()

		keyArr.forEach(function(key) {
			var value = obj[key]
			callback(key, value)
		}.bind(this))
	}

	String.contains = function(src, target) {
		return src.indexOf(target) != -1
	}

	String.containsIgnoreCase = function(src, target) {
		return src.toLowerCase().indexOf(target.toLowerCase()) != -1
	}

	String.startsWith = function(src, word) {
		return src.indexOf(word) === 0
	}

	String.endsWith = function(src, word) {
		return src.indexOf(word, src.length - word.length) !== -1
	}

	Array.contains = function(arr, item) {
		return arr.indexOf(item) !== -1
	}

	Array.containsIgnoreCase = function(arr, strItem) {
		var arrClone = JSON.parse(JSON.stringify(arr))
		for(var i=0; i<arr.length; i++)
			arrClone[i] = arrClone[i].toLowerCase()
		return arrClone.indexOf(strItem.toLowerCase()) !== -1
	}

	Array.prototype.remove = require('array-remove-by-value')

	window.onerror = function(errMsg, url, lineNumber, column, errorObj) {
		if(errorObj && errorObj.stack) console.error(errorObj.stack)
	}

	Object.equals = function( x, y ) {
		 if ( x === y ) return true
		 if ( ! ( x instanceof Object ) || ! ( y instanceof Object ) ) return false
		 if ( x.constructor !== y.constructor ) return false

		 for ( var p in x ) {
		 	if ( ! x.hasOwnProperty( p ) ) continue
		 	if ( ! y.hasOwnProperty( p ) ) return false
		 	if ( x[ p ] === y[ p ] ) continue
		 	if ( typeof( x[ p ] ) !== "object" ) return false
		 	if ( ! Object.equals( x[ p ],  y[ p ] ) ) return false
		 }

		for ( p in y ) {
			if ( y.hasOwnProperty( p ) && ! x.hasOwnProperty( p ) ) return false
		}
		return true
	}

	Object.renameProperty = function(obj, oldName, newName) {
		if(oldName === newName) return false
		if(obj.hasOwnProperty(oldName)) {
			obj[newName] = obj[oldName]
			delete obj[oldName]
			return true
		}
		return false
	}
}