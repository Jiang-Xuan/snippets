import React from 'react';

const isSupportResize = !!window.ResizeObserver;
/** https://codesandbox.io/s/tdautoclamptext-m6ehu?file=/src/auto-line-clamp.jsx */
function TdAutoLineClamp({ children }) {
  const wrapperRef = React.useRef(null);
  const [parentPadding, setParentPadding] = React.useState('');
  const [lineClamp, setLineClamp] = React.useState(2);

  React.useEffect(() => {
    const parent = wrapperRef.current.parentElement;

    if (parent.tagName !== 'TD') {
      throw new Error('必须为 TD 元素的直接子元素');
    }

    const padding = window.getComputedStyle(parent).padding;

    setParentPadding(padding);

    if (!isSupportResize) {
      return;
    }

    const resizeObserver = new ResizeObserver(entries => {
      const lineHeight = parseInt(window.getComputedStyle(wrapperRef.current).lineHeight, 10);
      const target = entries[0];

      const { blockSize } = target.borderBoxSize[0];

      const newLineClamp = Math.trunc(blockSize / lineHeight);

      setLineClamp(newLineClamp);
    });

    resizeObserver.observe(wrapperRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  const NewChildren = React.cloneElement(React.Children.only(children), {
    style: {
      ...(children.props.style || {}),
      WebkitLineClamp: lineClamp,
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
    },
  });

  return (
    <div
      ref={wrapperRef}
      style={
        isSupportResize
          ? {
              position: 'absolute',
              inset: parentPadding,
            }
          : {}
      }
    >
      {NewChildren}
    </div>
  );
}

export default TdAutoLineClamp;
