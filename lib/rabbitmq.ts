/**
 * RabbitMQ Service
 * Alternative to Bull - Direct RabbitMQ implementation
 * Demonstrates: Advanced message queue patterns, RPC, topic exchanges
 * Best Practice: Enterprise message broker integration
 */

import amqplib, { Connection, Channel } from 'amqplib';
import { logger } from './logger';

// ============================================================================
// RABBITMQ CONFIGURATION
// ============================================================================

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672';

// Exchange & Queue Names
const EXCHANGES = {
  DIRECT: 'app.direct',
  TOPIC: 'app.topic',
  FANOUT: 'app.fanout'
} as const;

const QUEUES = {
  EMAIL: 'email.queue',
  NOTIFICATION: 'notification.queue',
  CHAT_PROCESSING: 'chat-processing.queue',
  CHAT_RESPONSES: 'chat-responses.queue'
} as const;

const ROUTING_KEYS = {
  EMAIL_SEND: 'email.send',
  NOTIFICATION_SEND: 'notification.send',
  CHAT_PROCESS: 'chat.process',
  CHAT_RESPONSE: 'chat.response'
} as const;

// ============================================================================
// CONNECTION MANAGEMENT
// ============================================================================

let connection: Connection | null = null;
let channel: Channel | null = null;

/**
 * Establish RabbitMQ connection
 */
export async function connectRabbitMQ(): Promise<Channel> {
  try {
    if (connection && channel) {
      return channel;
    }

    connection = await amqplib.connect(RABBITMQ_URL);
    channel = await connection.createChannel();

    // Set QoS
    await channel.prefetch(1); // Process one message at a time

    // Declare exchanges
    await channel.assertExchange(EXCHANGES.DIRECT, 'direct', { durable: true });
    await channel.assertExchange(EXCHANGES.TOPIC, 'topic', { durable: true });
    await channel.assertExchange(EXCHANGES.FANOUT, 'fanout', { durable: true });

    // Declare queues
    await channel.assertQueue(QUEUES.EMAIL, { durable: true });
    await channel.assertQueue(QUEUES.NOTIFICATION, { durable: true });
    await channel.assertQueue(QUEUES.CHAT_PROCESSING, { durable: true });
    await channel.assertQueue(QUEUES.CHAT_RESPONSES, { durable: true });

    // Bind queues to routing keys
    await channel.bindQueue(QUEUES.EMAIL, EXCHANGES.DIRECT, ROUTING_KEYS.EMAIL_SEND);
    await channel.bindQueue(QUEUES.NOTIFICATION, EXCHANGES.DIRECT, ROUTING_KEYS.NOTIFICATION_SEND);
    await channel.bindQueue(QUEUES.CHAT_PROCESSING, EXCHANGES.TOPIC, ROUTING_KEYS.CHAT_PROCESS);
    await channel.bindQueue(QUEUES.CHAT_RESPONSES, EXCHANGES.DIRECT, ROUTING_KEYS.CHAT_RESPONSE);

    logger.info({ type: 'rabbitmq_connected' });

    // Setup connection error handlers
    connection.on('error', (err: Error) => {
      logger.error({
        type: 'rabbitmq_error',
        error: err.message
      });
    });

    return channel;
  } catch (error) {
    throw new Error(
      `Failed to connect to RabbitMQ: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Close RabbitMQ connection
 */
export async function closeRabbitMQ() {
  try {
    if (channel) {
      await channel.close();
      channel = null;
    }
    if (connection) {
      await connection.close();
      connection = null;
    }

    logger.info({ type: 'rabbitmq_closed' });
  } catch (error) {
    throw new Error(
      `Failed to close RabbitMQ connection: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

// ============================================================================
// MESSAGE PUBLISHING
// ============================================================================

/**
 * Publish email message
 */
export async function publishEmail(data: {
  to: string;
  subject: string;
  template: 'welcome' | 'verification' | 'password-reset' | 'notification';
  htmlContent: string;
}) {
  const ch = await connectRabbitMQ();

  const message = Buffer.from(JSON.stringify(data));
  
  const sent = ch.sendToQueue(QUEUES.EMAIL, message, {
    persistent: true,
    contentType: 'application/json',
    timestamp: Date.now()
  });

  if (sent) {
    logger.info({
      type: 'email_published',
      to: data.to,
      template: data.template
    });
  }

  return sent;
}

/**
 * Publish notification message
 */
export async function publishNotification(data: {
  userId: string;
  type: 'message' | 'system' | 'alert';
  title: string;
  content: string;
}) {
  const ch = await connectRabbitMQ();

  const message = Buffer.from(JSON.stringify(data));
  
  const sent = ch.sendToQueue(QUEUES.NOTIFICATION, message, {
    persistent: true,
    contentType: 'application/json'
  });

  if (sent) {
    logger.info({
      type: 'notification_published',
      notificationType: data.type,
      userId: data.userId
    });
  }

  return sent;
}

/**
 * Publish chat processing request
 */
export async function publishChatProcessing(data: {
  sessionId: string;
  messageId: string;
  content: string;
  userId: string;
  model: string;
}) {
  const ch = await connectRabbitMQ();

  const message = Buffer.from(JSON.stringify(data));
  
  const sent = ch.publish(
    EXCHANGES.TOPIC,
    ROUTING_KEYS.CHAT_PROCESS,
    message,
    {
      persistent: true,
      contentType: 'application/json',
      replyTo: QUEUES.CHAT_RESPONSES
    }
  );

  if (sent) {
    logger.info({
      type: 'chat_published',
      sessionId: data.sessionId,
      userId: data.userId
    });
  }

  return sent;
}

// ============================================================================
// CONSUMER REGISTRATION
// ============================================================================

/**
 * Register email consumer
 */
export async function consumeEmails(
  handler: (msg: amqplib.Message | null) => Promise<void>
) {
  const ch = await connectRabbitMQ();

  await ch.consume(QUEUES.EMAIL, async (msg) => {
    try {
      await handler(msg);
      if (msg) {
        ch.ack(msg);
      }
    } catch (error) {
      logger.error({
        type: 'email_handler_error',
        error: error instanceof Error ? error.message : 'Unknown error'
      });

      if (msg && !msg.fields.redelivered) {
        ch.nack(msg, false, true); // Requeue once
      } else if (msg) {
        ch.nack(msg, false, false); // Send to dead letter queue
      }
    }
  });

  logger.info({ type: 'email_consumer_registered' });
}

/**
 * Register notification consumer
 */
export async function consumeNotifications(
  handler: (msg: amqplib.Message | null) => Promise<void>
) {
  const ch = await connectRabbitMQ();

  await ch.consume(QUEUES.NOTIFICATION, async (msg) => {
    try {
      await handler(msg);
      if (msg) {
        ch.ack(msg);
      }
    } catch (error) {
      if (msg && !msg.fields.redelivered) {
        ch.nack(msg, false, true);
      } else if (msg) {
        ch.nack(msg, false, false);
      }
    }
  });
}

/**
 * Register chat processing consumer
 */
export async function consumeChatProcessing(
  handler: (msg: amqplib.Message | null) => Promise<void>
) {
  const ch = await connectRabbitMQ();

  await ch.consume(QUEUES.CHAT_PROCESSING, async (msg) => {
    try {
      await handler(msg);
      if (msg) {
        ch.ack(msg);
      }
    } catch (error) {
      logger.error({
        type: 'chat_handler_error'
      });

      if (msg && !msg.fields.redelivered) {
        ch.nack(msg, false, true);
      } else if (msg) {
        ch.nack(msg, false, false);
      }
    }
  });
}

/**
 * Register consumer for chat responses
 */
export async function consumeChatResponses(
  handler: (msg: amqplib.Message | null) => Promise<void>
) {
  const ch = await connectRabbitMQ();

  await ch.consume(QUEUES.CHAT_RESPONSES, async (msg) => {
    try {
      await handler(msg);
      if (msg) {
        ch.ack(msg);
      }
    } catch (error) {
      if (msg) {
        ch.nack(msg, false, false);
      }
    }
  });
}

// ============================================================================
// QUEUE MANAGEMENT
// ============================================================================

/**
 * Purge queue
 */
export async function purgeQueue(queueName: keyof typeof QUEUES) {
  const ch = await connectRabbitMQ();
  const result = await ch.purgeQueue(QUEUES[queueName]);

  logger.info({
    type: 'queue_purged',
    queue: queueName,
    messageCount: result.messageCount
  });

  return result;
}

/**
 * Delete queue
 */
export async function deleteQueue(queueName: keyof typeof QUEUES) {
  const ch = await connectRabbitMQ();
  const result = await ch.deleteQueue(QUEUES[queueName]);

  logger.info({
    type: 'queue_deleted',
    queue: queueName
  });

  return result;
}

// ============================================================================
// EXPORTS
// ============================================================================

export { EXCHANGES, QUEUES, ROUTING_KEYS };
export type { Connection, Channel };
