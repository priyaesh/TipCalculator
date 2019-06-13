(function(){
    "use strict";

    var semver = require("semver");
    //var jshint = require("simplebuild-jshint");

  
    console.log("\n\n Build ok");

    desc("default task");
         task("default",function(){
            console.log("default");
    });

    desc("version");    
        task("version",function(){
            console.log("checking node version:.");
    
            var packageJson = require("./package.json");
            var expectedVersion = "v"+packageJson.engines.node;
            var actualVersion = process.version;
           
            if(semver.neq(expectedVersion,actualVersion)){
                  fail("Incorrect node version : Expected"+expectedVersion +"but was actual"+actualVersion);
              }
    
    });

    desc("Run a localhost server");
        task("run", function(){
            jake.exec("node node_modules/http-server/bin/http-server "+ {interactive:true},complete);
            console.log("Run http-server");
        });

    desc("Lint javascript code");
        task("lint",function(){
            process.stdout.write("Linting JavaScript code:");
        
            jshint.checkFiles({
                files:["jakefile.js","src/**/*.js"],
                options: lintOption(),
                globals:lintGlobal(),
            },
                complete,fail);
                },{async:true});
        
        
            function lintOption(){
                return {
                    bitwise:true,
                    eqeqeq:true,
                    forin:true,
                    freeze:true,
                    futurehostile:true,
                    latedef:"nofunc",
                    noarg:true,
                    nocomma:true,
                    nonbsp:true,
                    nonew:true,
                    strict:true,
                    undef:true,
                    node:true,
                    browser:true
                };
                }
            
            function lintGlobal(){
                return {
                    jake:false,
                    desc:false,
                    task:false,
                    complete:false,
                    fail:false,
                    describe:false,
                    it:false,
                    before:false,
                    after:false,
                    beforeEach:false,
                    afterEach:false,
                    directory:false,
                    sinon:false
        
                    };
        }
        
        

}());