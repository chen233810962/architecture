module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        copy: { // 1. 复制目录
            main: {
                files: [
                    {
                        expand: true,
                        cwd: './', // cwd指定路径，但不拷贝路径
                        src: ['modules/**'], // 拷贝路径
                        dest: 'build/'
                    },

                    {
                        expand: true,
                        cwd: './',
                        src: ['style/**'],
                        dest: 'build/'
                    },

                    {
                        expand: true,
                        cwd: './',
                        src: ['plugin/**'],
                        dest: 'build/'
                    },
                ]
            },

            html: {
                expand: true,
                cwd: 'view/',
                src: ['**'],
                dest: 'build/',
                options: {
                    process: function (content, srcpath) {
                        // TODO 过滤路径 ../.. -> ./
                        return content.replace(/\.\.\/style/g, 'style')
                            .replace(/\.\.\/images/g, './images')
                            .replace(/\.\.\/plugin/g, './plugin')
                            .replace(/\.\.\/modules/g, './modules')
                            .replace(/\.\.\/\.\.\/app/g, '.')
                            .replace(/\.\.\/js/g, './js');
                    },
                },
            },

            config: {
                expand: true,
                cwd: './',
                src: 'modules/config.js',
                dest: 'build/',
                options: {
                      process: function(content, srcpath) {
                          return content.replace(/\.\.\//g, './');
//                        return content.replace(/..\/html/g, '.').replace(/\.\.\/\.\./g, '.');
                      },
                },
            },
        },
        uglify: { // 2. 代码混淆
            options: {
            	mangle: false,
//              mangle: {
//                  except: ['$', 'Zepto', 'seajs', 'require', 'exports', 'module']
//              }
            },
            build: {
                files: [
                    {
                        expand: true,
                        cwd: 'build/',
                        src: 'modules/**/*.js',
                        dest: 'build/'
                    },
                    {
                        expand: true,
                        cwd: 'build/',
                        src: 'plugin/**/*.js',
                        dest: 'build/'
                    },
                    {
                        expand: true,
                        cwd: 'build/',
                        src: 'style/js/*.js',
                        dest: 'build/'
                    }
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,//清除HTML注释
			        collapseWhitespace: true,//压缩HTML
			        collapseBooleanAttributes: false,//省略布尔属性的值 <input checked="true"/> ==> <input />
			        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
			        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
			        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
			        minifyJS: true,//压缩页面JS
			        minifyCSS: true//压缩页面CSS
                },
                files: [
                    {expand: true, cwd: 'build/', src: '*.html', dest: 'build/'}
                ]
            }
        },
        cssmin: {
		  	minify: {
		  		files:[
		  				{
		  					expand: true,
						    cwd: 'build/',
						    src: 'style/css/*.css',
						    dest: 'build/'
				//		    ext: '.min.css'
		  				},
		  				{
		  					expand: true,
						    cwd: 'build/',
						    src: 'plugin/**/*.css',
						    dest: 'build/'
				//		    ext: '.min.css'
		  				}
		  			]
			  	}
		},
        zip: {
            'dist/<%= grunt.template.today("yyyymmddHHMMss") %>.zip': ['build/**'],
        },
        clean: {
            spm: ['build', 'dist']
        }
    });
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-zip');
    grunt.registerTask('default', ['clean','copy','htmlmin','cssmin','uglify','zip']);
};
