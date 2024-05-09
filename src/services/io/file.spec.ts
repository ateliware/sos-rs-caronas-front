import { fileToBlobURL, readFile } from './file';

describe('readFile', () => {
  it('should read a file', async () => {
    jest
      .spyOn(FileReader.prototype, 'readAsText')
      .mockImplementation(function (this: FileReader) {
        if (this.onload === null) return;
        this.onload({
          target: { result: 'content' },
        } as ProgressEvent<FileReader>);
      });

    const file = new File(['content'], 'foo.txt', { type: 'text/plain' });

    const result = await readFile(file);
    expect(result).toBe('content');
  });

  it('should reject on error', async () => {
    jest.spyOn(FileReader.prototype, 'readAsText').mockImplementation();
    const file = new File(['foo'], 'foo.txt', { type: 'text/plain' });
    jest.spyOn(FileReader.prototype, 'readAsText').mockImplementation(() => {
      throw new Error('failed reason');
    });
    await expect(readFile(file)).rejects.toThrow('failed reason');
  });
});

describe('fileToBlobURL', () => {
  it('should create a blob URL', () => {
    URL.createObjectURL = (blob) => {
      expect(blob).toBeInstanceOf(Blob);
      return 'blob:urlObject';
    };
    const file = new File(['content'], 'foo.txt', { type: 'text/plain' });
    const url = fileToBlobURL(file);
    expect(url).toMatch('blob:urlObject');
  });
});
