import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'

export const StyledBulletList = BulletList.extend({
  addAttributes() {
    return {
      style: {
        default: 'disc',
        parseHTML: element => element.style.listStyleType || 'disc',
        renderHTML: attributes => ({
          style: `list-style-type: ${attributes.style}`
        }),
      },
    }
  },
})

export const StyledOrderedList = OrderedList.extend({
  addAttributes() {
    return {
      style: {
        default: 'decimal',
        parseHTML: element => element.style.listStyleType || 'decimal',
        renderHTML: attributes => ({
          style: `list-style-type: ${attributes.style}`
        }),
      },
    }
  },
})
