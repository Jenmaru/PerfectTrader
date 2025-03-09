import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { selectors, actions, getCurrentChannel } from '../slices/Channels';
import ChartBar, { ChartLine } from './Chart';

const ChannelItem = ({
  handleChannel,
  channel,
  currentChannel,
  remove,
  rename,
  t,
}) => (
  <li className="nav-item w-100" key={channel.id}>
    { !channel.removable
      ? (
        <button
          type="button"
          onClick={() => handleChannel(channel.id)}
          className={cn('w-100', 'rounded-0', 'text-start', 'btn', {
            'btn-secondary': channel.id === currentChannel.id,
          })}
        >
          <span>#</span>
          {' '}
          {channel.name}
        </button>
      )
      : (
        <Dropdown as={ButtonGroup} className="d-flex">
          <Button
            type="button"
            variant={channel.id === currentChannel.id && 'secondary'}
            onClick={() => handleChannel(channel.id)}
            className="w-100 rounded-0 text-start text-truncate"
          >
            <span className="me-1">#</span>
            {channel.name}
          </Button>
          <Dropdown.Toggle
            split
            variant={channel.id === currentChannel.id && 'secondary'}
            id={`dropdown-split-basic-${channel.id}`}
          >
            <span className="visually-hidden">{t('chatPage.channels.control')}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              href="#"
              onClick={() => remove(channel.id)}
              id={channel.id}
            >
              {t('chatPage.channels.remove')}
            </Dropdown.Item>
            <Dropdown.Item
              href="#"
              onClick={() => rename(channel.id)}
              id={channel.id}
            >
              {t('chatPage.channels.rename')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
  </li>
);

const ChannelsComponent = () => {
  const dispatch = useDispatch();
  const channels = useSelector(selectors.selectAll);
  const currentChannel = useSelector(getCurrentChannel);
  const { t } = useTranslation();
  const handleChannel = (id) => {
    dispatch(actions.setChannelId(id));
  };
  const currentChannelName = useSelector(selectors.selectAll)
    .find(({ id }) => id === currentChannel.id)
    ?.name;

  return (
    <>
      <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
        <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
          <b>{t('chatPage.channels.title')}</b>
        </div>
        <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
          {channels.map((channel) => (
            <ChannelItem
              handleChannel={handleChannel}
              key={channel.id}
              channel={channel}
              currentChannel={currentChannel}
              t={t}
            />
          ))}
        </ul>
      </div>
      <div className="col p-0 h-100">
        <div className="d-flex flex-column h-100 container-fluid">
          <div className="bg-light mb-4 p-3 shadow-sm small">
            <p className="m-0">
              <b>
                {`# ${currentChannelName}`}
              </b>
            </p>
          </div>
          <ChartBar />
          <ChartLine />
        </div>
      </div>
    </>
  );
};

export default ChannelsComponent;
