import { Button, Icon, Modal, Switch, Table, TableColumn } from '@components';
import UserAPICaller, { UserFilters } from '@services/api/user';
import { User } from 'interfaces/User';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import AccountSVG from '@assets/icons/account.svg';

import UserPasswordForm from './UserPasswordForm/UserPasswordForm';
import UserForm from './UserForm/UserForm';

import { useAuthContext } from '@contexts/AuthProvider';

export default function UserPage() {
  const { user } = useAuthContext();
  const [tableData, setTableData] = useState<{
    total: number;
    result: Array<User>;
  }>({
    total: 0,
    result: [],
  });
  const [filters, setFilters] = useState<UserFilters>({ order: 'name' });

  const [isEditModalOpen, toggleEditModal] = useState(false);
  const [isPasswordModalOpen, togglePasswordModal] = useState(false);
  const [editId, setEditId] = useState('');

  const { setError, setValue, getValues } = useForm();

  useEffect(() => {
    loadTableData(filters);
  }, [filters]);

  const loadTableData = (filters: UserFilters) => {
    UserAPICaller.fetchUsers(filters).then((values) => {
      setTableData(values);
    });
  };

  const setUserValues = async (
    userId: string,
    active?: boolean,
    admin?: boolean
  ) => {
    await UserAPICaller.fetchUser(userId).then((user) => {
      setValue('id', user.id);
      setValue('name', user.name);
      setValue('email', user.email);
      setValue('active', active !== undefined ? active : user.active);
      setValue('admin', admin !== undefined ? admin : user.admin);
    });
  };

  const openEditModal = async (editId: string) => {
    setEditId(editId);
    toggleEditModal(true);
  };

  const activeOrInactiveUser = async (userId: string, active: boolean) => {
    setUserValues(userId, active).then(() => {
      const user = getValues() as User;

      UserAPICaller.createOrUpdate(
        {
          ...user,
          active,
        },
        setError
      ).then(() => loadTableData(filters));
    });
  };

  const adminOrNounUser = async (userId: string, admin: boolean) => {
    setUserValues(userId, undefined, admin).then(() => {
      const user = getValues() as User;
      UserAPICaller.createOrUpdate(
        {
          ...user,
          admin,
        },
        setError
      ).then(() => loadTableData(filters));
    });
  };

  return (
    <>
      <div className="p-s-300">
        <div className="d-flex justify-between">
          <h1>Users</h1>
          <Button
            className="ml-s-100"
            suffixes={<Icon>add</Icon>}
            design="filled"
            onClick={() => {
              setEditId('');
              return toggleEditModal(true);
            }}
          >
            Novo usuário
          </Button>
        </div>
        <div className="mt-s-200">
          <Table
            data={tableData.result}
            totalRecords={tableData.total}
            showColumnSelector={false}
            withPagination
            filters={filters}
            setFilters={setFilters}
          >
            <TableColumn
              fromKey="imageUrl"
              width="75px"
              header=""
              disableSorting
              render={(value) => {
                return (
                  <div className="image-cropper border-radius-350">
                    <img alt="user avatar" src={`${value || AccountSVG}`} />
                  </div>
                );
              }}
            />
            <TableColumn fromKey="name" header="Usuário" />
            <TableColumn fromKey="email" header="E-mail" />
            <TableColumn
              fromKey="id"
              header="Status"
              render={(id, row) => {
                return (
                  <Switch
                    label=""
                    defaultChecked={row.active}
                    onChange={() => activeOrInactiveUser(id, !row.active)}
                    disabled={id === user?.id}
                  />
                );
              }}
            />
            <TableColumn
              fromKey="id"
              header="Admin"
              render={(id, row) => {
                return (
                  <Switch
                    label=""
                    defaultChecked={row.admin}
                    onChange={() => adminOrNounUser(id, !row.admin)}
                    disabled={id === user?.id}
                  />
                );
              }}
            />
            <TableColumn
              width="5%"
              fromKey="id"
              header="Senha"
              disableSorting
              render={(id) => {
                return (
                  <Button
                    design="transparent"
                    prefixes={<Icon>edit</Icon>}
                    onClick={() => {
                      setEditId(id);
                      togglePasswordModal(true);
                    }}
                  />
                );
              }}
            />
            <TableColumn
              width="5%"
              fromKey="id"
              header="Editar"
              disableSorting
              render={(id) => {
                return (
                  <Button
                    design="transparent"
                    prefixes={<Icon>edit</Icon>}
                    onClick={() => {
                      openEditModal(id);
                    }}
                  />
                );
              }}
            />
          </Table>
        </div>
      </div>
      <Modal
        isOpen={isEditModalOpen}
        onClickAway={() => {
          setEditId('');
          toggleEditModal(false);
        }}
        size="extra-small"
        title={editId === '' ? 'Cadastrar usuário' : 'Editar usuário'}
      >
        <UserForm
          editId={editId}
          onSave={() => loadTableData(filters)}
          closeModal={() => {
            setEditId('');
            toggleEditModal(false);
          }}
          isMe={editId === user?.id}
        />
      </Modal>

      <Modal
        isOpen={isPasswordModalOpen}
        onClickAway={() => {
          setEditId('');
          togglePasswordModal(false);
        }}
        size="extra-small"
        title="Alterar senha"
      >
        <UserPasswordForm
          editId={editId}
          closeModal={() => {
            setEditId('');
            togglePasswordModal(false);
          }}
        />
      </Modal>
    </>
  );
}
