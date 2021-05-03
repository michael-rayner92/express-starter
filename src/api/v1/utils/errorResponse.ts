import Logger from "@services/logger";
import { IMetadata } from "@interfaces/Metadata";

// @@Todos check error message double up

class ErrorResponse extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public metadata?: IMetadata
  ) {
    super(message);

    Logger.error(message, {
      name: this.name,
      stack: this.stack ?? null,
      statusCode: this.statusCode,
      ...this?.metadata
    });

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorResponse;
