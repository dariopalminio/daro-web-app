import { Controller, Get, Inject } from "@nestjs/common";
import { HealthCheck, HealthCheckService, MongooseHealthIndicator } from "@nestjs/terminus";



@Controller('health')
export class HealthCheckController {
    constructor(
        private healthCheckService: HealthCheckService,
        private db: MongooseHealthIndicator,
    ) { }

    /**
     * /health returns the status of the service and the dependencies.  
     * @returns 
     */
    @Get()
    @HealthCheck()
    checkHealth() {
        return this.healthCheckService.check([
            () => this.db.pingCheck('mongoose')
        ]);
    }

    /**
     * Returns the readiness state to accept incoming requests from the gateway or the upstream proxy. 
     * Readiness signals that the app is running normally but isn’t ready to receive requests just yet. 
     */
    @Get('rediness')
    @HealthCheck()
    rediness() {
        return this.healthCheckService.check([
        ]);
    }

    /**
     * Returns the liveness of a microservice. If the check does not return the expected response, 
     * it means that the process is unhealthy or dead and should be replaced as soon as possible.
     */
    @Get('liveness')
    @HealthCheck()
    liveness() {
        return this.healthCheckService.check([
        ]);
    }
}