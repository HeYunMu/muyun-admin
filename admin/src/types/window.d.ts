import { DialogApiInjection } from 'naive-ui/es/dialog/src/DialogProvider'
import { LoadingBarInst } from 'naive-ui/es/loading-bar/src/LoadingBarProvider'
import { MessageApiInjection } from 'naive-ui/es/message/src/MessageProvider'
import { NotificationApiInjection } from 'naive-ui/es/notification/src/NotificationProvider'

declare global {
  interface Window {
    $msg: MessageApiInjection
    $progress: LoadingBarInst
    $notify: NotificationApiInjection
    $dialog: DialogApiInjection
  }
}
