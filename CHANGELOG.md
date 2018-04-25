#### 1.2.3 (2018-04-25)

##### Chores

* **readme:**
  * edited README a bit ([161d5547](https://github.com/Imballinst/react-bs-datatable/commit/161d55474cdc1cf9b7d3bf4d05a61e023d2fe6d6))
  * edited README ([3add6b6f](https://github.com/Imballinst/react-bs-datatable/commit/3add6b6f0e851f75dffeb0cb9d637a70d9363147))

##### New Features

* **onFilter:** added custom filter function ([477564d8](https://github.com/Imballinst/react-bs-datatable/commit/477564d8a786e424a1b93386ce1d504bd727ac22))

##### Tests

* **filter:** added more tests to filter function ([27735d25](https://github.com/Imballinst/react-bs-datatable/commit/27735d2502884891741e4484c53b41df4a06c8e8))

#### 1.2.2 (2018-04-24)

##### Bug Fixes

* **modules:** fixed lib using commonjs modules ([b8743aae](https://github.com/Imballinst/react-bs-datatable/commit/b8743aae789f640612afbc00bbee87af8c80b1df))

#### 1.2.1 (2017-12-26)

##### Chores

* **readme:** update readme ([713a2d25](https://github.com/Imballinst/react-bs-datatable/commit/713a2d25641353ee4ddb5c30102e9cded332fbac))
* **precommit:** edited pre-commit scripts ([1f54160f](https://github.com/Imballinst/react-bs-datatable/commit/1f54160fd8ac000a4f91d479f902234e179a8dd1))

##### Bug Fixes

* **optimize:** changed main from dist to lib folder ([96693aeb](https://github.com/Imballinst/react-bs-datatable/commit/96693aeb17f003ead038731d53389af6cb4d0093))
* **babel:** transformed src with babel to lib folder ([df4a7a85](https://github.com/Imballinst/react-bs-datatable/commit/df4a7a85e9358c7ba37cdcd00a67cbcc3f6c2f5e))

### 1.2.0 (2017-11-27)

##### Chores

* **README:** added README regarding datatable extending, addressed #11 ([a93dff8d](https://github.com/Imballinst/react-bs-datatable/commit/a93dff8da40630a9f3b32be3c9e391740090288d))
* **readme:** added readme for labels and tableHeader.cell ([c910be7e](https://github.com/Imballinst/react-bs-datatable/commit/c910be7e0a85d583fb46832c70872b65d03c15be))

##### Bug Fixes

* **default pagination:** fixed fallback pagination to rowsPerPageOption if rowsPerPage not included ([723546e2](https://github.com/Imballinst/react-bs-datatable/commit/723546e201f3ed7e9726372fb5e37ff2a49bb240))
* **pagination opts:** fixed pagination options doesnt getting sorted correctly, edit readme ([4b8c3343](https://github.com/Imballinst/react-bs-datatable/commit/4b8c334373f7082f4e1771ad4652bb1e5af4ee5d))

##### Refactors

* **datatable:** refactored datatable, added more unit tests ([621ae9a2](https://github.com/Imballinst/react-bs-datatable/commit/621ae9a2639d4ad9038cb05fecec0b9ae7fd72e4))

#### 1.1.18 (2017-9-4)

##### Bug Fixes

* **filter:** fixed filter can't filter empty element ([450c7fd6](https://github.com/Imballinst/react-bs-datatable/commit/450c7fd6535ea0fe8c607b0a18634376f04f1b47))

#### 1.1.17 (2017-7-21)

##### Bug Fixes

* **optimize:** enabled tree shaking, with externals enabled down from 400kB to 110kB ([8db750cc](https://github.com/Imballinst/react-bs-datatable/commit/8db750ccf80cec9ffd8f2ade2c66ab0ceeb1a7ff))

#### 1.1.16 (2017-6-28)

##### Bug Fixes

* **typo:** fixed elementValue -> columnValue ([5e51cdf5](https://github.com/Imballinst/react-bs-datatable/commit/5e51cdf5a8abe44b8a05f9af7c9901de46f03675))

#### 1.1.15 (2017-6-28)

##### New Features

* **custom sorting:** added feature for custom sorting by passing a quantifier function ([1a8d51dd](https://github.com/Imballinst/react-bs-datatable/commit/1a8d51ddc8ed2f555e08271c1e38fcd7c6f2b766))

##### Bug Fixes

* **isAnElement unknown variable:** removed unused variable, edit readme ([87072d87](https://github.com/Imballinst/react-bs-datatable/commit/87072d870a20283bb898d61a31764242729f8b26))

##### Refactors

* **lodash:** reduced bundle size by 50% by changing how lodash is imported ([c6e5b23a](https://github.com/Imballinst/react-bs-datatable/commit/c6e5b23aff84180d84fb729fbe15ee0f5ead51bd))

#### 1.1.14 (2017-5-23)

#### 1.1.13 (2017-5-23)

#### 1.1.12 (2017-5-23)

##### New Features

* **optional pagination:** allow rendering table without pagination ([fbf9b4cf](https://github.com/Imballinst/react-bs-datatable/commit/fbf9b4cffdff36a55ee3b8e1091c30a93536adf7))

#### 1.1.11 (2017-5-18)

#### 1.1.9 (2017-5-7)

##### Bug Fixes

* **updating data:** fixed updating data with less amount causing pagination to bugged out ([5bcf156f](https://github.com/Imballinst/react-bs-datatable/commit/5bcf156f26dfc0173f1aa49aff35419a76d2ab4f))

#### 1.1.9 (2017-5-7)

##### Bug Fixes

* **updating data:** fixed updating data with less amount causing pagination to bugged out ([5bcf156f](https://github.com/Imballinst/react-bs-datatable/commit/5bcf156f26dfc0173f1aa49aff35419a76d2ab4f))

#### 1.1.9 (2017-5-7)

##### Bug Fixes

* **updating data:** fixed updating data with less amount causing pagination to bugged out ([5bcf156f](https://github.com/Imballinst/react-bs-datatable/commit/5bcf156f26dfc0173f1aa49aff35419a76d2ab4f))

#### 1.1.8 (2017-3-24)

##### Bug Fixes

* **sort:** fixed sorting not working on non-react-element ([da341f91](https://github.com/Imballinst/react-bs-datatable/commit/da341f91c606525726e70c2e5a13bbf6bf78db38))

#### 1.1.7 (2017-3-10)

##### Bug Fixes

* **datatable:** fixed column not sorting when inserted with react.element ([d1e400a8](https://github.com/Imballinst/react-bs-datatable/commit/d1e400a8642b53c1365c3f5bf5e5eb27c807df0d))

#### 1.1.6 (2017-3-7)

##### Tests

* **datatable:** another improvement on event handler unit testing ([672073d6](https://github.com/Imballinst/react-bs-datatable/commit/672073d6975a8b385c932c525825e98ec88b2c82))

#### 1.1.5 (2017-3-6)

##### Bug Fixes

* **sort:** fixed sorting causes awkward browser lag, too many recursion ([4308c764](https://github.com/Imballinst/react-bs-datatable/commit/4308c764fde7b51619584e6af8e963dbde8b5d03))

#### 1.1.5 (2017-3-6)

##### Bug Fixes

* **sort:** fixed sorting causes awkward browser lag, too many recursion ([4308c764](https://github.com/Imballinst/react-bs-datatable/commit/4308c764fde7b51619584e6af8e963dbde8b5d03))

#### 1.1.4 (2017-3-6)

##### Tests

* **react-bs-datatable:** added more unit tests ([e30696d1](https://github.com/Imballinst/react-bs-datatable/commit/e30696d1b273965229c9aa15ff80b589f3c3dd26))

#### 1.1.4 (2017-3-6)

##### Tests

* **react-bs-datatable:** added more unit tests ([e30696d1](https://github.com/Imballinst/react-bs-datatable/commit/e30696d1b273965229c9aa15ff80b589f3c3dd26))

