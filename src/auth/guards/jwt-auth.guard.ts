import { AuthGuard } from '@nestjs/passport';

export class JwtAuthGuard extends AuthGuard('jtw') {}
