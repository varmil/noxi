/**
 * OpenTelemetry instrumentation for Google Cloud Trace
 *
 * 重要: このファイルは他のモジュールより先にインポートする必要がある
 */
import { TraceExporter } from '@google-cloud/opentelemetry-cloud-trace-exporter'
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express'
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http'
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core'
import { resourceFromAttributes } from '@opentelemetry/resources'
import { NodeSDK } from '@opentelemetry/sdk-node'
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions'

let sdk: NodeSDK | undefined

export function startInstrumentation(): void {
  // ENV_NAME がない場合はローカル環境とみなしてスキップ
  if (!process.env.ENV_NAME) {
    console.log('[Instrumentation] Skipping Cloud Trace (local environment)')
    return
  }

  const serviceName =
    process.env.K_SERVICE || `closed-api-server-${process.env.ENV_NAME}`

  sdk = new NodeSDK({
    resource: resourceFromAttributes({
      [ATTR_SERVICE_NAME]: serviceName
    }),
    traceExporter: new TraceExporter(),
    instrumentations: [
      new HttpInstrumentation(),
      new ExpressInstrumentation(),
      new NestInstrumentation()
    ]
  })

  sdk.start()
  console.log(`[Instrumentation] Cloud Trace started for ${serviceName}`)
}

export async function shutdownInstrumentation(): Promise<void> {
  if (sdk) {
    await sdk.shutdown()
    console.log('[Instrumentation] Cloud Trace shut down')
  }
}
