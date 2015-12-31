module.exports = {
	
	base : {
		'root' 	: './',
		'public': './public/'
	},
	
	css  :{
		sources : ['./src/appMixed/index.scss'],
		dest		: {
			filename 	: 'style.css',
			dir				: './src/appMixed/'
		}		
	},
	
	jspm : {
		main : './src/appMixed/main.jsx!',
		dest : './public/js/appBundle.js'	
	}
	
};