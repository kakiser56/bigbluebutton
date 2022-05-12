import React, { PureComponent } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import injectWbResizeEvent from '/imports/ui/components/presentation/resize-wrapper/component';
import { styles } from './styles.scss';
import CustomLogo from './custom-logo/component';
import UserContentContainer from './user-list-content/container';
import ScreenshareButtonContainer from '/imports/ui/components/actions-bar/screenshare/container';
import logger from '/imports/startup/client/logger';

const propTypes = {
  compact: PropTypes.bool,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
  CustomLogoUrl: PropTypes.string.isRequired,
  isPublicChat: PropTypes.func.isRequired,
  setEmojiStatus: PropTypes.func.isRequired,
  clearAllEmojiStatus: PropTypes.func.isRequired,
  roving: PropTypes.func.isRequired,
  showBranding: PropTypes.bool.isRequired,
  requestUserInformation: PropTypes.func.isRequired,
  amIPresenter: PropTypes.bool.isRequired,
  isMeteorConnected: PropTypes.bool.isRequired,
};

const defaultProps = {
  compact: false,
};

class UserList extends PureComponent {
  render() {
    const {
      amIPresenter,
      isMeteorConnected,
      intl,
      compact,
      setEmojiStatus,
      clearAllEmojiStatus,
      isPublicChat,
      roving,
      CustomLogoUrl,
      showBranding,
      hasBreakoutRoom,
      requestUserInformation,
    } = this.props;

    logger.debug(
      { logCode: 'presenter' },
      'I am presenter is  ' + amIPresenter
    );
    
    
    return (
      <div className={styles.userList}>
        {
          showBranding
            && !compact
            && CustomLogoUrl
            ? <CustomLogo CustomLogoUrl={CustomLogoUrl} /> : null
        }
        {<UserContentContainer
          {...{
            intl,
            compact,
            setEmojiStatus,
            clearAllEmojiStatus,
            isPublicChat,
            roving,
            hasBreakoutRoom,
            requestUserInformation,
          }
          }
        />}
        {
          <ScreenshareButtonContainer {...{
            amIPresenter,
            isMeteorConnected,
          }}
          />          
        }
      </div>
    );
  }
}

UserList.propTypes = propTypes;
UserList.defaultProps = defaultProps;

export default injectWbResizeEvent(injectIntl(UserList));
