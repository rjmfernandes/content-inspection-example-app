import {
    IAppAccessors,
    IHttp,
    ILogger,
    IModify,
    IPersistence,
    IRead,
} from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { AppMethod, IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import { IFileUploadContext } from '@rocket.chat/apps-engine/definition/uploads';
import { IPreFileUpload } from '@rocket.chat/apps-engine/definition/uploads/IPreFileUpload';
//import { FileUploadNotAllowedException } from '@rocket.chat/apps-engine/definition/exceptions';

export class ContentInspectionExampleAppApp extends App implements IPreFileUpload {
    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
    }
    async [AppMethod.EXECUTE_PRE_FILE_UPLOAD](context: IFileUploadContext, read: IRead, http: IHttp, persis: IPersistence, modify: IModify): Promise<void> {
        const user = await read.getUserReader().getById(context.file.userId);
        const room = await read.getRoomReader().getById(context.file.rid);
        console.log('ContentInspectionExampleAppApp - File Uploaded - Name: ' + context.file.name);
        console.log('ContentInspectionExampleAppApp - File Uploaded - Type: ' + context.file.type);
        console.log('ContentInspectionExampleAppApp - File Uploaded - Size: ' + context.file.size);

        if (context.file.type == 'text/plain') {
            console.log('ContentInspectionExampleAppApp - File Uploaded - Content: ' +
                String.fromCharCode.apply(null, context.content));
        }

        //if file is bad
        //throw new FileUploadNotAllowedException('File is Bad');
    }
}
