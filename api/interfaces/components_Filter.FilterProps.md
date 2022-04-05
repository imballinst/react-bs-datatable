[react-bs-datatable](../README.md) / [components/Filter](../modules/components_Filter.md) / FilterProps

# Interface: FilterProps

[components/Filter](../modules/components_Filter.md).FilterProps

This is an interface for `Filter` component props.

## Table of contents

### Properties

- [classes](components_Filter.FilterProps.md#classes)
- [controlledProps](components_Filter.FilterProps.md#controlledprops)
- [placeholder](components_Filter.FilterProps.md#placeholder)

## Properties

### classes

• `Optional` **classes**: [`FilterClasses`](components_Filter.FilterClasses.md)

Custom classes for the component.

#### Defined in

[components/Filter.tsx:33](https://github.com/imballinst/react-bs-datatable/blob/8a8b804/src/components/Filter.tsx#L33)

___

### controlledProps

• `Optional` **controlledProps**: `Object`

Props to make the component controlled.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `filter?` | `string` | The text filter. |
| `onFilter?` | [`FilterOnChange`](../modules/helpers_types.md#filteronchange) | The function fired when the text filter changes. |

#### Defined in

[components/Filter.tsx:35](https://github.com/imballinst/react-bs-datatable/blob/8a8b804/src/components/Filter.tsx#L35)

___

### placeholder

• `Optional` **placeholder**: `string`

Customize the string for the text filter placeholder.
By default, the text is "Enter text...".

#### Defined in

[components/Filter.tsx:31](https://github.com/imballinst/react-bs-datatable/blob/8a8b804/src/components/Filter.tsx#L31)
