import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Resizable from 're-resizable';
import { ACTIONS } from '../layout/enums';
import UserListContainer from '../user-list/container';
import logger from '/imports/startup/client/logger';

const propTypes = {
  top: PropTypes.number.isRequired,
  left: PropTypes.number,
  right: PropTypes.number,
  zIndex: PropTypes.number.isRequired,
  minWidth: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  maxWidth: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  isResizable: PropTypes.bool.isRequired,
  resizableEdge: PropTypes.objectOf(PropTypes.bool).isRequired,
  contextDispatch: PropTypes.func.isRequired,
};

const defaultProps = {
  left: null,
  right: null,
};

const SidebarNavigation = (props) => {
  const {
    top,
    left,
    right,
    zIndex,
    minWidth,
    width,
    maxWidth,
    height,
    isResizable,
    resizableEdge,
    contextDispatch,
    amIPresenter,
  } = props;

  logger.debug(
    { logCode: 'presenter' },
    'SideBarNavigation am presenter is  ' + amIPresenter
  );

  let myWidth = width;
  let myPercentage = 180;

  if (myWidth > 150 && !amIPresenter) {
    myWidth = 150;
  }
  let style = {
    position: 'absolute',
    top : top,
    left : left,
    right : right,
    zIndex : zIndex,
    width: myWidth,
    height : height,
  }

  if (amIPresenter) {
    style = {
      position: 'absolute',
      top : top,
      left : left,
      right : right,
      zIndex : zIndex,
      width: myPercentage,
      height : height,
      };  
  }

  const [resizableWidth, setResizableWidth] = useState(myWidth);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStartWidth, setResizeStartWidth] = useState(0);

  useEffect(() => {
    if (!isResizing) setResizableWidth(myWidth);
  }, [myWidth]);

  useEffect(() => {
  }, [resizeStartWidth]);

  const setSidebarNavWidth = (dWidth) => {
    const newWidth = resizeStartWidth + dWidth;

    setResizableWidth(newWidth);

    contextDispatch({
      type: ACTIONS.SET_SIDEBAR_NAVIGATION_SIZE,
      value: {
        width: newWidth,
        browserWidth: window.innerWidth,
        browserHeight: window.innerHeight,
      },
    });
  };

  return (
    <Resizable
      minWidth={minWidth}
      maxWidth={maxWidth}
      size={{
        width: myWidth,
        height,
      }}
      enable={{
        top: isResizable && resizableEdge.top,
        left: isResizable && resizableEdge.left,
        bottom: isResizable && resizableEdge.bottom,
        right: isResizable && resizableEdge.right,
      }}
      handleStyles={{
        right: {
          right: '-8px',
        },
      }}
      handleWrapperClass="resizeSidebarNavWrapper"
      onResizeStart={() => {
        setIsResizing(true);
        setResizeStartWidth(resizableWidth);
      }}
      onResize={(...[, , , delta]) => setSidebarNavWidth(delta.width)}
      onResizeStop={() => {
        setIsResizing(false);
        setResizeStartWidth(0);
      }}
      style={{style}}
    >
      <UserListContainer />
    </Resizable>
  );
};

SidebarNavigation.propTypes = propTypes;
SidebarNavigation.defaultProps = defaultProps;
export default SidebarNavigation;
