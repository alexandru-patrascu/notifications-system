import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { INotification, Notification } from "../models/notification.modules";

class NotificationController {
  // Create a new notification
  createNotification = async (req: Request, res: Response) => {
    try {
      const { message, from, to, type } = req.body;

      if (!message || !from || !to || !type) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send({ message: "Please provide all fields" });
      }

      const newNotification = await Notification.create({
        message,
        from,
        to,
        type,
      });

      res.status(StatusCodes.CREATED).json({ notification: newNotification });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).send(error);
    }
  };

  // Get all notifications
  getNotifications = async (_: Request, res: Response) => {
    try {
      const notifications: INotification[] = await Notification.find().sort({
        createdAt: -1,
      });
      res.status(StatusCodes.OK).json({ notifications });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).send(error);
    }
  };

  // Delete a notification
  deleteNotification = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await Notification.findByIdAndDelete({ _id: id });
      res.status(StatusCodes.OK).json({ message: "Notification deleted" });
    } catch (error) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: "Notification not found" });
    }
  };
}

export const notificationController = new NotificationController();
