module.exports = {
	
	base : {
		'root' 	: './',
		'public': './public/'
	},
	
  jsHint : {
    sources : './src/appMixed/**/*.jsx'
  },
  
	css  :{
		sources : ['./src/appMixed/style/index.scss'],
		dest		: {
			filename 	: 'style.css',
			dir				: './src/appMixed/style/'
		}		
	},
	
	jspm : {
		main : './src/appMixed/main.jsx!',
		dest : './public/js/appBundle.js'	
	}
	
};