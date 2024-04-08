export interface Notification {
  _id: string;
  message: string;
  type: string;
  from: string;
  to: string;
  read: boolean;
  createdAt: string;
}
