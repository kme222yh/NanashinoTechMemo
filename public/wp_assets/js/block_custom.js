(function () {
    var el = wp.element.createElement,
        blocks = wp.blocks,
        blockEditor = wp.blockEditor,
        RichText = blockEditor.RichText;

    blocks.registerBlockType('my-plugin/subheading', {
        apiVersion: 3,
        title: '小見出し',
        icon: 'wordpress-alt',
        category: 'text',
        attributes: {
            content: {
                type: 'string',
                source: 'html',
                selector: 'p',
            },
        },
        edit: function (props) {
            var blockProps = blockEditor.useBlockProps({
                className: 'subheading',
                style: {
                    borderLeft: '3px double black',
                    paddingLeft: '20px',
                },
            });
            return el(
                RichText,
                Object.assign({}, blockProps, {
                    tagName: 'div',
                    value: props.attributes.content,
                    onChange: function (changedContent) {
                        props.setAttributes({ content: changedContent });
                    },
                })
            );
        },
        // Keep the saved markup unchanged so that existing posts stay valid.
        save: function (props) {
            return el(RichText.Content, {
                tagName: 'p',
                className: 'subheading',
                value: props.attributes.content,
            });
        },
    });
})();
