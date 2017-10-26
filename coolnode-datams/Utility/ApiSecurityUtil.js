var crypto = require('crypto');
exports.getApiCode = (params,key) => {
	return generateCode(params,key);
}

exports.checkApiCode = (params, key,code) => {
	var newcode = generateCode(params,key);
	return newcode == code;
}

function generateCode(params,key) {
	var arr = new Array();
	for(var i in params) {
		if(i.toLowerCase() != "code"&&i.toLowerCase() != "key") {
			arr.push({
				key: i,
				value: params[i]
			});
		}
	}

	arr = sortByKey(arr, 'key');
	var str="key="+key;
	for(var n in arr) {
		str += "&" + arr[n].key + "=" + arr[n].value;
	}

	console.log(str);
	str = md5(str);
	console.log(str);
	return str;
}

function sortByKey(array, key) {
	return array.sort(function(a, b) {
		var x = a[key];
		var y = b[key];
		return((x < y) ? -1 : ((x > y) ? 1 : 0));
	});
}

function md5(str) {
	var md5sum = crypto.createHash('md5');
	md5sum.update(str);
	str = md5sum.digest('hex');
	return str;
};