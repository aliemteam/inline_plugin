(function() {
    tinymce.PluginManager.add('inline_tinymce_plugin', function( editor, url ) {
      editor.addButton( 'inline_tinymce_button', {
        title: 'Click to add in-line text',
        text: 'Add In-line',
        icon: false,
        onclick: function() {
          var text = editor.selection.getContent({
        		'format': 'html'
        	});
          if ( text.length === 0 ) {
        		alert( 'Please highlight some text before adding in-line.' );
        		return;
        	}
          editor.windowManager.open({
            title: 'In-line Commentary',
            body: [
            {
              type: 'textbox',
              name: 'EPR',
              label: 'Name of Reviewer:'
            },
            {
              type: 'textbox',
              name: 'inline',
              label: 'Commentary:'
            }],
            onsubmit: function(e) {
              editor.execCommand('mceReplaceContent', false, '<span class="inline" data-EPR="' + e.data.EPR + '" data-inline="' + e.data.inline + '">' + text + '</span>');
              }
            });
          }
        });
      });
   })();
