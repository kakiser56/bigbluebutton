import React from 'react';
import SidebarContent from './component';
import { LayoutContextFunc } from '../layout/context';
// borrow this for amIPresenter
import Service from '/imports/ui/components/user-list/service';
import logger from '/imports/startup/client/logger';

const SidebarContentContainer = (props) => {
  const { layoutContextState, layoutContextDispatch } = props;
  const {
    output, input,
  } = layoutContextState;
  const { sidebarContent: sidebarContentInput } = input;
  const { sidebarContentPanel } = sidebarContentInput;
  const { sidebarContent } = output;
  const amIPresenter = Service.amIPresenter();

  logger.debug(
    { logCode: 'Display' },
    'SideBarContent my display is  ' + sidebarContent.display
  );

  if (sidebarContent.display === false) return null;

  return (
    <SidebarContent
      {...{amIPresenter, ...sidebarContent}}
      contextDispatch={layoutContextDispatch}
      sidebarContentPanel={sidebarContentPanel}
    />
  );
};

export default LayoutContextFunc.withConsumer(SidebarContentContainer);
