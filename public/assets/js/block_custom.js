(function () {
    var el = wp.element.createElement,
        blocks = wp.blocks,
        RichText = wp.editor.RichText;

    blocks.registerBlockType('my-plugin/point', {
        title: 'ポイント',
        icon: 'wordpress-alt',
        category: 'common',
        attributes: {
            content: {
                type: 'string',
                source: 'html',
                selector: 'p',
            },
        },
        edit: function (props) {
            var nowContent = props.attributes.content;
            return el(
                RichText,
                {
                    tagName: 'div',
                    className: "point",
                    style: {
                        borderLeft: '3px solid black',
                        paddingLeft: '20px',
                    },
                    value: nowContent,
                    onChange: function (changedContent) {
                        props.setAttributes({ content: changedContent });
                    },
                }
            );
        },
        save: function (props) {
            return el(RichText.Content, {
                tagName: 'p',
                className: "point",
                value: props.attributes.content,
            });
        },
    });
})();
