import React from 'react';
import { LayoutContextFunc } from '../layout/context';
import SidebarNavigation from './component';
// borrow this for amIPresenter
import Service from '/imports/ui/components/user-list/service';
import logger from '/imports/startup/client/logger';

const SidebarNavigationContainer = (props) => {
  const { layoutContextState, layoutContextDispatch, openPanel } = props;
  const { output } = layoutContextState;
  const { sidebarNavigation } = output;
  const amIPresenter = Service.amIPresenter();
  logger.debug(
    { logCode: 'Display' },
    'SideBarNavigation my display is  ' + sidebarContent.display
  );

  if (sidebarNavigation.display === false) return null;

  return (
    <SidebarNavigation
      {...{amIPresenter, ...sidebarNavigation}}
      openPanel={openPanel}
      contextDispatch={layoutContextDispatch}
    />
  );
};

export default LayoutContextFunc.withConsumer(SidebarNavigationContainer);
