// Copyright 2024 The Life2 Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview ESLint config following the Google style guide.
 */

/* eslint-env node */

// Named constants for the numbers ESLint uses to indicate lint severity.
// const OFF = 0;
// const WARNING = 1;
// const ERROR = 2;

// ESLint configuration object.  Options are described at
// http://eslint.org/docs/user-guide/configuring.
const ESLINT_CONFIG = {
  extends : ['eslint-config-closure-es6'],
  parserOptions : {
    ecmaVersion : 6,
    sourceType : 'module',
  },
  env : {
    node : true,
  },
  globals : {},
  plugins : [
    'closure',
  ],
  // The list of rules and options are available at
  // http://eslint.org/docs/rules/.
  rules : {},
  // ESLint supports adding shared settings into configuration file.  The
  // settings object will be supplied to every rule that will be executed.
  settings : {},
};

module.exports = ESLINT_CONFIG;
