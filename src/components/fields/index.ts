import {bindControl} from './CommonControl';
import {InputControl} from './InputControl';
import {AutocompleteControl} from './Autocomplete';
import {SelectControl} from './SelectControl';

export const InputField = bindControl(InputControl);

export const SelectField = bindControl(SelectControl);

export const AutocompleteField = bindControl(AutocompleteControl);
