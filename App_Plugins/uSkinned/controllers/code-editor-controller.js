// Author: uSkinned
// License: uSkinned Commercial License (https://uSkinned.net/license)

angular.module("umbraco").controller("USN.CodeEditor.Controller", function ($scope, assetsService) {
	var vm = this;
	assetsService.loadCss("lib/ace-razor-mode/theme/razor_chrome.css");

	//setup the default config
	var config = {
		items: [],
		multiple: false
	};

	//map the user config
	angular.extend(config, $scope.model.config);

	vm.aceOption = {
		mode: $scope.model.config.editorType.type,
		theme: "chrome",
		showPrintMargin: false,
		advanced: {
			fontSize: '14px',
			enableSnippets: false,
			enableBasicAutocompletion: true,
			enableLiveAutocompletion: false
		}
	}
});