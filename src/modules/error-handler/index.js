import Popup from 'react-popup'

export const popupError = e => {
  Popup.create({
    content: e.message || e,
    buttons: {
      right: [
        {
          text: '關閉',
          className: 'primary',
          action: () => {
            Popup.close()
          }
        }
      ]
    },
    closeOnOutsideClick: true
  })
}
