import React, { ReactElement, useState } from 'react';

type FormName = 'initial' | 'selectSet' | 'resolveMulligan';

export default function Setup() {
  const [formTracker, setFormTracker] = useState<FormName>('initial');
  const renderSetupForm = (): ReactElement => {
    switch (formTracker) {
      case 'initial':
        return <div>Initial Form</div>;
      case 'selectSet':
        return <div>Select Modular Set</div>;
      case 'resolveMulligan':
        return <div>Resolve Mulligan</div>;
    }
  };
  return <button type="button">Start</button>;
}
