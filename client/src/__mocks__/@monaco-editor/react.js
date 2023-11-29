import * as React from 'react';

const Editor = React.forwardRef(({ onChange, value }, ref) => {
  return (
    <textarea
      onChange={event => onChange(event.target.value)}
      value={value}
      data-testid="editor"
    />
  );
});
export default Editor;