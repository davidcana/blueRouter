module.exports = function(grunt) {
    
    grunt.initConfig({
        pkg: grunt.file.readJSON( 'package.json' ),
        browserify: {
            sample: {
                options: {
                    browserifyOptions: {
                        debug: true
                    }
                },
                files: {
                    'build/sample.min.js': [
                        'src/blueRouter.js', 
                        'src/router.js', 
                        'samples/sample.js'
                    ]
                },
            }
        },
        qunit: {
            browser: {
                options: {
                    timeout: 60000,
                    urls: [
                        'http://localhost:9000/test/blueRouter-core.html'
                    ]
                }
            }
        },
        compress: {
            main: {
                options: {
                    archive: 'dist/<%= pkg.name %>-js_<%= grunt.template.today("yyyy-mm-dd_HHMM") %>.tar.gz',
                    pretty: true
                },
                expand: true,
                files: [
                    {
                        cwd: 'docs/',
                        expand: true,
                        src: ['**/*', '!**/*~'],
                        dest: 'docs'
                    },
                    {
                        cwd: 'externs/',
                        expand: true,
                        src: ['**/*', '!**/*~'],
                        dest: 'externs'
                    },
                    {
                        cwd: 'samples/',
                        expand: true,
                        src: ['**/*', '!**/*~'],
                        dest: 'samples'
                    },
                    {
                        cwd: 'src/',
                        expand: true,
                        src: ['**/*', '!**/*~'],
                        dest: 'src'
                    },
                    {
                        cwd: 'test/',
                        expand: true,
                        src: ['**/*', '!**/*~'],
                        dest: 'test'
                    }, 
                    {
                        src: ['changes.txt']
                    },
                    {
                        src: ['Gruntfile.js']
                    }, 
                    {
                        src: ['LICENSE']
                    },
                    {
                        src: ['package.json']
                    },
                    {
                        src: ['package-lock.json']
                    },
                    {
                        src: ['README.md']
                    }
                ]
            },
            'blueRouter-core': {
                options: {
                    archive: 'build/blueRouter-core.min.js.tar.gz'
                },
                files: [
                    {
                        src: [ 'build/blueRouter-core.min.js' ]
                    }
                ]
            }
        },
        concat: {
            options: {
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd HH:M:s") %> */\n'
            },
            sample: {
                src: [
                    'src/blueRouter.js', 
                    'src/router.js', 
                    'samples/sample.js',
                    'src/export.js'
                ],
                dest: 'build/sample.concat.js',
                nonull: true
            }
        },
        uglify: {
            core: {
                files: {
                    'build/blueRouter-core.min.js': [ 'build/blueRouter-core.js' ]
                }
            },
            gcc: {
                files: {
                    'build/blueRouter-gcc.min.js': [ 'build/blueRouter-gcc.js' ]
                }
            }
        },
        copy: {
            srcToBuild: {
                src: 'src/*',
                dest: 'build/'
            },
            sampleToBuild: {
                src: 'samples/*.js',
                dest: 'build/'
            },
        },
        'closure-compiler': {
            sample: {
                options: {
                    js: [
                        'src/blueRouter.js', 
                        'src/router.js', 
                        'samples/sample.js'
                    ],
                    js_output_file: 'build/sample.gcc.js',
                    compilation_level: 'ADVANCED',
                    create_source_map: 'build/sample.gcc.js.map',
                    warning_level: 'VERBOSE',
                    output_wrapper: '(function(){\n%output%\n}).call(this)\n//# sourceMappingURL=sample.gcc.js.map',
                    debug: true
                }
            }
        },
        exec: {
            check_node: 'node samples/src/app/node.js'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-browserify')
    grunt.loadNpmTasks('grunt-exec');
    
    require('google-closure-compiler').grunt(grunt, {
        platform: ['native', 'java', 'javascript'],
        max_parallel_compilations: require('os').cpus().length
    });
    // The load-grunt-tasks plugin won’t automatically load closure-compiler

    grunt.registerTask('test', ['qunit']);
    grunt.registerTask('default', [
        'closure-compiler:sample',
        'concat:sample',
        'copy:srcToBuild',
        'copy:sampleToBuild'
    ]);
    grunt.registerTask('all', ['default', 'buildTests', 'test']);
};
