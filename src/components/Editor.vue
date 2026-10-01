<template>
    <div class="editor-container">
        <div class="editor-menu mb-2 d-flex flex-wrap gap-0 ">

            <!-- Undo / Redo -->
            <button class="btn btn-light gap-2 d-flex align-items-center"
                @click="editor.chain().focus().undo().run()"><i class="mdi-undo mdi fs-4"></i> </button>
            <button class="btn btn-light gap-2 d-flex align-items-center"
                @click="editor.chain().focus().redo().run()"><i class="mdi-redo mdi fs-4"></i> </button>

            <!-- Formatting -->
            <button class="btn btn-light" :class="{ active: editor.isActive('bold') }"
                @click="editor.chain().focus().toggleBold().run()"><i class="mdi mdi-format-bold fs-4"></i></button>

            <button class="btn btn-light" :class="{ active: editor.isActive('italic') }"
                @click="editor.chain().focus().toggleItalic().run()"><i class="mdi-format-italic fs-4 mdi"></i></button>

            <button class="btn btn-light" :class="{ active: editor.isActive('underline') }"
                @click="editor.chain().focus().toggleUnderline().run()"><i
                    class="mdi-format-underline mdi fs-4"></i></button>

            <button class="btn btn-light" :class="{ active: editor.isActive('strike') }"
                @click="editor.chain().focus().toggleStrike().run()"><i
                    class="mdi mdi-format-strikethrough-variant fs-4"></i></button>

            <!-- Headings -->
            <button class="btn btn-light" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()">H2</button>

            <button class="btn btn-light" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()">H3</button>

            <!-- Other Tools -->
            <button class="btn btn-light" @click="editor.chain().focus().toggleBlockquote().run()">“ Quote</button>
            <button class="btn btn-light" @click="editor.chain().focus().setHorizontalRule().run()">— HR</button>
            <button class="btn btn-light" @click="editor.chain().focus().toggleCodeBlock().run()">{ }</button>

            <!-- List Style Dropdown -->
            <div class="dropdown">
                <button class="btn btn-light dropdown-toggle d-flex align-items-center gap-2" type="button"
                    data-bs-toggle="dropdown">
                    <i class="mdi mdi-format-list-bulleted-type fs-4 "></i><i class="mdi mdi-chevron-down"></i>
                </button>

                <ul class="dropdown-menu">
                    <li><a class="dropdown-item d-flex align-items-center gap-3" @click="setBulletStyle('disc')"><span
                                class="fw-bold fs-2">•</span> Disc</a></li>
                    <li><a class="dropdown-item d-flex align-items-center gap-3" @click="setBulletStyle('circle')"><span
                                class="fw-bold fs-2">○</span> Circle</a></li>
                    <li><a class="dropdown-item d-flex align-items-center gap-3" @click="setBulletStyle('square')"><span
                                class="fw-bold fs-2">▪</span> Square</a></li>

                </ul>
            </div>

            <!-- Number List style -->
            <div class="dropdown">
                <button class="btn btn-light dropdown-toggle d-flex align-items-center gap-2" type="button"
                    data-bs-toggle="dropdown">
                    <i class="mdi mdi-format-list-numbered fs-4 "></i><i class="mdi mdi-chevron-down"></i>
                </button>

                <ul class="dropdown-menu">
                    <li><a class="dropdown-item d-flex align-items-center gap-3" @click="setOrderedStyle('decimal')"><i
                                class="mdi mdi-format-list-numbered fs-4 "></i> Decimal</a></li>
                    <li><a class="dropdown-item d-flex align-items-center gap-3"
                            @click="setOrderedStyle('lower-alpha')"><i class="mdi mdi-alphabetical fs-4 "></i> Lower
                            Alpha</a></li>
                    <li><a class="dropdown-item d-flex align-items-center gap-3"
                            @click="setOrderedStyle('lower-roman')"><i class="mdi mdi-roman-numeral-4 fs-4 "></i>
                            Roman</a></li>
                </ul>
            </div>

            <!-- table options -->

            <div class="dropdown">
                <button class="btn btn-light dropdown-toggle d-flex align-items-center gap-2" type="button"
                    data-bs-toggle="dropdown">
                    <i class="mdi mdi-table-large fs-4 "></i> Table Options <i class="mdi mdi-chevron-down"></i>
                </button>

                <ul class="dropdown-menu ">
                    <li><a class="dropdown-item d-flex align-items-center gap-3" @click="insertTable"><i
                                class="mdi mdi-table-large-plus fs-4 "></i> Insert Table</a></li>
                    <li><a class="dropdown-item d-flex align-items-center gap-3"
                            @click="editor.chain().focus().addRowBefore().run()"><i
                                class="mdi mdi-table-row-plus-before fs-4 "></i>Insert Row Above</a></li>
                    <li><a class="dropdown-item d-flex align-items-center gap-3"
                            @click="editor.chain().focus().addRowAfter().run()"><i
                                class="mdi mdi-table-row-plus-after fs-4 "></i>Insert Row Below</a></li>
                    <li><a class="dropdown-item d-flex align-items-center gap-3"
                            @click="editor.chain().focus().addColumnBefore().run()"><i
                                class="mdi mdi-table-column-plus-before fs-4 "></i>Insert Column Left</a></li>
                    <li><a class="dropdown-item d-flex align-items-center gap-3"
                            @click="editor.chain().focus().addColumnAfter().run()"><i
                                class="mdi mdi-table-column-plus-after fs-4 "></i>Insert Column Right</a></li>
                    <li>
                        <hr class="dropdown-divider" />
                    </li>
                    <li><a class="dropdown-item d-flex align-items-center gap-3"
                            @click="editor.chain().focus().deleteTable().run()"><i
                                class="mdi mdi-table-large-remove fs-4 "></i> Delete Table</a></li>
                    <li><a class="dropdown-item d-flex align-items-center gap-3"
                            @click="editor.chain().focus().deleteColumn().run()"><i
                                class="mdi mdi-table-column-remove fs-4 "></i> Delete Column</a></li>
                    <li><a class="dropdown-item d-flex align-items-center gap-3"
                            @click="editor.chain().focus().deleteRow().run()"><i
                                class="mdi mdi-table-row-remove fs-4 "></i>Delete Row</a></li>
                </ul>
            </div>
            



        </div>

        <EditorContent :editor="editor" class="editor-content p-3" :placeholder="placeholder" />
    </div>
</template>

<script setup>
import { onBeforeUnmount, watch } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

import Underline from '@tiptap/extension-underline'
import Heading from '@tiptap/extension-heading'
import ListItem from '@tiptap/extension-list-item'
import Blockquote from '@tiptap/extension-blockquote'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import CodeBlock from '@tiptap/extension-code-block'
import Placeholder from '@tiptap/extension-placeholder'

/* TABLE EXTENSIONS */
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableHeader } from '@tiptap/extension-table-header'
import { TableCell as BaseTableCell } from '@tiptap/extension-table-cell'


/* EXTENDED TABLE CELL (required for styling) */
const TableCell = BaseTableCell.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            style: { default: null },
        }
    },
})

/* CUSTOM LIST STYLES */
import { StyledBulletList, StyledOrderedList } from './Editor.ListStyle'


/* Props */
const props = defineProps({
    modelValue: String,
    placeholder: {
        type: String,
        default: 'Start typing...'
    }
})

const emit = defineEmits(['update:modelValue'])


/* EDITOR INSTANCE */
const editor = new Editor({
    extensions: [
        StarterKit.configure({
            heading: false,
            table: false,   // IMPORTANT: disable StarterKit table to avoid conflicts
        }),

        Underline,

        Heading.configure({ levels: [2, 3] }),

        StyledBulletList,
        StyledOrderedList,
        ListItem,

        Blockquote,
        HorizontalRule,
        CodeBlock,

        Placeholder.configure({
            placeholder: props.placeholder,
            showOnlyWhenEditable: true,
        }),

        /* TABLE EXTENSIONS IN CORRECT ORDER */
        TableCell,
        TableHeader,
        TableRow,
        Table.configure({ resizable: true }),
    ],

    content: props.modelValue,

    onUpdate: ({ editor }) => {
        emit('update:modelValue', editor.getHTML())
    }
})

/* TABLE INSERT (fixes chain bug) */
const insertTable = () => {
    editor.commands.insertTable({
        rows: 3,
        cols: 3,
        withHeaderRow: true,
    })
}

/* LIST STYLE FUNCTIONS */
const setBulletStyle = (style) => {
    editor.chain().focus().toggleBulletList().updateAttributes('bulletList', { style }).run()
}

const setOrderedStyle = (style) => {
    editor.chain().focus().toggleOrderedList().updateAttributes('orderedList', { style }).run()
}

/* SYNC external model */
watch(() => props.modelValue, (value) => {
    if (value !== editor.getHTML()) {
        editor.commands.setContent(value)
    }
})

onBeforeUnmount(() => editor.destroy())
</script>

<style>
.editor-container {
    border: 1px solid #ededed;
    border-radius: 0px;
    padding: 0px;
}

.editor-container .editor-menu {
    background: #eff2f7;

}

.editor-menu .btn {
    padding: 4px 12px;
    border-radius: 0px;
    font-weight: 600;
    font-size: 0.85rem;
    border: 0px;
}

.btn.active {
    background-color: #343a40 !important;
    color: #fff !important;
}

.editor-content {
    min-height: 220px;
    padding: 10px;
}

/* Remove default focus border */
.ProseMirror {
    outline: none !important;
}

/* Placeholder */
.ProseMirror p.is-editor-empty:first-child::before {
    content: attr(data-placeholder);
    color: #9b9b9b;
    float: left;
    height: 0;
    pointer-events: none;
}

/* Dropdown style */
.dropdown-menu .dropdown-item {
    cursor: pointer;
    font-size: 0.9rem;
}

/* TABLE STYLING */
.ProseMirror table {
    border-collapse: collapse !important;
    table-layout: fixed;
    width: 100%;
}

.ProseMirror th,
.ProseMirror td {
    border: 1px solid #ccc;
    padding: 6px;
    vertical-align: top;
}

.ProseMirror th {
    background: #f5f5f5;
    font-weight: 600;
}

.ProseMirror .selectedCell {
    background: rgba(0, 150, 255, 0.15);
}
</style>
