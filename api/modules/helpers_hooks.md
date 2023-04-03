[react-bs-datatable](../README.md) / helpers/hooks

# Module: helpers/hooks

## Table of contents

### Interfaces

- [useCreateCheckboxHandlersParameter](../interfaces/helpers_hooks.useCreateCheckboxHandlersParameter.md)

### Functions

- [useControlledStateSetter](helpers_hooks.md#usecontrolledstatesetter)
- [useCreateCheckboxHandlers](helpers_hooks.md#usecreatecheckboxhandlers)

## Functions

### useControlledStateSetter

▸ **useControlledStateSetter**<`ControlledPropsType`\>(`controlledProps`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ControlledPropsType` | extends `object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `controlledProps` | `undefined` \| `ControlledPropsType` |

#### Returns

`void`

#### Defined in

[helpers/hooks.ts:6](https://github.com/imballinst/react-bs-datatable/blob/master/src/helpers/hooks.ts#L6)

___

### useCreateCheckboxHandlers

▸ **useCreateCheckboxHandlers**(`param?`): `Object`

A hook containing functions to create table checkbox event handlers.
As library users, most likely you'll most likely be using `createBulkCheckboxClickHandler`. Example usage:

```
const { createBulkCheckboxClickHandler } = useCreateCheckboxHandlers();
const onClick = createBulkCheckboxClickHandler('add', {
  checkboxProp: 'checkbox',
  idProp: 'name'
})

<button onClick={onClick}>Add all to selection</button>
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `param?` | [`useCreateCheckboxHandlersParameter`](../interfaces/helpers_hooks.useCreateCheckboxHandlersParameter.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `createBulkCheckboxClickHandler` | (`type?`: ``"add"`` \| ``"remove"``, `checkboxInfo?`: { `checkboxProp`: `string` ; `idProp`: `string`  }, `checkboxStateOverrider?`: (`prev`: [`CheckboxState`](../interfaces/helpers_types.CheckboxState.md)) => [`CheckboxState`](../interfaces/helpers_types.CheckboxState.md)) => (`event`: `MouseEvent`<`HTMLElement`, `MouseEvent`\>) => `void` |
| `createColumnCheckboxClickHandler` | (`__namedParameters`: { `checkboxProp`: `string` ; `idProp`: `string` ; `rowIdx`: `number`  }) => (`event`: `ChangeEvent`<`HTMLInputElement`\>) => `void` |
| `createHeaderCheckboxClickHandler` | (`__namedParameters`: { `checkboxProp`: `string` ; `idProp`: `string`  }) => (`event`: `ChangeEvent`<`HTMLInputElement`\>) => `void` |

#### Defined in

[helpers/hooks.ts:44](https://github.com/imballinst/react-bs-datatable/blob/master/src/helpers/hooks.ts#L44)
