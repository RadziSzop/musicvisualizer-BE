export interface MulterDiskUploadedFiles {
  [fieldname: string]:
    | {
        fieldname: string;
        originalname: string;
        encoding: string;
        mimetype: string;
        filename: string;
        size: number;
        destination: string;
        path: string;
      }[]
    | undefined;
}
