import { createElement } from 'preact';
import propTypes from 'prop-types';

import CategorySelector from './category-selector'

/** @typedef {import("preact").JSX.Element} JSXElement */

// Global counter used to create a unique id for each instance of a TagEditor
let tagEditorIdCounter = 0;

/**
 * @typedef TagEditorProps
 * @prop {(tag: string) => boolean} onAddTag - Callback to add a tag to the annotation
 * @prop {(tag: string) => boolean} onRemoveTag - Callback to remove a tag from the annotation
 */

/**
 * Component to edit annotation's tags.
 *
 * Component accessibility is modeled after "Combobox with Listbox Popup Examples" found here:
 * https://www.w3.org/TR/wai-aria-practices/examples/combobox/aria1.1pattern/listbox-combo.html
 *
 * @param {TagEditorProps} props
 */
function TagEditor({ 
  onAddTag,
  onRemoveTag,
}) {
  return (
    <CategorySelector onCheck={onAddTag} onUncheck={onRemoveTag} />
  );
}

TagEditor.propTypes = {
  onAddTag: propTypes.func.isRequired,
  onRemoveTag: propTypes.func.isRequired,
};

export default TagEditor;
