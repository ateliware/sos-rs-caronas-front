import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfirmationModalProvider } from '@contexts/ConfirmationContext';

import FileUploadImgCrop from './FileUploadImgCrop';

describe('FileUpload', () => {
  it('renders', () => {
    const { container } = render(<FileUploadImgCrop />);
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
      <FileUploadImgCrop
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
    createObjectURLMock.mockReset();
  });

  it('renders modal to crop', async () => {
    const { container } = await waitFor(() => {
      return render(
        <FileUploadImgCrop accept="jpg" openCropImageModal uploadPreview />
      );
    });

    const upload = container.firstChild;
    const uploadContent = upload?.firstChild;
    const input = uploadContent?.firstChild;

    const createObjectURLMock = jest.fn();

    global.URL.createObjectURL = createObjectURLMock;
    createObjectURLMock.mockReturnValue('blob:http://localhost:3000/2');

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

    fireEvent.change(input as Node, event);

    const title = container.querySelector('.modal-title');

    await waitFor(() => {
      return expect(title).toBeInTheDocument();
    });
    expect(title).toHaveTextContent(/Editar imagem/i);

    createObjectURLMock.mockReset();
  });
  it('renders crop image and save then', async () => {
    const onChange = jest.fn();

    const { container } = await waitFor(() => {
      return render(
        <FileUploadImgCrop
          accept="jpg"
          openCropImageModal
          uploadPreview
          onChange={onChange}
        />
      );
    });

    const upload = container.firstChild;
    const uploadContent = upload?.firstChild;
    const input = uploadContent?.firstChild;

    const createObjectURLMock = jest.fn();

    global.URL.createObjectURL = createObjectURLMock;
    createObjectURLMock.mockReturnValue('blob:http://localhost:3000/2');

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

    fireEvent.change(input as Node, event);

    const saveButton: HTMLButtonElement = await screen.findByText(/Salvar/i);
    const user = userEvent.setup();
    await user.click(saveButton);

    expect(onChange).toBeCalledTimes(0);
  });

  it('renders remove image button', async () => {
    const onChange = jest.fn();

    const { container } = await waitFor(() => {
      return render(
        <ConfirmationModalProvider>
          <FileUploadImgCrop
            accept="jpg"
            image="img"
            isRemovable
            uploadPreview
            onChange={onChange}
          />
        </ConfirmationModalProvider>
      );
    });

    const upload = container.firstChild;
    const uploadContent = upload?.firstChild;
    const input = uploadContent?.firstChild;

    const createObjectURLMock = jest.fn();

    global.URL.createObjectURL = createObjectURLMock;
    createObjectURLMock.mockReturnValue('blob:http://localhost:3000/2');

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

    fireEvent.change(input as Node, event);

    const removeButton: HTMLButtonElement = await screen.findByTitle(
      /Remover imagem/i
    );
    const user = userEvent.setup();
    expect(onChange).toBeCalledTimes(0);
    await user.click(removeButton);
    const confirmButton: HTMLButtonElement = await screen.findByText(
      /Confirmar/i
    );
    await user.click(confirmButton);
    expect(onChange).toBeCalledWith([null]);
    expect(screen.queryByTitle(/Remover imagem/i)).not.toBeInTheDocument();
  });
});
