
module.exports = function(grunt){	
	grunt.initConfig({
		watch:{
			jade:{
				files:['views/**'],
				options:{
					livereload:true}
				}
			},
			js:{
				files:['bower_components/**','models/**/*.js','schames/**/*.js'],
				//tasks:['jshint'],//语法检查
				options:{
					livereload:true//当文件改动会重新启动
				}
			}
		},
		nodemon:{
			dev:{
				options:{
					file:'app.js',
					args:[],
					ignoredFiles:['README.md','node_modules/**','.DS_Store'],
					watchedExtensions:['js'],
					watchedFolders:['app','config'],
					debug:true,
					delayTime:1,
					env:{
						PORT:3000
					},
					cwd:_dirname
				}
			}
		},
		mochaTest:{
			options:{
				reporter:'spec'
			},
			src:['test/**/*.js']
		},
		concurrent:{
			tasks:['nodemon','watch'],
			options:{
				logConcurrentOutput:true
			}
		}
	})
	grunt.loadNpmTasks('grunt-contrib-watch');
	//只要有文件添加修改便会重写执行注册好的任务
	grunt.loadNpmTasks('grunt-nodemon');
	//grunt-nodemon用于实时监听app.js
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-mocha-test')
	grunt.option('force',true);
	//不会应为警告或错误而中断整个项目
	grunt.registerTask('default',['concurrent']);
	grunt.registerTask('test',['mochaTest']);
}