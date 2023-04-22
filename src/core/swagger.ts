import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const initSwagger = (app: INestApplication) => {
  const swaggerTitle = app.get(ConfigService).get('SWAGGERTITLE') ?? '';
  const swaggerDesc = app.get(ConfigService).get('SWAGGERDESCRIPTION') ?? '';
  const swaggerVersion = app.get(ConfigService).get('SWAGGERVERSION') ?? '';
  const swaggerOptions = new DocumentBuilder()
    .setTitle(swaggerTitle)
    .setDescription(swaggerDesc)
    .setVersion(swaggerVersion)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('docs', app, document);
};
export default initSwagger;
