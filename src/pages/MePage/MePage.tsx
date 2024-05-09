import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Button, FileUpload, Modal } from '@components';
import { useAuthContext } from '@contexts/AuthProvider';
import { Me } from 'interfaces/Me';
import MeAPICaller from '@services/api/me';

import UserForm from '../UserPage/UserForm/UserForm';

import MePasswordForm from './MePasswordForm/MePasswordForm';

export default function MePage() {
  const aspect = { width: 500, height: 500 };
  const { setUser } = useAuthContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [me, setMe] = useState<Me | null>(null);
  const [isOpenChangePassword, toggleChangePassword] = useState(false);
  const [isOpenEditModal, toggleEditModal] = useState(false);

  const fetch = async () => {
    return MeAPICaller.fetchMe().then((values) => {
      setMe(values);
      return values;
    });
  };

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    toggleChangePassword(searchParams.get('new_password') === 'true' || false);
  }, [searchParams]);

  return (
    <>
      <div className="p-s-300">
        <div>
          <h1>Meu perfil</h1>
        </div>
        <div className="mt-s-200 card card__body p-s-350 bg-white">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-8">
                  <h4>Nome</h4>
                  <span>{me?.name}</span>
                </div>

                <div className="col-md-3">
                  <h4>Tipo de acesso</h4>
                  <span>{me?.admin ? 'Administrador' : 'Usuário'}</span>
                </div>
                <div></div>
                <div className="col-md-8 mt-s-250">
                  <h4>E-mail</h4>
                  <span>{me?.email}</span>
                </div>
                <div className="col-md-3  mt-s-250">
                  <h4>Status</h4>
                  <div className="row d-flex align-items-center">
                    <span>{me?.active ? 'Ativo' : 'Inativo'}</span>
                    <div
                      className={`little-ball-${me?.active ? 'green' : 'red'}`}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <FileUpload
                uploadPreview
                fileName=""
                image={me?.imageUrl}
                accept="image/*"
                maxSizeInBytes={1_000_000}
                disclaimer={`${aspect.width}x${aspect.height}px com até 1MB`}
                onChange={(file) => {
                  MeAPICaller.updateImage({ image: file[0] }, () => {}).then(
                    () => fetch().then((values) => setUser(values))
                  );
                }}
                label="Mudar foto"
              />
            </div>
          </div>
          <div className="row mt-s-300">
            <div className="col mr-s-100">
              <Button onClick={toggleEditModal} design="outlined" size="medium">
                Editar informações
              </Button>
            </div>
            <div className="col">
              <Button
                onClick={toggleChangePassword}
                design="outlined"
                size="medium"
              >
                Alterar senha
              </Button>
            </div>
          </div>
        </div>
        {isOpenChangePassword && (
          <Modal
            isOpen={isOpenChangePassword}
            onClickAway={() => {
              searchParams.delete('new_password');
              setSearchParams(searchParams);
              toggleChangePassword(false);
            }}
            size="extra-small"
            title="Alterar senha"
          >
            <MePasswordForm
              closeModal={() => {
                searchParams.delete('new_password');
                setSearchParams(searchParams);
                toggleChangePassword(false);
              }}
            />
          </Modal>
        )}

        {isOpenEditModal && (
          <Modal
            isOpen={isOpenEditModal}
            onClickAway={() => toggleEditModal((p) => !p)}
            size="extra-small"
            title="Editar usuário"
          >
            <UserForm
              onSave={() => {
                fetch().then((values) => setUser(values));
              }}
              editId={me?.id!}
              closeModal={() => toggleEditModal((p) => !p)}
              isMe={true}
            />
          </Modal>
        )}
      </div>
    </>
  );
}
