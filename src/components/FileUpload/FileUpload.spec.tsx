import { fireEvent, render, screen } from '@testing-library/react';
import FileUpload from './FileUpload';

describe('FileUpload', () => {
  it('renders', () => {
    const { container } = render(<FileUpload />);
    const upload = container.firstChild;
    const uploadContent = upload?.firstChild;
    const input = uploadContent?.firstChild;
    const hiddenInput = input?.nextSibling;
    const icon = hiddenInput?.nextSibling;
    const label = icon?.nextSibling;
    expect(upload).toBeInTheDocument();
    expect(upload).toHaveClass('upload');
    expect(uploadContent).toHaveClass('upload__content');
    expect(input).toHaveClass('upload__content__input');
    expect(input).toHaveAttribute('type', 'file');
    expect(hiddenInput).toHaveAttribute('type', 'hidden');
    expect(icon).toHaveClass('upload__content__icon');
    expect(label).toHaveClass('upload__content__text');
    expect(label).toHaveTextContent(
      'Arraste ou clique aqui para enviar imagem'
    );
  });

  it('renders with variants', () => {
    const changeMock = jest.fn();
    const { container } = render(
      <FileUpload
        className="custom"
        image="img"
        fileName="file.jpg"
        multiple
        accept="jpg"
        name="name"
        hideLabel
        uploadPreview
        onChange={changeMock}
        form={{ name: 'formItem' }}
        error="error message"
      />
    );
    const upload = container.firstChild;
    const uploadContent = upload?.firstChild;
    const fileName = uploadContent?.nextSibling;
    const error = fileName?.nextSibling;
    const input = uploadContent?.firstChild;
    const hiddenInput = input?.nextSibling;
    const icon = hiddenInput?.nextSibling;
    const label = icon?.nextSibling;

    expect(upload).toBeInTheDocument();
    expect(upload).toHaveClass('upload');
    expect(uploadContent).toHaveClass('upload__content custom');
    expect(fileName).toHaveClass('upload__filename');
    expect(input).toHaveClass('upload__content__input');
    expect(input).toHaveAttribute('type', 'file');
    expect(input).toHaveAttribute('name', 'name');
    expect(input).toHaveAttribute('accept', 'jpg');
    expect(input).toHaveAttribute('multiple');
    expect(hiddenInput).toHaveAttribute('type', 'hidden');
    expect(hiddenInput).toHaveAttribute('name', 'formItem');
    expect(icon).toHaveClass('upload__content__image');
    expect(icon).toHaveAttribute('src', 'img');
    expect(label).toBeNull();
    expect(error).toHaveClass(
      'form-input__container form-input__container--error mb-s-100'
    );
    expect(error).toHaveTextContent('error message');

    const event = {
      target: {
        files: [
          {
            name: 'newfile.jpg',
            type: 'image/jpeg',
          },
        ],
      },
    };

    const createObjectURLMock = jest.fn();
    global.URL.createObjectURL = createObjectURLMock;
    createObjectURLMock.mockReturnValue('blob:http://localhost:3000/1');
    fireEvent.change(input as Node, event);
    const newFileName = container.querySelector('.upload__filename');
    const newImage = container.querySelector('.upload__content__image');
    expect(newFileName).toHaveTextContent('newfile.jpg');
    expect(newImage).toHaveAttribute('src', 'blob:http://localhost:3000/1');
    expect(changeMock).toHaveBeenCalled();
  });

  it('should call the onChange prop with the selected files', () => {
    const onChangeMock = jest.fn();
    render(<FileUpload onChange={onChangeMock} />);

    const file1 = new File(['test file 1'], 'test1.xls', {
      type: 'application/vnd.ms-excel',
    });
    const file2 = new File(['test file 2'], 'test2.xls', {
      type: 'application/vnd.ms-excel',
    });
    const inputElement = screen.getByLabelText(
      'Arraste ou clique aqui para enviar imagem'
    );

    fireEvent.change(inputElement, { target: { files: [file1, file2] } });

    expect(onChangeMock).toHaveBeenCalledWith([file1, file2]);
  });
});
