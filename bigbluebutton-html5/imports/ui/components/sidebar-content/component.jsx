import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Resizable from 're-resizable';
import { ACTIONS, PANELS } from '../layout/enums';
import ChatContainer from '/imports/ui/components/chat/container';
import NoteContainer from '/imports/ui/components/note/container';
import PollContainer from '/imports/ui/components/poll/container';
import CaptionsContainer from '/imports/ui/components/captions/pad/container';
import BreakoutRoomContainer from '/imports/ui/components/breakout-room/container';
import WaitingUsersPanel from '/imports/ui/components/waiting-users/container';
import ErrorBoundary from '/imports/ui/components/error-boundary/component';
import FallbackView from '/imports/ui/components/fallback-errors/fallback-view/component';
import { styles } from '/imports/ui/components/app/styles';
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

const SidebarContent = (props) => {
  const {
    top,
    left,
    right,
    zIndex,
    minWidth,
    width,
    maxWidth,
    minHeight,
    height,
    maxHeight,
    isResizable,
    resizableEdge,
    contextDispatch,
    sidebarContentPanel,
    amIPresenter,
  } = props;

  logger.debug(
    { logCode: 'presenter' },
    'SideBarContent am presenter is  ' + amIPresenter
  );

  let myLeft = left;
  if (myLeft > 150) {
    myLeft = 150;
  }

  let myWidth = width;
  // if presenting, make chat window 70% of window width, and left to be 30% over
  if (amIPresenter) {
    myLeft = window.innerWidth * .30;
    myWidth = window.innerWidth * .70;
  }

  logger.debug(
    { logCode: 'presenter' },
    'SideBarContent min width is ' + minWidth + ' width is  ' + myWidth + ' left is ' + myLeft + ' window width is ' + window.innerWidth
  );


  const [resizableWidth, setResizableWidth] = useState(width);
  const [resizableHeight, setResizableHeight] = useState(height);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStartWidth, setResizeStartWidth] = useState(0);
  const [resizeStartHeight, setResizeStartHeight] = useState(0);

  useEffect(() => {
    if (!isResizing) {
      setResizableWidth(myWidth);
      setResizableHeight(height);
    }
  }, [myWidth, height]);

  useEffect(() => {
  }, [resizeStartWidth, resizeStartHeight]);

  const setSidebarContentSize = (dWidth, dHeight) => {
    const newWidth = resizeStartWidth + dWidth;
    const newHeight = resizeStartHeight + dHeight;

    setResizableWidth(newWidth);
    setResizableHeight(newHeight);

    contextDispatch({
      type: ACTIONS.SET_SIDEBAR_CONTENT_SIZE,
      value: {
        width: newWidth,
        height: newHeight,
        browserWidth: window.innerWidth,
        browserHeight: window.innerHeight,
      },
    });
  };

  const smallSidebar = myWidth < (maxWidth / 2);

  return (
    <Resizable
      minWidth={minWidth}
      maxWidth={maxWidth}
      minHeight={minHeight}
      maxHeight={maxHeight}
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
      handleWrapperClass="resizeSidebarContentWrapper"
      onResizeStart={() => {
        setIsResizing(true);
        setResizeStartWidth(resizableWidth);
        setResizeStartHeight(resizableHeight);
      }}
      onResize={(...[, , , delta]) => setSidebarContentSize(delta.width, delta.height)}
      onResizeStop={() => {
        setIsResizing(false);
        setResizeStartWidth(0);
        setResizeStartHeight(0);
      }}
      style={{
        position: 'absolute',
        top : top,
        left : myLeft,
        right : right,
        zIndex : zIndex,
        width: myWidth,
        height : height,    
      }}
    >
      {sidebarContentPanel === PANELS.CHAT
      && (
      <ErrorBoundary
        Fallback={FallbackView}
      >
        <ChatContainer />
      </ErrorBoundary>
      )}
      {sidebarContentPanel === PANELS.SHARED_NOTES && <NoteContainer />}
      {sidebarContentPanel === PANELS.CAPTIONS && <CaptionsContainer />}
      {sidebarContentPanel === PANELS.POLL
        && (
          <div className={styles.poll} style={{ minWidth, top: '0' }} id="pollPanel">
            <PollContainer smallSidebar={smallSidebar} />
          </div>
        )}
      {sidebarContentPanel === PANELS.BREAKOUT && <BreakoutRoomContainer />}
      {sidebarContentPanel === PANELS.WAITING_USERS && <WaitingUsersPanel />}
    </Resizable>
  );
};

SidebarContent.propTypes = propTypes;
SidebarContent.defaultProps = defaultProps;
export default SidebarContent;
