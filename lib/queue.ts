/**
 * Queue Service using Bull + Redis
 * Demonstrates: Async job processing, message queues, task scheduling
 * Best Practice: Decoupled async operations from main request-response cycle
 */

import Queue from 'bull';
import { logger } from './logger';

// ============================================================================
// QUEUE TYPES
// ============================================================================

export interface EmailJobData {
  to: string;
  subject: string;
  template: 'welcome' | 'verification' | 'password-reset' | 'notification';
  data: Record<string, unknown>;
}

export interface NotificationJobData {
  userId: string;
  type: 'message' | 'system' | 'alert';
  title: string;
  content: string;
}

export interface ChatProcessingJobData {
  sessionId: string;
  messageId: string;
  content: string;
  userId: string;
}

// ============================================================================
// QUEUE DEFINITIONS
// ============================================================================

/**
 * Email Queue - For sending emails asynchronously
 * Prevents blocking chat responses while sending emails
 */
export const emailQueue = new Queue('emails', {
  // Use Redis connection string when available
  redis: process.env.REDIS_URL || 'redis://127.0.0.1:6379'
});

/**
 * Notification Queue - For user notifications
 * Handles real-time and push notifications
 */
export const notificationQueue = new Queue('notifications', {
  redis: process.env.REDIS_URL || 'redis://127.0.0.1:6379'
});

/**
 * Chat Processing Queue - For AI model processing
 * Handles expensive chat completions asynchronously
 */
export const chatProcessingQueue = new Queue('chat-processing', {
  redis: process.env.REDIS_URL || 'redis://127.0.0.1:6379'
});

// ============================================================================
// QUEUE EVENT HANDLERS
// ============================================================================

/**
 * Email Queue Processing
 */
emailQueue.process(async (job) => {
  const { to, subject, template, data } = job.data as EmailJobData;
  
  try {
    // Log the email job
    logger.info({
      type: 'email_queued',
      to,
      template
    });

    // TODO: Implement actual email sending via SendGrid, Nodemailer, etc.
    // Example:
    // const emailContent = renderTemplate(template, data);
    // await emailService.send({ to, subject, html: emailContent });

    return { success: true, to, template };
  } catch (error) {
    job.progress(0);
    throw error;
  }
});

emailQueue.on('completed', (job) => {
  logger.info({
    type: 'email_completed',
    jobId: job.id
  });
});

emailQueue.on('failed', (job, err) => {
  logger.error({
    type: 'email_failed',
    jobId: job.id,
    error: err.message
  });
});

/**
 * Notification Queue Processing
 */
notificationQueue.process(async (job) => {
  const { userId, type, title, content } = job.data as NotificationJobData;
  
  try {
    logger.info({
      type: 'notification_queued',
      notificationType: type,
      userId
    });

    // TODO: Send WebSocket notification, push notification, etc.
    // Example:
    // await notificationService.send(userId, { type, title, content });

    return { success: true, userId, type };
  } catch (error) {
    job.progress(0);
    throw error;
  }
});

notificationQueue.on('completed', (job) => {
  logger.info({
    type: 'notification_completed',
    jobId: job.id
  });
});

/**
 * Chat Processing Queue Processing
 */
chatProcessingQueue.process(async (job) => {
  const { sessionId, messageId, content, userId } = job.data as ChatProcessingJobData;
  
  try {
    job.progress(25);
    
    logger.info({
      type: 'chat_queued',
      sessionId,
      messageId,
      userId
    });

    job.progress(50);

    // TODO: Call LLM API
    // const response = await llm.complete(content);
    // const response = await fetch('...', { body: content });

    job.progress(75);

    // TODO: Save response
    // await prisma.message.create({
    //   data: { sessionId, content: response, role: 'assistant' }
    // });

    job.progress(100);
    
    return { success: true, messageId, sessionId };
  } catch (error) {
    job.progress(0);
    throw error;
  }
});

chatProcessingQueue.on('progress', (job, progress) => {
  // Update UI via WebSocket
  logger.debug({
    type: 'chat_progress',
    jobId: job.id,
    progress
  });
});

chatProcessingQueue.on('completed', (job) => {
  logger.info({
    type: 'chat_completed',
    jobId: job.id
  });
});

// ============================================================================
// QUEUE MANAGEMENT FUNCTIONS
// ============================================================================

/**
 * Add email job to queue
 * Example: sendWelcomeEmail('user@example.com')
 */
export async function sendEmailAsync(emailData: EmailJobData): Promise<string> {
  try {
    const job = await emailQueue.add(emailData, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000
      },
      removeOnComplete: true
    });
    
    return String(job.id);
  } catch (error) {
    throw new Error(`Failed to queue email: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Add notification job to queue
 */
export async function sendNotificationAsync(data: NotificationJobData): Promise<string> {
  try {
    const job = await notificationQueue.add(data, {
      attempts: 2,
      removeOnComplete: true
    });
    
    return String(job.id);
  } catch (error) {
    throw new Error(`Failed to queue notification: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Add chat processing job to queue
 */
export async function processChatAsync(data: ChatProcessingJobData): Promise<string> {
  try {
    const job = await chatProcessingQueue.add(data, {
      attempts: 2,
      timeout: 30000 // 30 second timeout for LLM processing
    });
    
    return String(job.id);
  } catch (error) {
    throw new Error(`Failed to queue chat processing: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Get job status
 */
export async function getJobStatus(queueName: string, jobId: string) {
  const queue = 
    queueName === 'email' ? emailQueue :
    queueName === 'notification' ? notificationQueue :
    chatProcessingQueue;

  const job = await queue.getJob(jobId);
  
  if (!job) {
    return null;
  }

  const state = await job.getState();
  const progress = job.progress();
  
  return {
    id: job.id,
    state,
    progress,
    data: job.data,
    result: job.returnvalue,
    failedReason: job.failedReason,
    timestamp: job.timestamp,
    processedOn: job.processedOn
  };
}

/**
 * Get queue statistics
 */
export async function getQueueStats(queueName: string) {
  const queue = 
    queueName === 'email' ? emailQueue :
    queueName === 'notification' ? notificationQueue :
    chatProcessingQueue;

  const counts = await queue.getJobCounts();
  
  return {
    queue: queueName,
    ...counts,
    isPaused: queue.isPaused()
  };
}

/**
 * Clear queue (admin only)
 */
export async function clearQueue(queueName: string) {
  const queue = 
    queueName === 'email' ? emailQueue :
    queueName === 'notification' ? notificationQueue :
    chatProcessingQueue;

  await queue.clean(0); // Remove all completed jobs
  return { queue: queueName, cleared: true };
}

// ============================================================================
// QUEUE LIFECYCLE
// ============================================================================

/**
 * Initialize all queues
 */
export async function initializeQueues() {
  try {
    await emailQueue.isReady();
    await notificationQueue.isReady();
    await chatProcessingQueue.isReady();
    
    logger.info({
      type: 'queues_initialized'
    });

    return { status: 'ready', queues: ['email', 'notification', 'chat-processing'] };
  } catch (error) {
    throw new Error(`Failed to initialize queues: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Close all queues gracefully
 */
export async function closeQueues() {
  try {
    await emailQueue.close();
    await notificationQueue.close();
    await chatProcessingQueue.close();
    
    return { status: 'closed' };
  } catch (error) {
    throw new Error(`Failed to close queues: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export { Queue };
