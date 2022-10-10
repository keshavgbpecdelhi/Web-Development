angular.module('app', ['hc.marked'])

angular.module('app').config(function(markedProvider) {
    markedProvider.setOptions({
        gfm: true,
        tables: true,
        highlight: function(code) {
            return hljs.highlightAuto(code).value;
        }
    });
})

angular.module('app').controller('ctrl', function($scope) {
    $scope.my_markdown = '# MDown Editor\n\n> GitHub Flavored Markdown Editor\n\n# Built with\n- **[marked](https://github.com/chjj/marked)** for Parsing Markdown\n- **[angular-marked](https://github.com/Hypercubed/angular-marked)** for easier usage of *marked*\n- **[highlight-js](https://github.com/isagalaev/highlight.js)** for code highlighting\n- **[github-markdown-css](https://github.com/sindresorhus/github-markdown-css)** for beautifying markdown output\n- **[highlight-js css](https://github.com/isagalaev/highlight.js/tree/master/src/styles)** for beautifying code output\n\n# Examples\n* Javascript\n\n```javascript\nfunction() {	\n  console.log("Hello There! Start Playing Around");\n}\n```\n\n* Bash\n\n```bash\n# step 1\nnpm install\n```\n# How to Use\n- Clear the all codes on the left panel\n- Write some markdown codes there\n- Enjoy!'

    //     Tab Support for Text-area
    function enableTab(id) {
        var el = document.getElementById(id);
        el.onkeydown = function(e) {
            if (e.keyCode === 9) {
                var val = this.value,
                    start = this.selectionStart,
                    end = this.selectionEnd;
                this.value = val.substring(0, start) + '\t' + val.substring(end);

                this.selectionStart = this.selectionEnd = start + 1;

                return false;

            }
        };
    };
    enableTab('txt')
})
