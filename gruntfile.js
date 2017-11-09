const webpackConfig = require('./webpack.config');

module.exports = function(grunt) {
	grunt.loadNpmTasks("grunt-webpack");
	grunt.loadNpmTasks('grunt-sass');

	grunt.initConfig({
		webpack: {
			options: {},
			build: webpackConfig
		},
		sass: {
			dist: {
				options: {
					sourceMap: true,
					outputStyle: 'compressed'
				},
				src: 'view/styles/main.scss',
				dest: 'public/style.min.css',
			}
		}
	});

	grunt.registerTask('default', ['sass', 'webpack']);
}