module.exports = function (grunt) {
    grunt.registerTask('stage_checklist', [], function () {

        var pkg = grunt.file.readJSON('package.json');

        if (pkg.debug == true) {
            grunt.log.warn('"debug" in package.js is set to true, do not deploy to live with this setting!');
        }


        propertiesToCheck = [
            {
                value:         pkg.project_number,
                invalidValues: ['', '0000'],
                errMessage:    '"project_number" in package.json not set!'
            },
            {
                value:         pkg.cpsId,
                invalidValues: ['', '--REPLACEME--'],
                errMessage:    '"cpsId" in package.json not set, istats will not work properly!'
            },
            {
                value:         pkg.istatsName,
                invalidValues: ['', '--REPLACEME--'],
                errMessage:    '"istatsName" in package.json not set, istats will not work properly!'
            },
            {
                value:         pkg.storyPageUrl,
                invalidValues: ['', '--REPLACEME--'],
                errMessage:    '"storyPageUrl" in package.json not set, istats will not work properly!'
            }
        ];

        propertiesToCheck.forEach(function (property) {
            checkProperty(
                property.value,
                property.invalidValues,
                property.errMessage
            );
        });

        function checkProperty(value, invalidValues, errMessage) {
            if (valueIsInvalid(value, invalidValues)) {
                grunt.log.warn(errMessage);
            }
        }
        function valueIsInvalid(value, invalidValues) {
            return invalidValues.indexOf(value) > -1;
        }
    });
}