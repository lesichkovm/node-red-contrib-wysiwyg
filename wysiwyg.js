export default function (RED) {
  class Wysiwyg {
    constructor(config) {
      RED.nodes.createNode(this, config)

      var node = this
      this.guid = '3bb14aee7d684e4ab56c32fa29649077'
      this.text = config.text
      this.field = config.field || 'payload'
      this.fieldType = config.fieldType || 'msg'

      node.on('close', (done) => {
        // node.warn('ON CLOSE')
        node.done()
      })

      node.on('input', (msg, send, done) => {
        // node.warn('ON INPUT')
        // node.warn('Field Type: ' + node.fieldType)
        // node.warn('Field: ' + node.field)
        // node.warn('Text: ' + node.text)
        if (node.fieldType === 'msg') {
          RED.util.setMessageProperty(msg, node.field, node.text)
          send(msg)
          done()
        } else if (node.fieldType === 'flow' || node.fieldType === 'global') {
          var context = RED.util.parseContextStore(node.field)
          var target = node.context()[node.fieldType]
          target.set(context.key, node.text, context.store, function (err) {
            if (err) {
              done(err)
            } else {
              send(msg)
              done()
            }
          })
        } else {
          // should never reach here
          msg.payload = node.text
          send(msg)
          done()
        }
      })

      node.on('send', (msg) => {
        // node.warn('ON SEND')
        msg.payload = text
        node.send(msg)
      })
    }
  }

  RED.nodes.registerType('wysiwyg', Wysiwyg, {
    settings: {},
    defaults: {
      name: { value: '' },
      text: { value: '' },
      field: { value: 'payload' },
      fieldType: { value: 'msg' }
    },
    label: function() {
      return this.name || 'wysiwyg';
    },
    oneditprepare: function() {
      // This ensures the name field is properly initialized
      $('#node-input-name').val(this.name || '');
    }
  })
}
