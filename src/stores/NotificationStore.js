import { observable, action } from "mobx";

export class NotificationStore {
    @observable notifications = [];

    @action
    add(title = null, message = null, level = "success", autoDismiss = 0) {
        this.notifications.push({
            title: title,
            message: message,
            level: level,
            uid: Date.now(),
            autoDismiss: autoDismiss
        });
    }

    @action
    addError(preTitle = "", error = {}) {
        const title = `${preTitle}: ${error.message || ""}`;
        const message = (error.response && error.response.data) || error.stack || "";
        this.add(title, message, "error");
    }

    @action
    remove(notification) {
        this.notifications = this.notifications.filter(
            item => item.uid !== notification.uid
        );
    }
}

const notificationStore = new NotificationStore();
export default notificationStore;
