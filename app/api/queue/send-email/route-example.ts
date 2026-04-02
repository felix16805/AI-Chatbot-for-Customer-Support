/**
 * Example: Queue System Integration in API Endpoint
 * Demonstrates how to integrate async task processing into the HTTP request-response cycle
 */

import { NextRequest, NextResponse } from 'next/server';
import { sendEmailAsync, getJobStatus } from '@/lib/queue';

/**
 * POST /api/queue/send-email
 * Send email asynchronously
 * 
 * Request:
 * {
 *   "to": "user@example.com",
 *   "subject": "Welcome!",
 *   "template": "welcome",
 *   "data": { "name": "John" }
 * }
 * 
 * Response:
 * {
 *   "success": true,
 *   "jobId": "1",
 *   "statusUrl": "/api/queue/status/email/1"
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, subject, template, data } = body;

    // Validate input
    if (!to || !subject || !template) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Queue the email job
    const jobId = await sendEmailAsync({
      to,
      subject,
      template: template as 'welcome' | 'verification' | 'password-reset' | 'notification',
      data: data || {}
    });

    // Return immediately with job ID
    return NextResponse.json(
      {
        success: true,
        message: 'Email queued for sending',
        jobId,
        statusUrl: `/api/queue/status/email/${jobId}`
      },
      { status: 202 } // 202 Accepted
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Unknown error',
        type: 'QUEUE_ERROR'
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/queue/status/email/[jobId]
 * Check email job status
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { jobId: string } }
) {
  try {
    const jobId = params.jobId;
    const status = await getJobStatus('email', jobId);

    if (!status) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ job: status });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

/**
 * Usage Example URL:
 * POST http://localhost:3000/api/queue/send-email
 * GET http://localhost:3000/api/queue/status/email/1
 */
