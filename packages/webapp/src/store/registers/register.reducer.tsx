// @ts-nocheck
import { createReducer } from '@reduxjs/toolkit';
import t from '@bigcapital/webapp/store/types';

const initialState = {
  registers: {},
};

export default createReducer(initialState, {
  [t.REGISTER_SET]: (state, action) => {
    const _registers = {};

    action.registers.forEach((register) => {
      _registers[register.id] = register;
    });
    state.registers = {
      ...state.registers,
      ..._registers,
    };
  },
});
