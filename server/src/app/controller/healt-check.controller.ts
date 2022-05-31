import { Controller, Get, Inject } from "@nestjs/common";
import { HealthCheck, HealthCheckService, MongooseHealthIndicator } from "@nestjs/terminus";
import { IGlobalConfig } from '../../domain/output-port/global-config.interface';

/**
 * It provides features such as graceful shutdown and Kubernetes liveness/readiness health checks 
 * for HTTP applications.
 */
@Controller('health')
export class HealthCheckController {
    constructor(
        @Inject('IGlobalConfig')
        private readonly globalConfig: IGlobalConfig,
        private healthCheckService: HealthCheckService,
        private db: MongooseHealthIndicator,
    ){}

    /**
     * A health check is typically a combination of several health indicators. 
     * Basically, a health check is positive if all the health indicators are up and running. 
     * 
     * @returns 
     */
    @Get()
    @HealthCheck()
    checkHealth() {
        return this.healthCheckService.check([
            () => this.db.pingCheck('mongoose')
        ]);
    }
}