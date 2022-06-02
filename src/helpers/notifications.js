import { showNotification, updateNotification } from '@mantine/notifications';
import { Check, X } from 'tabler-icons-react';

export const showNoti = (title, message, loading, status = 'normal') => {
  showNotification({
    id: 'hello-there',
    disallowClose: false,
    title,
    message,
    color: status == 'normal' ? 'black' : status == 'error' ? 'red' : 'teal',
    className: 'my-notification-class',
    loading: loading ? true : false,
  });
};

export const updateNoti = (title, message, success) => {
  updateNotification({
    id: 'hello-there',
    disallowClose: false,
    autoClose: 3000,
    title,
    message,
    color: success ? 'teal' : 'red',
    icon: success ? <Check /> : <X />,
    className: 'my-notification-class',
    loading: false,
  });
};
