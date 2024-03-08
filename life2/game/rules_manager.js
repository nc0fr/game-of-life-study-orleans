/**
 * Copyright 2024 The Life2 Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * @license
 */

/**
 * @fileoverview RulesManager is a class responsible to manage a set of Rules,
 * such as (un)registering some, enabling or disabling others...
 *
 * @package life2
 */

import {Rule} from './rule';

/**
 * The RulesManager class is responsible to manage a set of Rules, such as
 * (un)registering some, enabling or disabling others...
 */
export class RulesManager {
  /**
   * Creates a new rules manager.
   * @param {?Array<!Rule>} rules A list of rules to add and enable by default.
   */
  constructor(rules) {
    /**
     * The store of rules.
     * @type {!Map<string, !Rule>}
     * @private
     */
    this.store_ = new Map();
    if (rules) rules.forEach((r) => this.add(r));
  }

  /**
   * Returns the list of rules.
   * @return {!Array<!Rule>} The list of rules.
   */
  getAll() {
    return Array.from(this.store_.values());
  }

  /**
   * Registers a new rule.
   * @param {!Rule} rule The rule to register.
   * @throws {Error} If the rule is already registered.
   */
  add(rule) {
    if (this.has(rule.name)) {
      throw new Error(`Rule '${rule.name}' is already registered.`);
    }

    this.store_.set(rule.name, rule);
  }

  /**
   * Unregisters a rule.
   * @param {string} rule The name of the rule to unregister.
   * @return {!Rule} The rule that was unregistered.
   * @throws {Error} If the rule is not registered.
   */
  remove(rule) {
    if (!this.has(rule)) throw new Error(`Rule '${rule}' is not registered.`);
    const r = this.store_.get(rule);
    this.store_.delete(rule);
    return r;
  }

  /**
   * Checks if a rule is registered.
   * @param {string} rule The name of the rule to check.
   * @return {boolean} True if the rule is registered, false otherwise.
   */
  has(rule) {
    return this.store_.has(rule);
  }
}
