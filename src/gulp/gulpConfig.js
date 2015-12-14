module.exports = {
	
	base : {
		'root' 	: './',
		'src'		:	'./app/src/',
		'public': './public/'
	},
	
	js : {
		sources : ['./src/**/*.js', '!./src/app/appBundle.js']
	},
	
	css  :{
		sources : ['./src/app/index.scss'],
		dest		: {
			filename 	: 'style.css',
			dir				: './src/app/'
		}		
	},
	
	jspm : {
		main : './src/app/main.jsx!',
		dest : './public/js/appBundle.js'	
	}
	
};