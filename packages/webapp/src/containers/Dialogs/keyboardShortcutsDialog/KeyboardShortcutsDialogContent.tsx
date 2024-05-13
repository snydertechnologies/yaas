import { DialogContent } from '@bigcapital/webapp/components';
// @ts-nocheck
import React from 'react';
import ShortcutsTable from '../../KeyboardShortcuts/ShortcutsTable';
import KeyboardShortcutsFooter from './KeyboardShortcutsFooter';

import '@bigcapital/webapp/style/pages/keyboardShortcuts/KeyboardShortcutDialog.scss';

export default function KeyboardShortcutsDialogContent() {
  return (
    <DialogContent name={'keyboard-shortcuts'}>
      <ShortcutsTable />
      <KeyboardShortcutsFooter />
    </DialogContent>
  );
}
