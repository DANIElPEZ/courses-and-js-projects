import { NestFactory, Reflector } from '@nestjs/core';
import { BadRequestException, ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'; // Import Validations
import { AppModule } from './app.module';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // swagger setup
  const config = new DocumentBuilder().setTitle('Blog API').setDescription('Blog API description').setVersion('1.0').build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory, {jsonDocumentUrl: 'swagger/json'});

  app.useGlobalPipes(new ValidationPipe({
    transform: true, //use for nested classes "It's not real OOP: inheritance in DTOs only serves to reuse validations from the base class and add them to those of the subclass (and with ValidateNested Type,those of nested objects are also applied)"
    forbidNonWhitelisted: true, //throw error when non-whitelisted properties are present
    whitelist:true, //accept only properties that are defined in the DTO
    transformOptions:{
      enableImplicitConversion:true// convert default types from web to the types defined in dto's
    },
    //exceptionFactory: (errors)=>{return new BadRequestException(errors);}// complete logs of db
  }));// set regex validation as global
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));// apply rules for transform or exclude properties
  app.use(helmet());
  app.enableCors({
    origin: '*',
  });
  await app.listen(3000);
}
bootstrap();