# React Bootstrap Datatable

[![Build Status](https://travis-ci.org/Imballinst/react-bs-datatable.svg?branch=master)](https://travis-ci.org/Imballinst/react-bs-datatable)
[![npm version](https://badge.fury.io/js/react-bs-datatable.svg)](https://badge.fury.io/js/react-bs-datatable)

[![NPM](https://nodei.co/npm/react-bs-datatable.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/react-bs-datatable/)

Inspired by [react-data-components](https://github.com/carlosrocha/react-data-components). This library uses [react-bootstrap](http://react-bootstrap.github.io/) stylesheets and javascripts. In addition, this library also uses [font-awesome](http://fontawesome.io/) for the table header, clear filter, and other stuffs.

## What's new in v3?

- [x] New build and publish system. Previously, this library used Webpack for bundling etc.—now it only uses `tsc` to compile the TypeScript files to output all files to the `lib` folder.
- [x] ESM and CommonJS are now supported. There are 2 new TypeScript configurations in the project, one is used for building ESM and the other is for building CommonJS.
- [ ] Updated Storybook. Previously, this library still used `storiesOf`, but now it is using Component Story Format (CSF), which was available starting from Storybook v5.
- [x] Lots of optimizations, bundle size in particular. As reported by [Bundlephobia](https://bundlephobia.com/package/react-bs-datatable@3.0.0-alpha.6) for the Alpha version, the minified size is down to just a quarter of what it was, whereas the minified + gzip is down to a third of what it was.
- [x] Replaced `font-awesome` CSS with the [React components of Font Awesome](https://fontawesome.com/v5.15/how-to-use/on-the-web/using-with/react). This allowed us to enable tree shaking, which resulted in the optimization point above.
- [ ] Drop support for all other libraries. This library will now only support Bootstrap tables.

To see the current state of `react-bs-datatable` prerelease version, please visit this Sandbox: https://codesandbox.io/s/react-bs-datatable-3-zq7xe.

## Breaking changes

### Bootstrap and React Bootstrap versions

We are now using Bootstrap v5 and React Bootstrap v2. Older versions are not supported starting from `react-bs-datatable` v3.

### Removal and addition of required dependencies

We no longer need to install `font-awesome` and `bootstrap-sass` anymore. However, these dependencies are now required to make this library function properly:

1. `bootstrap@^5`
2. `react-bootstrap@^2`
3. `@fortawesome/fontawesome-svg-core@^1`
4. `@fortawesome/free-solid-svg-icons@^5`
5. `@fortawesome/react-fontawesome@^0.1`

### Prop changes: `labels`

The type for the `labels` prop has been changed to accomodate better semantics.

```ts
type LabelType = {
  /** This is the labels related to the pagination. */
  pagination?: {
    /** Change the label of the button that if clicked, the paging will go to first page. */
    firstPage?: string;
    /** Change the label of the button that if clicked, the paging will go to last page. */
    lastPage?: string;
    /** Change the label of the button that if clicked, the paging will go to previous page. */
    prevPage?: string;
    /** Change the label of the button that if clicked, the paging will go to next page. */
    nextPage?: string;
  };
  paginationOptions?: {
    /** Change the label that is shown before the select input. */
    beforeSelect?: string;
    /** Change the label that is shown after the select input. */
    afterSelect?: string;
  };
  /** This is the labels related to filters. */
  filter?: {
    /** Change the placeholder label of the filter text input. */
    filterPlaceholder?: string;
  };
  /** Change the label when there are no results, be it be from normal data or from filter text. */
  noResults?: string;
};
```

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Storybook Demo](#storybook-demo)
- [Props](#props)
- [Next Features or Improvements](#next-features-or-improvements)
- [Contributing](#contributing)

## Installation

```bash
# With NPM.
npm install --save react-bs-datatable bootstrap react-bootstrap @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome

# With Yarn.
yarn add react-bs-datatable bootstrap react-bootstrap @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome
```

## Usage

```jsx
import React from 'react';
import Datatable from 'react-bs-datatable';

// Create table headers consisting of 4 columns.
const header = [
  { title: 'Username', prop: 'username' },
  { title: 'Name', prop: 'realname' },
  { title: 'Location', prop: 'location' }
];

// Randomize data of the table columns.
// Note that the fields are all using the `prop` field of the headers.
const body = Array.from(new Array(57), () => {
  const rd = (Math.random() * 10).toFixed(1);

  if (rd > 0.5) {
    return {
      username: 'i-am-billy',
      realname: `Billy ${rd}`,
      location: 'Mars'
    };
  }

  return {
    username: 'john-nhoj',
    realname: `John ${rd}`,
    location: 'Saturn'
  };
});

// Then, use it in a component.
function Component() {
  return <Datatable tableHeaders={header} tableBody={body} />;
}
```

## Storybook Demo.

Head to https://imballinst.github.io/react-bs-datatable to see all of the features in action.

## API

Still todo. Need to auto-generate from the TypeScript with typedoc.

## Contributing

Feel free to contribute by creating issues and/or pull requests. I will do my best to address them as fast as I can.
