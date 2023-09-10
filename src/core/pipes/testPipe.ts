import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common'
@Injectable()
class TestPipes implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        console.log('管道类型', metadata)
        console.log('管道的值', value)
        // return `这是管道生成的值${value}`;
        return 666

        // throw new Error('Method not implemented.');
    }
}
export default TestPipes
