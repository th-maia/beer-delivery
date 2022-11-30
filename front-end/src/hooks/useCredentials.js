import React from 'react';

export default function useCredentials() {
  const [role, setRole] = React.useState(null);

  return [role, setRole];
}
