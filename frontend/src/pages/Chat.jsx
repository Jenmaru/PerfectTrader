import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import { actions as channelsAction } from '../slices/Channels.js';
import routes from '../routes.js';
import HeaderComponent from '../components/Header.jsx';
import ChannelsComponent from '../components/Channels.jsx';
import { useAuth } from '../contexts/authProvider.jsx';
import { actions as messagesAction } from '../slices/Messages.js';
import ModalComponent from '../components/Modal.jsx';
import 'react-toastify/dist/ReactToastify.css';

const ChatPage = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const getResponse = async () => {
      try {
        const { data } = await axios.get(routes.usersPath(), {
          headers: auth.getAuth(),
        });
        const { channels, messages, currentChannelId } = data;
        dispatch(channelsAction.addChannels(channels));
        dispatch(messagesAction.addMessages(messages));
        dispatch(channelsAction.setChannelId(currentChannelId));
      } catch (e) {
        auth.logOut();
        toast.error(t('toast.networkError'), { toastId: `${t('toast.networkError')} error` });
      }
    };
    getResponse();
  }, [auth, dispatch, t]);

  return (
    <>
      <div className="d-flex flex-column h-100">
        <HeaderComponent />
        <div className="h-100 overflow-hidden rounded shadow mx-2">
          <div className="row h-100 bg-white flex-md-row">
            <ChannelsComponent />
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ModalComponent />
    </>
  );
};

export default ChatPage;
