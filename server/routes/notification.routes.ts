import express from "express";
import { notificationController } from "../controllers/notification.controllers";

const router = express.Router();

// Create a new notification
router.post("/notifications", notificationController.createNotification);

// Get all notifications
router.get("/notifications", notificationController.getNotifications);

// Delete a notification
router.delete("/notifications/:id", notificationController.deleteNotification);

export default router;
